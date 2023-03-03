import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';

@Component({

  selector:'categoryofhousebanner',
  templateUrl: 'categoryofhousebanner.component.html'
})
export class CateOfHouseBannerComponent implements OnInit {
  catehouse:CateOfHouse;
  cateofhouseid:number;

  
  constructor(
    private cateofhouseservice:CateTOFhouseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe( (params) => {
      var id=params['cateTofhouseid']; 
      this.cateofhouseid=id;

      this.cateofhouseservice.getcateofhouse(id).then(trueresult =>{
              this.catehouse=trueresult as CateOfHouse; 

            }, erros=>{
              console.log(erros);
            }
                  
          );

    });
  }

}
