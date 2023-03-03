import { Component, OnInit } from '@angular/core';
import { ShowNewsHome } from 'src/app/models/shownewshome.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'vipnews-home',
  templateUrl: './vipnews-home.component.html',
})
export class VipnewsHomeComponent implements OnInit {

  vipNews: ShowNewsHome[]
  responsiveOptions;
  
  constructor(
    private newsService: NewsService
  ) { 
    this.responsiveOptions = [
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
  ];
  }

  ngOnInit(): void {
    this.newsService.showVipNews().then(
      res => {
          this.vipNews = res as ShowNewsHome[]
      },
      err => {
          console.log(err);
      }
  );

  }

}
