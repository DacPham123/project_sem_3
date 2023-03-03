import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { lastValueFrom } from "rxjs";



@Injectable()
export class XuanNewsService{
    constructor(
        private baseURLService:BaseURLService,
        private httpClient : HttpClient
    ){}
    
    public async showall(){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/showall');
        return await lastValueFrom(value);
    } 

    public async  getcateofhouse(categoryofhouseid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/showbycategoryofhouse/'+categoryofhouseid);
        return await lastValueFrom(value);
    }

    public async  xsearch1(categoryofhouseid:number,getnewtypeId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch1/'+categoryofhouseid+'/'+getnewtypeId);
        return await lastValueFrom(value);
    }

    public async  xsearch3(categoryofhouseid:number,typeNewsID:number,categoryid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch3/'+categoryofhouseid+'/'+typeNewsID+'/'+categoryid);
        return await lastValueFrom(value);
    }
    public async  xsearch4(categoryofhouseid:number,getnewtypeId:number,provinceId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch4/'+categoryofhouseid+'/'+getnewtypeId+'/'+provinceId);
        return await lastValueFrom(value);
    }
    public async  xsearch5(categoryofhouseid:number,getnewtypeId:number,provinceId:number,cityId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch5/'+categoryofhouseid+'/'+getnewtypeId+'/'+provinceId+'/'+cityId);
        return await lastValueFrom(value);
    }
    public async  xsearch6(categoryofhouseid:number,getnewtypeId:number,provinceId:number,cityId:number,wardId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch6/'+categoryofhouseid+'/'+getnewtypeId+'/'+provinceId+'/'+cityId+'/'+wardId);
        return await lastValueFrom(value);
    }
    public async  xsearch7(categoryofhouseid:number,getnewtypeId:number,categoryid:number,provinceId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch7/'+categoryofhouseid+'/'+getnewtypeId+'/'+categoryid+'/'+provinceId);
        return await lastValueFrom(value);
    }
    public async  xsearch8(categoryofhouseid:number,getnewtypeId:number,categoryid:number,provinceId:number,cityId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch8/'+ categoryofhouseid+'/'+getnewtypeId+'/'+categoryid+'/'+provinceId+'/'+cityId);
        return await lastValueFrom(value);
    }
    public async  xsearch9(categoryofhouseid:number,getnewtypeId:number,categoryid:number,provinceId:number,cityId:number,wardId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch9/'+ categoryofhouseid+'/'+getnewtypeId+'/'+categoryid+'/'+provinceId+'/'+cityId+'/'+wardId );
        return await lastValueFrom(value);
    }
    public async  xsearch10(categoryofhouseid:number,provinceId:number,cityId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch10/'+ categoryofhouseid+'/'+provinceId+'/'+cityId);
        return await lastValueFrom(value);
    }
    public async  xsearch11(categoryofhouseid:number,provinceId:number,cityId:number,wardId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch11/'+ categoryofhouseid+'/'+provinceId+'/'+cityId+'/'+wardId);
        return await lastValueFrom(value);
    }

    public async  xsearch12(typeNewsID:number,categoryid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch12/'+ typeNewsID+'/'+categoryid);
        return await lastValueFrom(value);
    }
    public async  xsearch13(typeNewsID:number,provinceId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch13/'+ typeNewsID+'/'+provinceId);
        return await lastValueFrom(value);
    }
    public async  xsearch14(typeNewsID:number,provinceId:number,citiId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch14/'+ typeNewsID+'/'+provinceId+'/'+citiId);
        return await lastValueFrom(value);
    }
    public async  xsearch15(typeNewsID:number,provinceId:number,citiId:number,wardId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch15/'+ typeNewsID+'/'+provinceId+'/'+citiId+'/'+wardId);
        return await lastValueFrom(value);
    }
    public async  xsearch16(typeNewsID:number,categoryid:number,provinceId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch16/'+ typeNewsID+'/'+categoryid+'/'+provinceId);
        return await lastValueFrom(value);
    }
    public async  xsearch17(typeNewsID:number,categoryid:number,provinceId:number,citiId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch17/'+ typeNewsID+'/'+provinceId+'/'+citiId);
        return await lastValueFrom(value);
    }
    public async  xsearch18(typeNewsID:number,categoryid:number,provinceId:number,citiId:number,wardId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch18/'+ typeNewsID+'/'+provinceId+'/'+citiId+'/'+wardId);
        return await lastValueFrom(value);
    }

      //-----newtype------------------------

      public async  showbynewtype(newtypeid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/showbynewtype/'+newtypeid);
        return await lastValueFrom(value);
    }


    //----------------------category


    public async  showbycategory(categoryid:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/showbycategory/'+categoryid);
        return await lastValueFrom(value);
    }

    public async  xsearch19(categoryid:number,provinceId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch19/'+categoryid+'/'+provinceId);
        return await lastValueFrom(value);
    }
    public async  xsearch20(categoryid:number,provinceId:number,citiId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch20/'+ categoryid+'/'+provinceId+'/'+citiId);
        return await lastValueFrom(value);
    }
    public async  xsearch21(categoryid:number,provinceId:number,citiId:number,wardId:number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+'news/xsearch21/'+categoryid+'/'+provinceId+'/'+citiId+'/'+wardId);
        return await lastValueFrom(value);
    }

    public async Search(keyword: string){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/search/' + keyword);
        return await lastValueFrom(value);
    }






    
    // ===========================Lan code o day======================================
    
    public async Lsearch1(idCatHouse: number, idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch1/' + idCatHouse + "/" + idCat);
        return await lastValueFrom(value);
    } 

    public async Lsearch2(idPro: number, idCatHouse: number, idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch2/' + idPro +  "/" + idCatHouse + "/" + idCat);
        return await lastValueFrom(value);
    } 

    public async Lsearch3(idPro: number, idCity: number, idCatHouse: number, idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch3/' + idPro + "/" + idCity + "/" + idCatHouse + "/" + idCat);
        return await lastValueFrom(value);
    } 

    public async Lsearch4(idPro: number, idCity: number, idWard: number, idCatHouse: number, idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch4/' + idPro + "/" + idCity + "/" + idWard + "/" + idCatHouse + "/" + idCat);
        return await lastValueFrom(value);
    } 

    public async Lsearch5(idPro: number, idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch5/' + idPro + "/" + idCat);
        return await lastValueFrom(value);
    }

    public async Lsearch6(idPro: number, idCity: number, idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch6/' + idPro + "/" + idCity + "/" + idCat);
        return await lastValueFrom(value);
    }

    public async Lsearch7(idPro: number, idCity: number, idWard: number, idCat: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch7/' + idPro + "/" + idCity + "/" + idWard + "/" + idCat);
        return await lastValueFrom(value);
    }

    public async Lsearch8(idPro: number, idCatHouse: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch8/' + idPro + "/" + idCatHouse);
        return await lastValueFrom(value);
    }

    public async Lsearch11(idPro: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch11/' + idPro);
        return await lastValueFrom(value);
    }

    public async Lsearch12(idPro: number, idCity: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch12/' + idPro + "/" + idCity);
        return await lastValueFrom(value);
    }

    public async Lsearch13(idPro: number, idCity: number, idWard: number){
        var value=this.httpClient.get(this.baseURLService.BaseURL+ 'news/lsearch13/' + idPro + "/" + idCity + "/" + idWard);
        return await lastValueFrom(value);
    }
}
