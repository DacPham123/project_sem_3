import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { Province } from 'src/app/models/province.model';
import { CategoryService } from 'src/app/services/category.service';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { ProvinceService } from 'src/app/services/province.service';


@Component({

  selector:'searchhomebanner',
  templateUrl: './searchhomebanner.component.html'
})
export class SearchHomeBannerComponent implements OnInit {
  catehouse:CateOfHouse;
  cateofhouseid:number;
  category: Category;
  catid: number;
  province: Province
  provinceid: number
  
  constructor(
    private cateofhouseservice: CateTOFhouseService,
    private provinceService: ProvinceService,
    private cateService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe( (params) => {
      var idPro =params['provinceId']; 
      var idCat =params['categoryid']; 
      var idCatHouse =params['cateTofhouseid']; 

      console.log(idPro)
      console.log(idCatHouse)

      this.cateofhouseservice.getcateofhouse(idCatHouse).then(trueresult =>{
              this.catehouse = trueresult as CateOfHouse; 
              console.log(this.catehouse.cateTofhousename);
            }, erros=>{
              console.log(erros);
            }
                  
          );

          this.provinceService.findbyIdPro(idPro).then(trueresult =>{
            this.province = trueresult as Province; 
            console.log(this.province.provinceName)
          }, erros=>{
            console.log(erros);
          }
                
        );

        this.cateService.findbyIdCat(idCat).then(trueresult =>{
          this.category=trueresult as Category; 
          console.log(this.category.categoryname)
        }, erros=>{
          console.log(erros);
        }
              
      );

    });
  }

}
