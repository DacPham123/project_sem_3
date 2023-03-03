import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { NewsSuperAdmin } from 'src/app/models/newsuperadmin.model';
import { ReportNews } from 'src/app/models/reportnews.model';
import { ReportNewsSuperAdmin } from 'src/app/models/reportnewssuperadmin.model';

import { XuanNews } from 'src/app/models/xuannews.model';
import { AccountService } from 'src/app/services/account.service';

import { NewsService } from 'src/app/services/news.service';
import { ReportNewsService } from 'src/app/services/reportnews.service';

@Component({
  // selector:'contain-dashboard',
  templateUrl: './reportnews.component.html',
})
export class ReportNewsAdminComponent implements OnInit {
  username:string;

  reportnews:ReportNewsSuperAdmin[];
  selectedNews:ReportNewsSuperAdmin[];
  loading: boolean = true;
  statuses: any[];



  constructor(
    private newsService:NewsService,
    private reportService:ReportNewsService,
    private accountService:AccountService
  ) {
  }

  ngOnInit(): void {
    this.reportService.getreportbysuperadmin().then(
     res =>{         
       this.reportnews= res as ReportNewsSuperAdmin[];
       this.reportnews.forEach(s=>{s.created=new Date(s.createdday);s.deadlineDate= new Date(s.deadline)});
         
     },
     erros=>{
       console.log(erros);
     }        
   );


  }
  show(newsid:number){
    console.log(newsid);
  }
}





 