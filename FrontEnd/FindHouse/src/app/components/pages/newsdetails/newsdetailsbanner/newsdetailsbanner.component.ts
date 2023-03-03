import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { XuanNews } from 'src/app/models/xuannews.model';
import { NewsService } from 'src/app/services/news.service';

import { XuanNewsService } from 'src/app/services/xuannews.service';

@Component({

  selector:'newsdetailsbanner',
  templateUrl: 'newsdetailsbanner.component.html'
})
export class NewsDetailsBannerComponent implements OnInit {

  newsid:number;
  vipnew:XuanNews;
  
  constructor(
    private newsService : NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.newsService.getrandomvipnew().then(
      trueresult =>{
        this.vipnew= trueresult as XuanNews;
    
    },
      erros=>{
        console.log(erros);
      } 
    )

  }

}
