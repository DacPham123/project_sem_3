import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { AccountService } from 'src/app/services/account.service';

import { NewsService } from 'src/app/services/news.service';

@Component({
  // selector:'contain-dashboard',
  templateUrl: './news.component.html',
})
export class NewsAdminComponent implements OnInit {
  username:string;

  customers:News[];
  selectedCustomers:News[];
  loading: boolean = true;
  statuses: any[];


  constructor(
    private newsService:NewsService,
    private accountService:AccountService
  ) {
  }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.newsService.showallbyadmin(this.username).then(
     trueresult =>{         
       this.customers= trueresult as News[];
       this.loading = false;
       this.customers.forEach(customer => customer.adstimefrom = new Date(customer.adstimefrom));
       

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





 