import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";
import { CityAPi } from "../models/cityAPI.model";



@Injectable()
export class CityService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
     // =============Lan code============
    public async getCities(id: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'city/getcities/' + id);
        return await lastValueFrom(value);
    } 
    //==================================

    //============Dac code=============
    public async createCity(city:CityAPi){
        var value=this.httpClient.post(this.baseURLService.BaseURL+ 'address/createCity',city);
        return await lastValueFrom(value);
    } 
    public async updateCity(city:CityAPi){
        var value=this.httpClient.put(this.baseURLService.BaseURL+ 'address/updateCity',city);
        return await lastValueFrom(value);
    } 
    public async checkDelete(id: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'city/checkDelete/' + id);
        return await lastValueFrom(value);
    } 
    public async delete(id: number){
        var value=this.httpClient.delete(this.baseURLService.BaseURL+ 'city/deleteCity/' + id);
        return await lastValueFrom(value);
    } 
    //=================================
}
