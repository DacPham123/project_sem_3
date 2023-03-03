import { Component, OnInit } from '@angular/core';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';

@Component({
  selector: 'category-home',
  templateUrl: './category-home.component.html',
})
export class CategoryHomeComponent implements OnInit {

  cateofHouses: CateOfHouse[]
  icons: string[]
  constructor(
    private cateofHouseService: CateTOFhouseService
  ) { }

  ngOnInit()  {
    this.icons = [
      
        'flaticon-bake',
        'flaticon-hotel',
        'flaticon-barbell',
        'flaticon-store',
        'flaticon-event',
        'flaticon-flower'
    ]

    this.cateofHouseService.showall().then(
      res =>{
          this.cateofHouses = res as CateOfHouse[];
      },
      err => {
          console.log(err);
      }
  )
  }

}
