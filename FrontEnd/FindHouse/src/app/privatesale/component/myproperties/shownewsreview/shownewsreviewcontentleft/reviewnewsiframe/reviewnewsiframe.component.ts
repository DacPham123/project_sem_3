import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector:'reviewnewsiframe',
  templateUrl: 'reviewnewsiframe.component.html'
})
export class ReviewNewsIframeComponent implements OnInit {

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
      this.newsid=params['id'];  
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
