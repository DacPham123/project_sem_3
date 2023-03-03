import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";
import { NewsTable } from "../models/newstable.model";
import { NewImages } from "../models/newsimagesl.model";



@Injectable()
export class NewsTableService{

    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    //==========================xuan
    
   
    public async  update(news:NewsTable){
        var value=this.httpClient.put(this.baseURLService.BaseURL+'news/updateNews',news);
        
        return await lastValueFrom(value);
    }


 //==========================Lan code====================
 //==========================Lan code====================
 public async createNews(news: NewsTable){
    var value=this.httpClient.post(this.baseURLService.BaseURL+'news/addNews', news );
    return await lastValueFrom(value);
}

public async getNewsDetail(newsid: number){
    var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getNewsDetail/' + newsid );
    return await lastValueFrom(value);
}

public async getNewestNew(username: string){
    var value=this.httpClient.get(this.baseURLService.BaseURL+'news/getNewestNews/' + username);
    return await lastValueFrom(value);
}

public async updateNewsStatus(newsid: number, news: NewsTable){
    var value=this.httpClient.put(this.baseURLService.BaseURL+'news/updateNewsStt/' + newsid , news);
    return await lastValueFrom(value);
}

public async updateNews(news: NewsTable){
    var value=this.httpClient.put(this.baseURLService.BaseURL+'news/updateNews', news );
    return await lastValueFrom(value);
}

public async addImage(newsImg: NewImages){
    var value=this.httpClient.post(this.baseURLService.BaseURL+ 'news/addImg', newsImg);
    return await lastValueFrom(value);
}

public async uploadImage(file: any){
    var value=this.httpClient.post(this.baseURLService.BaseURL+ 'news/uploadImg', file);
    return await lastValueFrom(value);
}

public async deleteImage(newsImgId: number){
    var value=this.httpClient.delete(this.baseURLService.BaseURL+ 'news/deleteImg/' + newsImgId);
    return await lastValueFrom(value);
}

public async deleteNews(newsId: number){
    var value=this.httpClient.delete(this.baseURLService.BaseURL+ 'news/deleteNews/' + newsId);
    return await lastValueFrom(value);
}

public async deleteListNewsImg(newsId: number){
    var value=this.httpClient.delete(this.baseURLService.BaseURL+ 'news/deleteNewsImages/' + newsId);
    return await lastValueFrom(value);
}


}
