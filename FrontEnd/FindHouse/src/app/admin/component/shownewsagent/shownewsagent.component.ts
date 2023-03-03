import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { AccountService } from 'src/app/services/account.service';

import { NewsService } from 'src/app/services/news.service';

@Component({
  
  templateUrl: './shownewsagent.component.html',
})
export class ShowNewsAgentComponent implements OnInit {
  username:string;

  customers:News[];
  selectedCustomers:News[];
  loading: boolean = true;
  statuses: any[];

  account:Account;

  constructor(
    private newsService:NewsService,
    private accountService:AccountService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      this.username=params['useragent'];  
      this.accountService.findByUsername(this.username).then(
        trueresult =>{         
          this.account= trueresult as Account;
   
        },
        erros=>{
          console.log(erros);
        }        
      );
      this.newsService.getalllistnewsagent(this.username).then(
        trueresult =>{         
          this.customers= trueresult as News[];
          this.loading = false;
          this.customers.forEach(customer => customer.adstimefrom = new Date(customer.adstimefrom));
          
   
        },
        erros=>{
          console.log(erros);
        }        
      );
    })
   


  }
  show(newsid:number){
    console.log(newsid);
  }
  showinfoagent(username:string){
    
  }
}





 