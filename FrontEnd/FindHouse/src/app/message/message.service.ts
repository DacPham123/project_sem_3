import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseURLService } from '../services/baseurl.service';
import { IMessage } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection | undefined;
  private messageThreadSource = new BehaviorSubject<IMessage[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();
  
  constructor(private baseURLService:BaseURLService, private http: HttpClient) { }

  createHubConnection(token: string, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();
    
    this.hubConnection.start().catch(error => console.log(error));

    /**
     * Listening event Section - Function which listens to the changes on SignalR webSocket
     */
    this.hubConnection.on('ReceiveMessageThread', (messages: IMessage[]) => {
      this.messageThreadSource.next(messages);
    });

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        this.messageThreadSource.next([...messages, message])
      })
    });
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }
  
  getMessages(container: string): Observable<IMessage[] | null> {
    let params = new HttpParams();
    
    params = params.append('container', container);
    return this.http.get<IMessage[]>(this.baseURLService.BaseURL + 'messages', {observe: 'response', params})
          .pipe(
            map(response => {
              return response.body
            })
          );
  }


  getMessageThread(username: string) {
    return this.http.get<IMessage[]>(this.baseURLService.BaseURL + 'messages/thread/' + username);
  }


  async sendMessage(username: string, content: string): Promise<any> {
    try {
      return await this.hubConnection!.invoke('SendMessage', { recipientUsername: username, content: content });
    } catch (error) {
      return console.log(error);
    }
  }

  deleteMessage(messageId: number) {
    return this.http.delete(this.baseURLService.BaseURL + 'messages/' + messageId);
  }
}
