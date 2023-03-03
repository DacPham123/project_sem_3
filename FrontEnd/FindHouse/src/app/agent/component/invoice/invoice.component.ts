import { Component, OnInit } from '@angular/core';

import { Invoice } from 'src/app/models/invoice.model';
import { News } from 'src/app/models/news.model';
import { Package } from 'src/app/models/package.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NewsService } from 'src/app/services/news.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
  useradmin:string;
  myinvoice:Invoice;
  buynewpackage:boolean;
  showmypackage:boolean;
  countvvip:number;
  countspecial:number;
  countordinary:number;
  listnewsbynewstype:News[];

  listpackage:Package[];
  mypackage:Package;

  mypackageprice:number;
  showlistpackage:boolean;

  paymentamount:number;
count:number;
  constructor(
    private newsService:NewsService,
    private invoiceService:InvoiceService,
    private packageService:PackageService,
  ) {}

  ngOnInit(): void {
    this.showlistpackage=false;
    this.countvvip=0;
    this.countspecial=0;
    this.countordinary=0;
    this.listpackage=[];
    this.useradmin=localStorage.getItem("username");
 
    this.invoiceService.findlastinvoicebyusername(this.useradmin).then(
      trueresult =>{
        this.myinvoice= trueresult as Invoice;  
        if(this.myinvoice !=null){
          this.mypackage={
            packageId: this.myinvoice.packageid, 
            packagetitle: this.myinvoice.packagetitle,
            packageprice: this.myinvoice.packageprice,
            packagedate: this.myinvoice.packagedate,
            noVVipnews: this.myinvoice.noVvipnews,
            noVipnews: this.myinvoice.noVipnews,
            noNormalnews:  this.myinvoice.noNormalnews,
            packageContent: this.myinvoice.packagecontent,       
          }
        
          this.packageService.findlistpackagebytype(this.mypackage.packageprice, this.mypackage.packagedate).then(
            t =>{
              this.listpackage= t as Package[];
              this.count=this.listpackage.length;
              console.log("count: " + this.count)
            },
            erros=>{
              console.log(erros);
            }                
          );
        if( new Date(this.myinvoice.expire) > new Date() ){
          this.showmypackage=true;
          this.buynewpackage=false;

        }else{
          this.showmypackage=false;
        }
      }else{
        this.showmypackage=false;
      }
    },
    erros=>{
      console.log(erros);
    } 
    );

      this.newsService.getlistbynewstypeandseller(1,this.useradmin).then(
        trueresult =>{
          this.listnewsbynewstype= trueresult as News[];
          this.countvvip=this.listnewsbynewstype.length;        
        },
        erros=>{
          console.log(erros);
        }                
      );

      this.newsService.getlistbynewstypeandseller(2,this.useradmin).then(
        trueresult =>{
          this.listnewsbynewstype= trueresult as News[];
          this.countspecial=this.listnewsbynewstype.length;        
        },
        erros=>{
          console.log(erros);
        }                
      );
      this.newsService.getlistbynewstypeandseller(3,this.useradmin).then(
        trueresult =>{
          this.listnewsbynewstype= trueresult as News[];
          this.countordinary=this.listnewsbynewstype.length;        
        },
        erros=>{
          console.log(erros);
        }                
      );
    
  }

  updatemypakage(){    
   
    this.showlistpackage=true;

  }

  checkupdate(){
    
  }
  listpackages(){
    this.listpackage=[];
    this.packageService.showall().then(
      t =>{
        this.listpackage= t as Package[];
        this.showlistpackage=true;
      },
      erros=>{
        console.log(erros);
      }                
    );
  }








}
 