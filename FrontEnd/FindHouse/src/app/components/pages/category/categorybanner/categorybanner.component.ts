import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';

@Component({

  selector:'categorybanner',
  templateUrl: 'categorybanner.component.html'
})
export class CategoryBannerComponent implements OnInit {

  category:Category;
  categoryid:number;

  
  constructor(
    private categoryService:CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe( (params) => {
      var id=params['categoryid']; 
      this.categoryid=id;

      this.categoryService.findbyIdCat(id).then(trueresult =>{
              this.category=trueresult as Category; 

            }, erros=>{
              console.log(erros);
            }
                  
          );

    });
  }

}
