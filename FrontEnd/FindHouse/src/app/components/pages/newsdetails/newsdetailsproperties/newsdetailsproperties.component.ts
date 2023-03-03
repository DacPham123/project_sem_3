import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { NewsService } from 'src/app/services/news.service';

@Component({

  selector:'newsdetailsproperties',
  templateUrl: 'newsdetailsproperties.component.html'
})
export class NewsDetailsPropertiesComponent implements OnInit {

  newsid:number;
  list:XuanNews[];
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];
  
  constructor(
    private newsService:NewsService,
    private route: ActivatedRoute,
    
  ) { this.responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]; }

  ngOnInit(): void {
    this.newsService.getlistbynewstype(2).then(
      trueresult =>{
        this.list= trueresult as XuanNews[];
       
    
    },
      erros=>{
        console.log(erros);
      } 
    )

  }

}
