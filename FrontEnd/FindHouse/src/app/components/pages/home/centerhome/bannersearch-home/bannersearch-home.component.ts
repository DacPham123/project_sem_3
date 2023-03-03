import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { City } from 'src/app/models/city.model';
import { Province } from 'src/app/models/province.model';
import { Ward } from 'src/app/models/ward.model';
import { CategoryService } from 'src/app/services/category.service';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { CityService } from 'src/app/services/city.service';
import { ProvinceService } from 'src/app/services/province.service';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'bannersearch-home',
  templateUrl: './bannersearch-home.component.html',
})
export class BannerSearchHomeComponent implements OnInit {

  provinces: Province[]
  provinceId: number
  cateTofhouseid: number
  cateofHouse: CateOfHouse[]
  categories: Category[]
  categoryid: number


  constructor(
    private provinceService: ProvinceService,
    private cateofHouseService: CateTOFhouseService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.provinceService.showall().then(
      res => {
          this.provinces = res as Province[]
      },
      err => {
          console.log(err);
      });

      this.cateofHouseService.showall().then(
        res => {
            this.cateofHouse = res as CateOfHouse[]
        },
        err => {
            console.log(err);
        });

        this.categoryService.showall().then(
          res => {
              this.categories = res as Category[]
          },
          err => {
              console.log(err);
          });
  }

  // sortCities(){ 
  //   console.log(this.provinceId)
  //   if(this.provinceId == null){
  //     this.cityService.getCities(0).then(
  //       res => {
  //           this.cities = res as City[]
  //           console.log(this.cities)
  //       },
  //       err =>{
  //           console.log(err);
  //       }
  //     );
  //     this.wardService.getWards(0).then(
  //       res => {
  //           this.wards = res as Ward[]
  //       },
  //       err =>{
  //           console.log(err);
  //       }
  //   );
  //   }
  //   else{
  //     this.cityService.getCities(this.provinceId).then(
  //       res => {
  //           this.cities = res as City[]
  //           console.log(this.cities)
  //       },
  //       err =>{
  //           console.log(err);
  //       }
  //     );
  //     this.wardService.getWards(this.citiId).then(
  //       res => {
  //           this.wards = res as Ward[]
  //       },
  //       err =>{
  //           console.log(err);
  //       }
  //   );
  //   }
     
  // }

  // sortWards(){
  //   if(this.citiId == null)
  //   {
  //     this.wardService.getWards(0).then(
  //       res => {
  //           this.wards = res as Ward[]
  //       },
  //       err =>{
  //           console.log(err);
  //       }
  //   );
  //   }
  //   else{
  //     console.log(this.provinceId)
  //     console.log(this.citiId)
  //     this.wardService.getWards(this.citiId).then(
  //       res => {
  //           this.wards = res as Ward[]
  //       },
  //       err =>{
  //           console.log(err);
  //       }
  //   );
  //   }
  // }

  search(){
      console.log("province: " + this.provinceId)
      console.log("category: " + this.categoryid)
      console.log("catHouse: " + this.cateTofhouseid)
  }
}
