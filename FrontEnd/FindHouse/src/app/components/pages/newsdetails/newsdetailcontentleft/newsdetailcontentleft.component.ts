import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { XuanNews } from 'src/app/models/xuannews.model';


import {Message} from 'primeng//api';
import { NewImages } from 'src/app/models/newsimages.model';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({

  selector:'newsdetailcontentleft',
  templateUrl: 'newsdetailcontentleft.component.html'
})
export class NewsDetailContentLeftComponent implements OnInit {

   newsid:number;
   news:News;
   images: any[];
    content:string;


   responsiveOptions:any[] = [
       {
           breakpoint: '1024px',
           numVisible: 5
       },
       {
           breakpoint: '960px',
           numVisible: 4
       },
       {
           breakpoint: '768px',
           numVisible: 3
       },
       {
           breakpoint: '560px',
           numVisible: 1
       }
   ];

  
  constructor(
    private route: ActivatedRoute,
    private newsService : NewsService
   
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params) => {
      this.newsid=params['newsid'];  
      
     //-----show new
     this.newsService.getnewbyidshowdetailspage(this.newsid).then(
      trueresult =>{
        this.news= trueresult as News;
        this.content=this.news.content;

      },
      erros=>{
        console.log(erros);
      }        
    );
    this.newsService.getnewsimagesbyid(this.newsid).then(
      trueresult =>{
        this.images= trueresult as NewImages[];
      },
      erros=>{
        console.log(erros);
      }        
    );
  })
  
 
  }
 
  


}
