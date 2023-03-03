import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";
import { Account } from "../models/account.model";
import { LoginModel } from "../models/login.model";



@Injectable()
export class AccountService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
     //=================Code cua xuan
     public async getlistagent(useradmin:string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/getlistagent/'+useradmin);
        return await lastValueFrom(value);
    } 
    public async sendemail(useradmin:string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/sendemail/'+useradmin);
        return await lastValueFrom(value);
    } 
   //=================Code cua Lan
   public async showAgent(){
    var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/getagent');
    return await lastValueFrom(value);
} 

public async updateAccount(username: string, account: Account){
    var value=this.httpClient.put(this.baseURLService.BaseURL+ 'account/updateAccount/' + username, account);
    return await lastValueFrom(value);
} 

public async updateAvatar(username: string, account: Account){
    var value=this.httpClient.put(this.baseURLService.BaseURL+ 'account/updateAvatar/' + username, account);
    return await lastValueFrom(value);
}

public async uploadAvatar(file: any){
    var value=this.httpClient.post(this.baseURLService.BaseURL+ 'account/uploadAvatar', file);
    return await lastValueFrom(value);
}
    //=============Code Cua Dac
     //=============Code Cua Dac
     public async create(account: Account) {
        var value = this.httpClient.post(this.baseURLService.BaseURL + 'account/createAccount', account);
        return await lastValueFrom(value);
    }
    public async findAll() {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/findAll');
        return await lastValueFrom(value);
    }
    public async findByUsername(user:string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/findByUsername/'+user);
        return await lastValueFrom(value);
    }
    public async checkDupUser(user: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/checkDupUsername/' + user);
        return await lastValueFrom(value);
    }
  
    public async checkDupEmail1(email: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/checkDupEmail/' + email);
        return await lastValueFrom(value);
    }
    public async verifyAccount(code: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/sendVerifyEmail/' + code);
        return await lastValueFrom(value);
    }
    public async activeAccount(username: string, activeCode: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/activeAccount/' + username + '/' + activeCode);
        return await lastValueFrom(value);
    }
    public async sendVerifyCode(user: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/sendVerifyCode/' + user);
        return await lastValueFrom(value);
    }
    public async sendResetPass(user: string) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/sendResetPass/' + user);
        return await lastValueFrom(value);
    }
    public async changePassword(changePass: LoginModel) {
        var value = this.httpClient.post(this.baseURLService.BaseURL + 'account/changePassword', changePass);
        return await lastValueFrom(value);
    }
    public async updateStatusBySuperAdmin(user: string, stt:number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/updateStatusBySuperAdmin/' + user+'/' + stt);
        return await lastValueFrom(value);
    }
    public async findByRole(role:number) {
        var value = this.httpClient.get(this.baseURLService.BaseURL + 'account/getAccountByRole/'+role);
        return await lastValueFrom(value);
    }
    public async createBySuperAdmin(account: Account) {
        var value = this.httpClient.post(this.baseURLService.BaseURL + 'account/createAccountBySuperAdmin', account);
        return await lastValueFrom(value);
    }
    public async sendemaillocked(user:string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'account/sendemaillocked/'+user);
        return await lastValueFrom(value);
    } 
}
