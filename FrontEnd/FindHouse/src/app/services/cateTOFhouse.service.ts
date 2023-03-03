import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";
import { CateOfHouse } from "../models/cateTOFhouse.model";



@Injectable()
export class CateTOFhouseService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
    public async showall(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'cateofhouse/showall');
        return await lastValueFrom(value);
    } 
    public async showalldes(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'cateofhouse/showalldes');
        return await lastValueFrom(value);
    } 
    public async  getcateofhouse(cateTofhouseid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'cateofhouse/findbyid/'+ cateTofhouseid);
        return await lastValueFrom(value);
    }
    public async  addCateOfHouse(cateTofhouse:CateOfHouse){
        var value=this.httpClient.post(this.baseURLService.BaseURL+'cateofhouse/addCateOfHouse/', cateTofhouse);
        return await lastValueFrom(value);
    }
    public async  updateCateOfHouse(cateTofhouse:CateOfHouse){
        var value=this.httpClient.put(this.baseURLService.BaseURL+'cateofhouse/updateCateOfHouse/', cateTofhouse);
        return await lastValueFrom(value);
    }
    public async  delete(id:number){
        var value=this.httpClient.delete(this.baseURLService.BaseURL+'cateofhouse/deleteCateOfHouse/'+id);
        return await lastValueFrom(value);
    }
}
