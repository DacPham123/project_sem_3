import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Invoice } from '../models/invoice.model';
import { Package } from '../models/package.model';
import { InvoiceService } from '../services/invoice.service';
import { PackageService } from '../services/package.service';
import { formatDate } from "@angular/common";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { MessageService } from 'primeng/api';
import { ResultAPI } from '../models/resultAPI.model';
import { InvoiceTable } from '../models/invoicetable.model';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public showSuccess: boolean;
  useradmin:string;
  myinvoice:Invoice;
  myinvoiceprice:number;
  packageid:number;
  package:Package;
  expire:Date;
  paidamount:number;
  paymentamout:number;
  numberdate:number;
  countdate:number;

  listinvoice:Invoice[];
  checkRole:string;
  
  checkout:boolean;
  item:any;
  paymentstt:string;
  paymentids:string;

  newinvoice:InvoiceTable;
  invstt:number;

  constructor(
    private invoiceService:InvoiceService,
    private packageService:PackageService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.paymentstt=null;
    this.paymentids=null;
    this.checkout=false;
    this.checkRole = localStorage.getItem("role");
    this.useradmin=localStorage.getItem("username");
    this.paidamount=0;
    this.paymentamout=0;
    this.route.params.subscribe( (params) => {
      this.packageid=params['packageid'];  
      this.invoiceService.findlastinvoicebyusername(this.useradmin).then(
        trueresult =>{
          this.myinvoice= trueresult as Invoice;  

          if(this.myinvoice == null){
            this.invstt=0;
            this.packageService.findpackage(this.packageid).then(
              t =>{
                this.package= t as Package;           
                var d = new Date(); 
                d.setDate(d.getDate() + this.package.packagedate);
                this.expire=(d);
                this.paymentamout=this.package.packageprice;
              },
              erros=>{
                console.log(erros);
              }                
            );
          }else{
            this.invstt=1;
            this.packageService.findpackage(this.packageid).then(
              t =>{
                this.package= t as Package;
                  this.invoiceService.findlistinvoicenotexprirybyusername(this.useradmin).then(
                    t =>{
                      this.listinvoice= t as Invoice[];
                      for(var i=0;i<this.listinvoice.length;i++){
                        this.paidamount+=this.listinvoice[i].price;
                        this.numberdate=this.listinvoice[i].packagedate;
                        this.expire=new Date(this.listinvoice[i].expire);
                        
                      }
                      var future = moment(formatDate(this.expire,'yyyy-MM-dd','en-US'));
                      var start = moment(formatDate(new Date(),'yyyy-MM-dd','en-US'));
                      this.countdate = future.diff(start, 'days'); // 9
                      this.paymentamout=((this.package.packageprice/this.numberdate)-(this.paidamount/this.numberdate))*this.countdate;     
                    },
                    erros=>{
                      console.log(erros);
                    }                
                  );                      
              },
              erros=>{
                console.log(erros);
              }                
            );
          }
        },
        erros=>{
          console.log(erros);
        }                
      );
      
      
      
  })
    


  
  }
  checkoutprocess(){
    var d=formatDate(new Date(this.expire),'yyyy-MM-dd','en-US');
    console.log(d);
    this.router.navigate(['/checkout/',{amount:this.paymentamout,packageid:this.packageid,expire:d,invstt:this.invstt}]);
  }


  
 

  
}
 




