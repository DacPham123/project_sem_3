import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

import { News } from 'src/app/models/news.model';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { NewsService } from 'src/app/services/news.service';

@Component({

  selector:'shownewsreviewcontentright',
  templateUrl: 'shownewsreviewcontentright.component.html'
})
export class ShowNewsReviewContentRightComponent implements OnInit {

  newsid:number;
  news:News;
  agentuser:Account;
  constructor(
    private route: ActivatedRoute,
    private accountService:AccountService,
    private messageService: MessageService,
    private newsService : NewsService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params) => {

      this.newsid=params['id'];  
     //-----show new
     this.newsService.getnewbyidshowdetailspage(this.newsid).then(
      trueresult =>{
        this.news= trueresult as News;
 
        if(this.news.agentuser !=null){
          this.accountService.findByUsername(this.news.agentuser).then(
            trueresult =>{
              this.agentuser= trueresult as Account;
            },
            erros=>{
              console.log(erros);
            }        
          );
        }
   
      },
      erros=>{
        console.log(erros);
      }        
    );

    

  })
  
 
  }
}
