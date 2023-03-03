import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  templateUrl: './paymentdetails.component.html',
})
export class PaymentDetailsComponent implements OnInit {
  username:string;
 
  invoiceid:number;
  invoice:Invoice;
 
  constructor(
    private invoiceService:InvoiceService,
    private route: ActivatedRoute,
  ) {}

  

  ngOnInit(): void {
   
    this.invoice=null;
    this.route.params.subscribe( (params) => {
      this.invoiceid=params['invoiceid'];  
      this.invoiceService.findinvoice(this.invoiceid).then(
        t =>{
          this.invoice=t as Invoice;
          this.invoice.expiredate=new Date(this.invoice.expire);
          this.invoice.paymentdate=new Date(this.invoice.paymentDate);
        },
        erros=>{
          console.log(erros);
        }                
      ); 
    })
     
  }
  
}
 