import { Component, OnInit } from '@angular/core';
import { ShowNewsHome } from 'src/app/models/shownewshome.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'specialnews-home',
  templateUrl: './specialnews-home.component.html',
})
export class SpecialnewsHomeComponent implements OnInit {
  specialNews: ShowNewsHome[]
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.showSpecialNews().then(
      res => {
          this.specialNews = res as ShowNewsHome[]
      },
      err =>{
          console.log(err);
      }
  );
  }

}
