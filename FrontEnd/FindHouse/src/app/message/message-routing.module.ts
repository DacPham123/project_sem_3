import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  {path: '', component: MessageComponent},
  {path: ':username', component: ConversationComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class MessageRoutingModule { }
