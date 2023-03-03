import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/news.model';

import { XuanNews } from 'src/app/models/xuannews.model';
import { NewsService } from 'src/app/services/news.service';

@Component({


  templateUrl: 'newsdetail.component.html'
})
export class NewsDetailComponent implements OnInit {

  newsid:number;
  news:News;
  constructor(
    private route: ActivatedRoute,
    private newsService : NewsService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {

      this.newsid=params['newsid'];  
      this.newsService.getnewbyidshowdetailspage(this.newsid).then(
        trueresult =>{
          this.news= trueresult as News;
          if(this.news.newstatus !=1){
            this.router.navigate(['/home']);
          }
        },
        erros=>{
          console.log(erros);
        }        
      );
    })
  
  }

}