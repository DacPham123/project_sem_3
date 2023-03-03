import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

import { Package } from "../models/package.model";
import { PackageDac } from "../models/packageDac.model";


@Injectable()
export class PackageService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
    public async showall(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'package/findAll');
        return await lastValueFrom(value);
    }

    public async deletePackage(id: number){
        var value=this.httpClient.delete(this.baseURLService.BaseURL+'package/deletePackage/' + id);
        return await lastValueFrom(value);
    }
  
    public async  addPackage(packages:Package){
        var value=this.httpClient.post(this.baseURLService.BaseURL+'package/addPackage',packages);
        
        return await lastValueFrom(value);
    }
    public async  updatePackage(packages:Package){
        var value=this.httpClient.put(this.baseURLService.BaseURL+'package/updatePackage',packages);
        
        return await lastValueFrom(value);
    }
    public async findpackage(packageid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'package/findpackage/'+packageid);
        return await lastValueFrom(value);
    }
    public async findlistpackagebytype(price:number,date:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'package/findlistpackagebytype/'+price+'/'+date);
        return await lastValueFrom(value);
    }

    //======================Dac code==============
    public async findAll(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'package/findAll');
        return await lastValueFrom(value);
    }
    public async create(pac:PackageDac){
        var value=this.httpClient.post(this.baseURLService.BaseURL+'package/addPackage',pac);
        return await lastValueFrom(value);
    }
    public async update(pac:PackageDac){
        var value=this.httpClient.put(this.baseURLService.BaseURL+'package/updatePackage',pac);
        return await lastValueFrom(value);
    }
    public async getById(id:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'package/getById/'+id);
        return await lastValueFrom(value);
    }
    //============================================
}







