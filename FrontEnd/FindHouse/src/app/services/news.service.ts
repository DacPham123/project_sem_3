import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";



@Injectable()
export class NewsService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    //==========================xuan
    //------------------------details
    public async  getnewbyidshowdetailspage(newid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getnewbyidshowdetailspage/'+newid);
        return await lastValueFrom(value);
    }
    public async  getnewsimagesbyid(newid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getnewsimagesbyid/'+newid);
        return await lastValueFrom(value);
    }
    public async  getrandomvipnew(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getrandomvipnew');
        return await lastValueFrom(value);
    }

    public async  getlistbynewstype(newstypeid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getlistbynewstype/'+newstypeid);
        return await lastValueFrom(value);
    }
    //-----------------------admin--------------------------------
            //----------new-----------------------------------------
        public async showallbyadmin(useradmin:string){
            var value=this.httpClient.get(this.baseURLService.BaseURL+'news/showallbyadmin/'+useradmin);
            return await lastValueFrom(value);
        } 
        public async getlistbynewstypeandadmin(newstypeid:number,useradmin:string){
            var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getlistbynewstypeandadmin/'+newstypeid+'/'+useradmin);
            return await lastValueFrom(value);
        } 

        public async getlistnewsagent(useragent:string){
            var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getlistnewsagent/'+useragent);
            return await lastValueFrom(value);
        } 

        public async getalllistnewsagent(useragent:string){
            var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getalllistnewsagent/'+useragent);
            return await lastValueFrom(value);
        } 






      // =============Lan code============
      public async showVipNews(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/showvip');
        return await lastValueFrom(value);
    } 

    public async showSpecialNews(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/showspecial');
        return await lastValueFrom(value);
    } 

    public async showallbyseller(seller:string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/showallbyseller/'+seller);
        return await lastValueFrom(value);
    }  

    public async getlistbynewstypeandseller(newstypeid:number,seller:string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getlistbynewstypeandseller/'+newstypeid+'/'+seller);
        return await lastValueFrom(value);
    } 

    public async getnewsstatusnull(username:string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getnewsstatusnull/'+ username);
        return await lastValueFrom(value);
    }
    
    
     // =============Lan code============

     //==============Dac code==============
     public async findAll(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/showall');
        return await lastValueFrom(value);
    } 
    public async showallbysuperadmin(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/showallbysuperadmin');
        return await lastValueFrom(value);
    } 
    public async  getnewbyidshowdetailspagebysuperadmin(newid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getnewbyidshowdetailspagebysuperadmin/'+newid);
        return await lastValueFrom(value);
    }
    public async setStatusNews(id:number, stt:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/setStatusNews/'+id+'/'+stt);
        return await lastValueFrom(value);
    } 
    public async checkcanactivenews(id:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/checkcanactivenews/'+id);
        return await lastValueFrom(value);
    } 
     //====================================
}
