import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";


@Injectable()
export class NewstypeService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
    public async showall(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'newtype/showall');
        return await lastValueFrom(value);
    }
   public async  getcateofhouse(newstypeid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'newtype/getbyid/'+newstypeid);
        return await lastValueFrom(value);
    }
    
}







