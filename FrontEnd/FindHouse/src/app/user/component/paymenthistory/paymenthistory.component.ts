import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  templateUrl: './paymenthistory.component.html',
})
export class PaymentHistoryComponent implements OnInit {
  username:string;
  listinvoice:Invoice[];
  selectinvoices:Invoice[];
  invoice:Invoice;
  loading: boolean = true;
  constructor(
    private invoiceService:InvoiceService,
  ) {}

  

  ngOnInit(): void {
    this.listinvoice=[];
    this.invoice=null;
    
     this.show();
  }
  show(){
    this.username=localStorage.getItem("username");
    this.invoiceService.findallinvoicebyusername(this.username).then(
      t =>{
        this.listinvoice= t as Invoice[];  
        this.loading = false;
        this.listinvoice.forEach(inv => inv.paymentdate = new Date(inv.paymentDate));
        this.listinvoice.forEach(inv => inv.expiredate = new Date(inv.expire));
      },
      erros=>{
        console.log(erros);
      }                
    );  
  }
}
 