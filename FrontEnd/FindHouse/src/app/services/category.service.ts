import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";


@Injectable()
export class CategoryService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
    public async showall(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'category/showall');
        return await lastValueFrom(value);
    }

    public async findbyIdCat(idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'category/getbyid/' + idCat);
        return await lastValueFrom(value);
    }
  
    
}







