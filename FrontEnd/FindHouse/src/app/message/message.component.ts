import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMessage } from './message';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messages: IMessage[] = [];
  container = 'Inbox';
  showfromto:string;
  checkRole:string;
  constructor(
    private messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.checkRole = localStorage.getItem("role");
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.container).subscribe(
      response => {
        this.messages = response;
     
      }
    )
  }


  deleteMessage(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === messageId), 1);
    })
  }

  back(){
    this.checkRole = localStorage.getItem("role");
    if(this.checkRole == 'superadmin'){
     this.router.navigate(['/superadmin/'])
    }
    if(this.checkRole == 'admin'){
     this.router.navigate(['/admin/'])
   }
   if(this.checkRole == 'privateseller'){
     this.router.navigate(['/privatesale/'])
   }
   if(this.checkRole == 'agent'){
     this.router.navigate(['/agent/'])
   }
   if(this.checkRole == 'visitor'){
     this.router.navigate(['/visitor/'])
   }
  }
}
