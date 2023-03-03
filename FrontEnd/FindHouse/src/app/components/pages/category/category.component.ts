import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';

@Component({


  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

  catehouse:CateOfHouse;
  cateofhouseid:number;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      this.cateofhouseid=params['cateTofhouseid'];    
  });
  
  }

}