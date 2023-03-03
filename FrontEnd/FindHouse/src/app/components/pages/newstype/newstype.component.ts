import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { NewTypes } from 'src/app/models/newtype.model';


@Component({
  templateUrl: 'newstype.component.html'
})
export class NewsTypeComponent implements OnInit {

  newTypes:NewTypes;
  newstypeid:number;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
  });
  
  }

}
