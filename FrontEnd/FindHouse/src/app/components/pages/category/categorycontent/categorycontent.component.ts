import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { City } from 'src/app/models/city.model';
import { NewTypes } from 'src/app/models/newtype.model';
import { Province } from 'src/app/models/province.model';
import { Ward } from 'src/app/models/ward.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { NewstypeService } from 'src/app/services/newstype.service';
import { ProvinceService } from 'src/app/services/province.service';
import { WardService } from 'src/app/services/ward.service';
import { XuanNewsService } from 'src/app/services/xuannews.service';
import {Message} from 'primeng//api';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({

  selector:'categorycontent',
  templateUrl: 'categorycontent.component.html'
})
export class CategoryContentComponent implements OnInit {

  categoryid:number;
  totalpage:number;

  newlistfromAPI:XuanNews[];
  newsload:XuanNews[];
  pagenumber:number;
  coutshowitem:number;
  totalitem:number;

  
  getnewtype:NewTypes;
  newtypelist:NewTypes[];

  citylist:City[];
  getcity:City;

  provincelist:Province[];
  getprovince:Province;

  getcategoryofhouse:CateOfHouse;
  categoryofhouselist:CateOfHouse[];

  wardlist:Ward[];
  getward:Ward;
  
  constructor(
    private route: ActivatedRoute,
    private newstypeService : NewstypeService,
    private cityService :CityService,
    private provinceService:ProvinceService,
    private categoryService:CategoryService,
    private wardService:WardService,
    private messageService: MessageService,
    private newsService : XuanNewsService,
    private cateTOFhouseService : CateTOFhouseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {

      this.getcity=null;
      this.getward=null;
      this.pagenumber=1;
    
      
      this.categoryid=params['categoryid'];  
     //-----show new
     this.showlistformAPI();

    //-----show type new o thanh fillter
      this.newstypeService.showall().then(
        trueresult =>{         
          this.newtypelist= trueresult as NewTypes[];

        },
        erros=>{
          console.log('loi gi do');
          console.log(erros);
        }        
      );
  
   //----show categoryof hoise thanh fillter
      this.cateTOFhouseService.showall().then(
        trueresult =>{
          this.categoryofhouselist= trueresult as CateOfHouse[];
          
        },
        erros=>{
          console.log(erros);
        }        
      );
      //-----show province o thanh fillter
      this.provinceService.showall().then(
        trueresult =>{
          this.provincelist= trueresult as Province[];
          
        },
        erros=>{
          console.log(erros);
        }        
      );
     
     
    });
    
  }
  
  loadnewsload(listnews:XuanNews[]){
    this.newsload=[];
    if(listnews.length>=6){

      for(var i=0;i<this.pagenumber*6;i++){    
        this.newsload.push(listnews[i])            
      }
      this.totalpage=(listnews.length%6==0)?Math.floor(listnews.length/6):Math.floor(listnews.length/6) +1;

    }else if(listnews.length<6 && listnews.length>0 ){
      this.totalpage=1;
      for(var i=0;i<listnews.length;i++){    
        this.newsload.push(listnews[i])             
      }
    }else{
      this.totalpage=1;
      this.newsload=[];
    }
    console.log(this.newsload);
    
  }

  loadmore(){
    this.newsload=[];
    this.pagenumber+=1;
    if(this.pagenumber<this.totalpage){
      for(var i=0;i<this.pagenumber*6;i++){    
        this.newsload.push(this.newlistfromAPI[i])
      }
    }else if(this.pagenumber==this.totalpage){
      for(var i=0;i<this.newlistfromAPI.length;i++){    
        this.newsload.push(this.newlistfromAPI[i])      
      }
    }else{
      this.messageService.add({severity:'warn', summary: 'Info', detail: 'All Item Loaded'});
      for(var i=0;i<this.newlistfromAPI.length;i++){    
        this.newsload.push(this.newlistfromAPI[i])      
      }
    }
    
  }

  
  showCity(){
    
    if(this.getprovince !=null){
      this.cityService.getCities(this.getprovince.provinceId).then(
        trueresult =>{
          this.citylist= trueresult as City[];
        },
        erros=>{
          console.log(erros);
        }        
      );
    }else{
      this.citylist=null;
      this.wardlist=null;
    }
    
  }

  showWard(){
    if(this.getcity !=null){
      this.wardService.getWards(this.getcity.citiId).then(
        trueresult =>{
          this.wardlist= trueresult as Ward[];
  
        },
        erros=>{
          console.log(erros);
        }        
      );
    }else{
      this.wardlist=null;
    }
    
  }
 

  seach(){

    if(this.getnewtype !=null || this.getprovince !=null || this.getcategoryofhouse !=null ){
      if(this.getprovince == null){
        this.provincenull();
        console.log(this.newsload);
      }else{
        if(this.getcategoryofhouse !=null && this.getnewtype !=null && this.getprovince != null){
          this.categoryofhouseNOTnullandnewtypeNOTnull();
          console.log(this.newsload);
        }else if(this.getcategoryofhouse ==null && this.getnewtype !=null && this.getprovince != null){
          this.categoryofhousenullandnewtypenotnull();
          console.log(this.newsload);
        }
        else if(this.getcategoryofhouse !=null && this.getnewtype ==null && this.getprovince != null){
          this.categoryofhousenotnullandnewtypenull();
          console.log(this.newsload);
        }
        else if(this.getcategoryofhouse ==null && this.getnewtype ==null && this.getprovince != null){
          this.categoryofhousenullandnewtypenull();
          console.log(this.newsload);
        }
      }

    }else{
      this.showlistformAPI();
    }
    
  }

  showlistformAPI(){
    this.newlistfromAPI=[];
      this.newsload=[];
      this.newsService.showbycategory(this.categoryid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          
      },
        erros=>{
          console.log(erros);
        }        
      );
  }
  provincenull(){
    if(this.getcategoryofhouse==null && this.getnewtype !=null){
      this.xsearch12(this.getnewtype.newstypeid);
    }else if(this.getcategoryofhouse!=null && this.getnewtype ==null){
      this.Lsearch1(this.getcategoryofhouse.cateTofhouseid);
    }else if(this.getcategoryofhouse!=null && this.getnewtype !=null){
      this.xsearch3(this.getnewtype.newstypeid,this.getcategoryofhouse.cateTofhouseid);
    }
  }

  categoryofhousenullandnewtypenotnull(){
    if(this.getcategoryofhouse==null && this.getnewtype !=null && this.getprovince !=null && this.getcity ==null && this.getward == null){
      this.xsearch16(this.getnewtype.newstypeid,this.getprovince.provinceId);
    }else if(this.getcategoryofhouse!=null && this.getnewtype ==null && this.getprovince !=null && this.getcity !=null && this.getward == null){
      this.xsearch17(this.getnewtype.newstypeid,this.getprovince.provinceId,this.getcity.citiId);
    }else if(this.getcategoryofhouse!=null && this.getnewtype !=null && this.getprovince !=null && this.getcity !=null && this.getward != null){
      this.xsearch18(this.getnewtype.newstypeid,this.getprovince.provinceId,this.getcity.citiId,this.getward.wardId);
    }
  }
  categoryofhousenotnullandnewtypenull(){
    if(this.getcategoryofhouse!=null && this.getnewtype ==null && this.getprovince !=null && this.getcity ==null && this.getward == null){
      this.lsearch2(this.getcategoryofhouse.cateTofhouseid,this.getprovince.provinceId);
    }else if(this.getcategoryofhouse!=null && this.getnewtype ==null && this.getprovince !=null && this.getcity !=null && this.getward == null){
      this.lsearch3(this.getcategoryofhouse.cateTofhouseid,this.getprovince.provinceId,this.getcity.citiId);
    }else if(this.getcategoryofhouse!=null && this.getnewtype ==null && this.getprovince !=null && this.getcity !=null && this.getward != null){
      this.lsearch4(this.getcategoryofhouse.cateTofhouseid,this.getprovince.provinceId,this.getcity.citiId,this.getward.wardId);
    }
  }
  categoryofhousenullandnewtypenull(){
    if(this.getcategoryofhouse==null && this.getnewtype ==null && this.getprovince !=null && this.getcity ==null && this.getward == null){
      this.xsearch19(this.getprovince.provinceId);
    }else if(this.getcategoryofhouse==null && this.getnewtype ==null && this.getprovince !=null && this.getcity !=null && this.getward == null){
      this.xsearch20(this.getprovince.provinceId,this.getcity.citiId);
    }else if(this.getcategoryofhouse==null && this.getnewtype ==null && this.getprovince !=null && this.getcity !=null && this.getward != null){
      this.xsearch21(this.getprovince.provinceId,this.getcity.citiId,this.getward.wardId);
    }
  }

  categoryofhouseNOTnullandnewtypeNOTnull(){
    if(this.getcategoryofhouse!=null && this.getnewtype !=null && this.getprovince !=null && this.getcity ==null && this.getward == null){
      this.xsearch7(this.getcategoryofhouse.cateTofhouseid,this.getnewtype.newstypeid,this.getprovince.provinceId);
    }else if(this.getcategoryofhouse!=null && this.getnewtype !=null && this.getprovince !=null && this.getcity !=null && this.getward == null){
      this.xsearch8(this.getcategoryofhouse.cateTofhouseid,this.getnewtype.newstypeid,this.getprovince.provinceId,this.getcity.citiId);
    }else if(this.getcategoryofhouse!=null && this.getnewtype !=null && this.getprovince !=null && this.getcity !=null && this.getward != null){
      this.xsearch9(this.getcategoryofhouse.cateTofhouseid,this.getnewtype.newstypeid,this.getprovince.provinceId,this.getcity.citiId,this.getward.wardId);
    }
  }



  xsearch12(newstypeid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch12(newstypeid,this.categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  Lsearch1(categoryofhouseid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch1(categoryofhouseid,this.categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch3(getnewtypeId:number,cateofhouseid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch3(cateofhouseid,getnewtypeId,this.categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch16(newstypeid:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch16(newstypeid,this.categoryid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch17(newstypeid:number,provinceId:number,citiId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch17(newstypeid,this.categoryid,provinceId,citiId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch18(newstypeid:number,provinceId:number,citiId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch18(newstypeid,this.categoryid,provinceId,citiId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  lsearch2(cateofhouseid:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch2(provinceId,cateofhouseid,this.categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  lsearch3(cateofhouseid:number,provinceId:number,cityid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch3(provinceId,cityid,cateofhouseid,this.categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  lsearch4(cateofhouseid:number,provinceId:number,cityid:number,wardid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch4(provinceId,cityid,wardid,cateofhouseid,this.categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch19(provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch19(this.categoryid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch20(provinceId:number,citiId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch20(this.categoryid,provinceId,citiId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch21(provinceId:number,citiId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch21(this.categoryid,provinceId,citiId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch7(getnewtypeId:number,cateofhouseid:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch7(cateofhouseid,getnewtypeId,this.categoryid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch8(getnewtypeId:number,cateofhouseid:number,provinceId:number,cityId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch8(cateofhouseid,getnewtypeId,this.categoryid,provinceId,cityId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch9(getnewtypeId:number,cateofhouseid:number,provinceId:number,cityId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch9(cateofhouseid,getnewtypeId,this.categoryid,provinceId,cityId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }








}
