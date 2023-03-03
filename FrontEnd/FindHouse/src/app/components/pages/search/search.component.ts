import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({


  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {

  keyword:string;
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      this.keyword=params['keyword'].split('keyword=')[1];  
    });
  }
  

}
