import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";
import { Invoice } from "../models/invoice.model";
import { InvoiceTable } from "../models/invoicetable.model";




@Injectable()
export class InvoiceService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
    public async findAll(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'invoice/findAll');
        return await lastValueFrom(value);
    } 

  
     public async create(invoice: InvoiceTable) {
        var value = this.httpClient.post(this.baseURLService.BaseURL + 'invoice/addInvoice', invoice);
        return await lastValueFrom(value);
    }

    public async findlastinvoicebyusername(username:string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'invoice/findlastinvoicebyusername/'+username);
        return await lastValueFrom(value);
    }
    public async gettotalamout(username:string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'invoice/gettotalamout/'+username);
        return await lastValueFrom(value);
    }
    public async findlistinvoicenotexprirybyusername(username:string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'invoice/findlistinvoicenotexprirybyusername/'+username);
        return await lastValueFrom(value);
    }
    public async findallinvoicebyusername(username:string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'invoice/findallinvoicebyusername/'+username);
        return await lastValueFrom(value);
    }

    public async findinvoice(invoiceid:number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'invoice/findinvoice/'+invoiceid);
        return await lastValueFrom(value);
    }
}
