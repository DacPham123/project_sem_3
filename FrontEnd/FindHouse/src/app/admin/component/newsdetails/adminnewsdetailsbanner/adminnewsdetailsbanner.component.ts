import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models/news.model';

import { XuanNews } from 'src/app/models/xuannews.model';
import { NewsService } from 'src/app/services/news.service';

import { XuanNewsService } from 'src/app/services/xuannews.service';

@Component({

  selector:'adminnewsdetailsbanner',
  templateUrl: 'adminnewsdetailsbanner.component.html'
})
export class AdminNewsDetailsBannerComponent implements OnInit {


  constructor(

  ) { }

  ngOnInit(): void {
    
  }

}
