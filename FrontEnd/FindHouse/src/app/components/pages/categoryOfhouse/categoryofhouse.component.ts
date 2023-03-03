import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';

@Component({


  templateUrl: 'categoryofhouse.component.html'
})
export class CategoryOfHouseComponent implements OnInit {

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