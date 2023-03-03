import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ReportNews } from "../models/reportnews.model";
import { UpdateReportNewsModel } from "../models/updateReportNewsModel.model";


@Injectable()
export class ReportNewsService {

    constructor(
        private baseURLService: BaseURLService,
        private httpClient: HttpClient
    ) { }

    public async showall() {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/showall');
        return await lastValueFrom(value);
    }
    public async getreportnews(reportId: number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/getreportnews/' + reportId);
        return await lastValueFrom(value);
    }
    public async getreportbyadmin(username: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/getreportbyadmin/' + username);
        return await lastValueFrom(value);
    }

    public async createreports(reportnews: ReportNews) {
        var value = this.httpClient.post(this.baseURLService.BaseURL + 'reportnews/createreports', reportnews);

        return await lastValueFrom(value);
    }
    public async updatereports(reportnews: ReportNews) {
        var value = this.httpClient.put(this.baseURLService.BaseURL + 'reportnews/updatereports', reportnews);

        return await lastValueFrom(value);
    }

    public async checkreportexits(newsid: number, username: string, season: number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/checkreportexits/' + newsid + '/' + username + '/' + season);
        return await lastValueFrom(value);
    }
    public async getreportnewsbynewidandpolitics(newsid: number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/getreportnewsbynewidandpolitics/' + newsid);
        return await lastValueFrom(value);
    }
    public async getreportnewsbynewidandcheat(newsid: number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/getreportnewsbynewidandcheat/' + newsid);
        return await lastValueFrom(value);
    }
    //---------------------------Lan code----------------------------------------

    public async getreporttouser(username: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/getreporttouser/' + username);
        return await lastValueFrom(value);
    }
    //--------------------Dac code

    public async getreportbysuperadmin() {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/getreportbysuperadmin');
        return await lastValueFrom(value);
    }
    public async getreportbyidnewssuperadmin(newid: number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'reportnews/getreportbyidnewssuperadmin/' + newid);
        return await lastValueFrom(value);
    }
    public async updatereportssuperadmin(reportnews: UpdateReportNewsModel) {
        var value = this.httpClient.put(this.baseURLService.BaseURL + 'reportnews/updatereportssuperadmin', reportnews);

        return await lastValueFrom(value);
    }
    public async setactivereportssuperadmin(reportnews: UpdateReportNewsModel) {
        var value = this.httpClient.put(this.baseURLService.BaseURL + 'reportnews/setactivereportssuperadmin', reportnews);

        return await lastValueFrom(value);
    }
    public async locknews(reportnews: ReportNews) {
        var value = this.httpClient.put(this.baseURLService.BaseURL + 'reportnews/locknews', reportnews);

        return await lastValueFrom(value);
    }
    public async deletereportsuperlock(id: number) {
        var value = this.httpClient.delete(this.baseURLService.BaseURL + 'reportnews/deletereportsuperlock/' + id);

        return await lastValueFrom(value);
    }



}







