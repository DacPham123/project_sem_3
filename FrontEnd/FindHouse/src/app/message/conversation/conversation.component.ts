import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessage } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {
  @ViewChild('messageForm') messageForm: NgForm | undefined;
  username: string = '';
  messageContent: string = '';
  styleshow:number;
  checkRole:string;
  constructor(private route: ActivatedRoute, public messageService: MessageService,    private router: Router) { }

  ngOnInit(): void {
    this.checkRole = localStorage.getItem("role");
    this.loadMessages();
  }

  loadMessages() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      let token = localStorage.getItem('jwt');
    if(this.username==='superadmin'){
    this.styleshow=2;
    }else{
      this.styleshow=1;
    }
      this.messageService.createHubConnection(token, params['username']);
    });
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm?.reset();
    });
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  back(){

     this.router.navigate(['/messages/'])
  }
}
