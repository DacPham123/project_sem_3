import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { NewsSuperAdmin } from 'src/app/models/newsuperadmin.model';
import { ReportNews } from 'src/app/models/reportnews.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { AccountService } from 'src/app/services/account.service';

import { NewsService } from 'src/app/services/news.service';

@Component({
  // selector:'contain-dashboard',
  templateUrl: './news.component.html',
})
export class NewsAdminComponent implements OnInit {
  username:string;

  news:NewsSuperAdmin[];
  selectedNews:NewsSuperAdmin[];
  loading: boolean = true;
  statuses: any[];



  constructor(
    private newsService:NewsService,
    private accountService:AccountService
  ) {
  }

  ngOnInit(): void {
    this.newsService.showallbysuperadmin().then(
     res =>{         
       this.news= res as NewsSuperAdmin[];
       this.news.forEach(s=>s.createDateFilter=new Date(s.createdate));
         
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





 