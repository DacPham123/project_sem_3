import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { NewTypes } from 'src/app/models/newtype.model';
import { CategoryService } from 'src/app/services/category.service';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { NewstypeService } from 'src/app/services/newstype.service';
import { CookieService } from 'ngx-cookie-service';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'mainnav',
  templateUrl: 'mainnav.component.html'
})
export class MainNavComponent implements OnInit {

  statusLogin:boolean;
  catehouse:CateOfHouse[];
  newtype:NewTypes[];
  category:Category[];
  username:string;
  account:Account;
  checkRole:string;
  accphoto:string;
  constructor(
    private catehouseservice:CateTOFhouseService,
    private newstypeservice:NewstypeService,
    private categoryService:CategoryService,
    private jwtHelper:JwtHelperService,
    private accountservice:AccountService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("username") != null || localStorage.getItem("username") === "") {
      this.checkRole = localStorage.getItem("role");
      this.username=localStorage.getItem("username");
      this.accountservice.findByUsername(this.username).then(
        trueresult=>{         
            this.account=trueresult as  Account; 
          this.accphoto=this.account.photo;
        },
        erros=>{
            console.log(erros);
        }
      );
    }
    else{
      this.username=null;

    }

    this.catehouseservice.showall().then(
      trueresult=>{
         
          this.catehouse=trueresult as  CateOfHouse[]; 
      },
      erros=>{
          console.log(erros);
      }
    );

    this.newstypeservice.showall().then(
      trueresult=>{
         
          this.newtype=trueresult as  NewTypes[]; 
      },
      erros=>{
          console.log(erros);
      }
    );

    this.categoryService.showall().then(
      trueresult=>{
         
          this.category=trueresult as  Category[]; 
      },
      erros=>{
          console.log(erros);
      }
    );
    
  }

}
