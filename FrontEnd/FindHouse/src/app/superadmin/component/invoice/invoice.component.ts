import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceTable } from 'src/app/models/invoicetable.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import * as FileSaver from 'file-saver';
import { InvoiceExport } from 'src/app/models/invoiceexport.model';


@Component({
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
  @ViewChild('dt', { static: true }) dt: any;
  invoices: Invoice[];
  statuses: any[];
  invoiced: Invoice[];
  invoiceExport:InvoiceExport[];
  constructor(private invoiceSer: InvoiceService) {

  }

  ngOnInit(): void {
    this.invoiceSer.findAll().then(
      res => {
        this.invoices = res as Invoice[]
        this.invoices.forEach(ins => { ins.paDate = new Date(ins.paymentDate); ins.exDate = new Date(ins.expire) })

        this.invoiced = this.invoices;

      },
      err => { console.log(err) }
    )
    this.statuses = [
      { label: 'New', value: '0' },
      { label: 'Upgrade', value: '1' },
      { label: 'Expire', value: '3' },

    ]
  }
  filters(data: any) {
    this.invoiced = data as Invoice[];
  }
  exportExcel() {
    this.invoiceExport=[];
    this.invoiced.forEach(s=>{
      var stt = '';
      if (s.invoiceStatus==0) {
        stt= "New";
      }else if(s.invoiceStatus==1){
        stt= "Upgrade";
      }else if(s.invoiceStatus==3){
        stt= "Expied";
      }
        var exp :InvoiceExport ={
          invoiceId: s.invoiceId,
          price:s.price,
          packageid:s.packageid,
          packageprice:s.packageprice,
          packagetitle:s.packagetitle,
          username:s.username,
          paymentDate:s.paymentDate,
          expire:s.expire,
          packagedate:s.packagedate,
          VipNews:s.noVvipnews,
          SpecialNews:s.noVipnews,
          NomalNews:s.noNormalnews,
          paymentid:s.paymentid,
          Status: stt
        } 
          this.invoiceExport.push(exp);

    })
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.invoiceExport);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "invoices");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
