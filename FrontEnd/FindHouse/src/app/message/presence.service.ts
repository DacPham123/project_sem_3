import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection | undefined;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();
  
  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(token: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    });

    /**
     * Notify new Message if you aren't on the MessageHub.
     * Then user can click (tap) on the pop-up message to go to chat screen.
     */
    this.hubConnection.on('NewMessageReceived', ({username}) => {
      this.toastr.info(username + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        .subscribe(() => this.router.navigateByUrl('/messages/' + username));
    })
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }
}
