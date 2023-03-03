import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";
import { WardAPI } from "../models/wardAPI.model";



@Injectable()
export class WardService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}

     // =============Lan code============
    public async getWards(id: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'ward/getwards/' + id);
        return await lastValueFrom(value);
    } 
     // =============Lan code============
     // ==============Dac code===========
     public async createWard(ward:WardAPI){
        var value=this.httpClient.post(this.baseURLService.BaseURL+ 'address/createWard',ward);
        return await lastValueFrom(value);
    } 
     public async updateWard(ward:WardAPI){
        var value=this.httpClient.put(this.baseURLService.BaseURL+ 'address/updateWard',ward);
        return await lastValueFrom(value);
    } 
    public async checkDelete(id: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'ward/checkDelete/' + id);
        return await lastValueFrom(value);
    } 
    public async delete(id: number){
        var value=this.httpClient.delete(this.baseURLService.BaseURL+ 'ward/deleteWard/' + id);
        return await lastValueFrom(value);
    } 
     //==================================
}
