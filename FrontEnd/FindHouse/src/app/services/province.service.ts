import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";
import { Province } from "../models/province.model";
import { ProvinceAPI } from "../models/provinceAPI.model";



@Injectable()
export class ProvinceService {

    constructor(
        private baseURLService: BaseURLService,
        private httpClient: HttpClient
    ) { }
    searchAutocomplete(keyword: string): string[] {
        var names: string[] = [];
        this.showall().then(
            trueresult => {
                var provinces = trueresult as Province[];
                for (var i = 0; i < provinces.length; i++) {
                    if (provinces[i].provinceName.includes(keyword)) {
                        names.push(provinces[i].provinceName);
                    }
                }
            },
            erros => {
                console.log(erros);
            }
        );


        return names;
    }

    // =============Lan code============
    public async showall() {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'province/showall');
        return await lastValueFrom(value);
    }

    public async findbyIdPro(idPro: number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'province/findbyid/' + idPro);
        return await lastValueFrom(value);
    }

    // =============Lan code============
    //==============Dac code ============
    public async createProvince(province: ProvinceAPI) {
        var value = this.httpClient.post(this.baseURLService.BaseURL + 'address/createProvince', province);
        return await lastValueFrom(value);
    }
    public async updateProvince(province: ProvinceAPI) {
        var value = this.httpClient.put(this.baseURLService.BaseURL + 'address/updateProvince', province);
        return await lastValueFrom(value);
    }
    public async checkDelete(id: number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'province/checkDelete/' + id);
        return await lastValueFrom(value);
    }
    public async delete(id: number) {
        var value = this.httpClient.delete(this.baseURLService.BaseURL + 'province/deleteProvince/' + id);
        return await lastValueFrom(value);
    }
    //==================================
}
