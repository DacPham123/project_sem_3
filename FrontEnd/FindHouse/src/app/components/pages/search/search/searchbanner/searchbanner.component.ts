import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { Province } from 'src/app/models/province.model';
import { CategoryService } from 'src/app/services/category.service';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { ProvinceService } from 'src/app/services/province.service';


@Component({

  selector:'searchbanner',
  templateUrl: './searchbanner.component.html'
})
export class SearchBannerComponent implements OnInit {
  
  keyword

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe( (params) => {
     
      this.keyword =params['keyword']; 

    });
  }

}
