import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { XuanNews } from 'src/app/models/xuannews.model';
import { NewsService } from 'src/app/services/news.service';

@Component({


  templateUrl: 'adminnewsdetails.component.html'
})
export class DetailsNewsAdminComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
   
  
  }

}