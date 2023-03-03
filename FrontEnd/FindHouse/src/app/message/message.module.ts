import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';
import { FormsModule } from '@angular/forms';
import { ConversationComponent } from './conversation/conversation.component';




@NgModule({
  declarations: [
    MessageComponent,
    ConversationComponent
   
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule,
  ]
})
export class MessageModule { }
