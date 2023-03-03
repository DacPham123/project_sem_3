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
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';




@Component({

  templateUrl: 'checkout.component.html',

})
export class CheckOutComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public showSuccess: boolean;
  useradmin:string;
 
  packageid:number;
 
  paymentamout:number;
  item:any;
  paymentstt:string;
  paymentids:string;
  checkRole:string;
  newinvoice:InvoiceTable;
  invstt:number;
  expire:string;

  account: Account
  constructor(
    private invoiceService:InvoiceService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.useradmin=localStorage.getItem("username");
    this.checkRole = localStorage.getItem("role");
    this.route.params.subscribe( (params) => {
      this.packageid=params['packageid']; 
      this.paymentamout =params['amount']; 
      this.expire =params['expire']; 
      console.log(this.expire);
      this.invstt=params['invstt']; 
      this.item={
        packageid:this.packageid,
        amount:this.paymentamout,
        username:this.useradmin
      }

      this.initConfig();
      
      
      
  })
    


  
  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AfqG0xOGLvNe_fnRbvTJvyMfTlKnCIUtsc2HvjRK_eQ8FOQJw8qJcAD-dL_xehGwYrgSnptOkQPk3euZ',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.item.amount,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.item.amount
                }
              }
            },
            items: [
              {
                name: this.item.username,
                quantity: '1',
                description:this.item.packageid,
                
                unit_amount: {
                  currency_code: 'USD',
                  value: this.item.amount,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
  
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          this.messageService.add({severity:'success', summary: 'Infomation', detail: 'on Approve'});
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Completed Transaction'});
        this.showSuccess = true;
        this.paymentstt=data.status;
        this.paymentids=data.id;
          console.log(this.paymentstt);
        if(this.paymentstt=='COMPLETED'){
            this.newinvoice={
              invoiceId: 0,
              price:this.paymentamout,
              packageid:this.packageid,
              username: this.useradmin,
              paymentDate: formatDate(new Date(),'yyyy-MM-dd','en-US'),
              expire: (formatDate(this.expire,'yyyy-MM-dd','en-US')),
              paymentid:this.paymentids,
              invoiceStatus: this.invstt,
            }
            this.insertinvoice(this.newinvoice);
            this.changeroute();
          }
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Cancel'});
      },
      onError: err => {
        console.log('OnError', err);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error'});
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
  
  insertinvoice(invoice:InvoiceTable){
    this.invoiceService.create(invoice).then(
      res=>{
        var resl: ResultAPI=res as ResultAPI  ;
        if(resl.result){
          this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Created Invoice'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error'});
        }
    },
    err=>{
        console.log(err);
    }               
    );
  }


  changeroute(){
    if(this.checkRole == 'admin'){
      this.router.navigate(['/admin/paymenthistory/']);
    } else if(this.checkRole == 'privateseller'){
      this.router.navigate(['/privatesale/paymenthistory/']);
    }else if(this.checkRole == 'visitor'){
      this.accountService.findByUsername(this.useradmin).then(
        trueresult =>{         
          this.account= trueresult as Account;
          this.account.accrole = 4,
          this.accountService.updateAccount(this.useradmin, this.account).then(
            res=>{
              var resl: ResultAPI=res as ResultAPI  ;
              if(resl.result){
                this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Please, sign in again to creat your news!', sticky: true});
                this.router.navigate(['/logout']);
              }else{
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error'});
              }
          },
          err=>{
              console.log(err);
          }               
          );
          
        },
        erros=>{
          console.log(erros);
        }        
      );
      
    }
  }
}
 




