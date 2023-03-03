import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { XuanNews } from 'src/app/models/xuannews.model';


import {Message} from 'primeng//api';
import { NewImages } from 'src/app/models/newsimages.model';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({

  selector:'ifarme',
  templateUrl: 'ifarme.component.html'
})
export class IframeComponent implements OnInit {

   newsid:number;
   news:News;
    iframe:number;

  constructor(
    private route: ActivatedRoute,
    private newsService : NewsService
   
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params) => {
      this.iframe=0;
      this.newsid=params['newsid'];  
     //-----show new
     this.newsService.getnewbyidshowdetailspage(this.newsid).then(
      trueresult =>{
        this.news= trueresult as News; 
        this.iframe=this.news.wardid-1;
      },
      erros=>{
        console.log(erros);
      }        
    );
   
  })
  
 
  }
}
