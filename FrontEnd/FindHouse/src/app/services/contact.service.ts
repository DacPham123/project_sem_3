import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { LoginModel } from "../models/login.model";
import { Contact } from "../models/contact.model";


@Injectable()
export class  ContactService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient,
        
    ){}
    
    public async send(contact:Contact){
        var value=this.httpClient.post(this.baseURLService.BaseURL+'contact/sendContact',contact);
        return await lastValueFrom(value);
    }

  
    
}