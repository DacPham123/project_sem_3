import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { ReportNews } from 'src/app/models/reportnews.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { NewsService } from 'src/app/services/news.service';
import { NewsTableService } from 'src/app/services/newstable.service';
import { ReportNewsService } from 'src/app/services/reportnews.service';
import { XuanNewsService } from 'src/app/services/xuannews.service';

@Component({
  templateUrl: './notification.component.html',
})

export class NotificationComponent implements OnInit {
   
  listReport: ReportNews[];

  first = 0;

  rows = 10;
  username:string;
  statuses: any[];


  constructor(
    private reportService: ReportNewsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {  
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(){
    this.username=localStorage.getItem("username");
    this.reportService.getreporttouser(this.username).then(
     trueresult =>{         
       this.listReport= trueresult as ReportNews[];
     },
     erros=>{
       console.log(erros);
     });
  }

  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Please, Check confirmed if you have read remark!',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.reportService.getreportnews(id).then(
              trueresult =>{         
                var getReport = trueresult as ReportNews;
                getReport.reportstatus = 6,
                this.reportService.updatereports(getReport).then(
                  res =>{
                      var resl: ResultAPI = res as ResultAPI;
                      if(resl.result){  
                          this.reload();                    
                          console.log('OK');
                          this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have checked'});
                      } else{
                        this.reload();    
                        console.log('Fail');
                      }
                 },
                 err =>{
                      console.log(err);
                 });
              },
              erros=>{
                console.log(erros);
              });            
        },
        reject: () => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        }
    });
}
 
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.listReport ? this.first === (this.listReport.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listReport ? this.first === 0 : true;
}

}
 