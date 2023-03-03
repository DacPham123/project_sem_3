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

@Component({

  selector:'categoryofhousecontent',
  templateUrl: 'categoryofhousecontent.component.html'
})
export class CategoryOfHouseContentComponent implements OnInit {

  cateofhouseid:number;
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

  categorylist:Category[];
  getcategory:Category;

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
    private newsService : XuanNewsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {

      this.getcity=null;
      this.getward=null;
      this.pagenumber=1;
      this.newsload=[];
      this.newlistfromAPI=[];
      
      this.cateofhouseid=params['cateTofhouseid'];  
     //-----show new
      this.newsService.getcateofhouse(this.cateofhouseid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          console.log(this.newlistfromAPI);
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          
      },
        erros=>{
          console.log(erros);
        }        
      );

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
  
   //----show category o thanh fillter
      this.categoryService.showall().then(
        trueresult =>{
          this.categorylist= trueresult as Category[];
          
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

    if(this.getnewtype !=null || this.getprovince !=null || this.getcategory !=null ){
      if(this.getprovince ==null ){
          this.provinceisnull();
      }else {
        if(this.getcategory == null && this.getnewtype !=null){
            this.categorynullandnewtypenotnull();
        }else if(this.getcategory != null && this.getnewtype !=null){
            this.categorynotnullandnewtypenotnull();
        }else if(this.getcategory == null && this.getnewtype ==null){
            this.categorynullandnewtypenull();
        }else if(this.getcategory !=null && this.getnewtype==null){
          this.categorynotnullandnewtypenull();
        }
      }

    }else{
      this.newlistfromAPI=[];
      this.newsload=[];
      this.newsService.showbycategory(this.cateofhouseid).then(
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
    
  }

  provinceisnull(){
    if(this.getcategory !=null && this.getnewtype ==null){
      this.xsearch2(this.getcategory.categoryid);
    }else if(this.getcategory ==null && this.getnewtype !=null){
      this.xsearch1(this.getnewtype.newstypeid);
    }else{
      this.xsearch3(this.getnewtype.newstypeid,this.getcategory.categoryid);
    }
  }
  
  categorynullandnewtypenotnull(){
    if(this.getnewtype !=null && this.getprovince !=null && this.getcity == null && this.getward == null ){
      this.xsearch4(this.getnewtype.newstypeid,this.getprovince.provinceId);
    }else if( this.getnewtype !=null && this.getprovince !=null && this.getcity != null && this.getward == null ){
      this.xsearch5(this.getnewtype.newstypeid,this.getprovince.provinceId , this.getcity.citiId);
    }else if( this.getnewtype !=null && this.getprovince !=null && this.getcity != null && this.getward != null ){
      this.xsearch6(this.getnewtype.newstypeid,this.getprovince.provinceId , this.getcity.citiId,this.getward.wardId);
    }
  }

  categorynotnullandnewtypenull(){
    if(this.getcategory !=null && this.getprovince !=null && this.getcity == null && this.getward == null ){
      this.xsearch13(this.getprovince.provinceId,this.getcategory.categoryid);
    }else if( this.getcategory !=null && this.getprovince !=null && this.getcity != null && this.getward == null ){
      this.xsearch14(this.getprovince.provinceId,this.getcategory.categoryid,this.getcity.citiId);
    }else if( this.getcategory !=null && this.getprovince !=null && this.getcity != null && this.getward != null ){
      this.xsearch15(this.getprovince.provinceId,this.getcategory.categoryid,this.getcity.citiId,this.getward.wardId);
    }
  }


  categorynotnullandnewtypenotnull(){
    if(this.getcategory!=null && this.getnewtype !=null && this.getprovince !=null && this.getcity == null && this.getward == null ){
      this.xsearch7(this.getnewtype.newstypeid,this.getcategory.categoryid,this.getprovince.provinceId);
    }else if( this.getcategory!=null && this.getnewtype !=null && this.getprovince !=null && this.getcity != null && this.getward == null  ){
      this.xsearch8(this.getnewtype.newstypeid,this.getcategory.categoryid,this.getprovince.provinceId , this.getcity.citiId);
    }else if(this.getcategory!=null && this.getnewtype !=null && this.getprovince !=null && this.getcity != null && this.getward != null ){
      this.xsearch9(this.getnewtype.newstypeid,this.getcategory.categoryid,this.getprovince.provinceId , this.getcity.citiId,this.getward.wardId);
    }
  }

  categorynullandnewtypenull(){
    if( this.getprovince !=null && this.getcity == null && this.getward == null ){
      this.xsearch12(this.getprovince.provinceId);
    }else if(  this.getprovince !=null && this.getcity != null && this.getward == null  ){
      this.xsearch10(this.getprovince.provinceId , this.getcity.citiId);
    }else if( this.getprovince !=null && this.getcity !=  null && this.getward !=  null ){
      this.xsearch11(this.getprovince.provinceId , this.getcity.citiId,this.getward.wardId);
    }
  }

  
  xsearch1(getnewtypeId:number){
      this.newlistfromAPI=[];
      this.newsload=[];
      this.newsService.xsearch1(this.cateofhouseid,getnewtypeId).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
        },     
        erros=>{
          console.log(erros);
        }        
      );
  }

  
  xsearch3(getnewtypeId:number,categoryid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch3(this.cateofhouseid,getnewtypeId,categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch2(categoryid:number){
    this.newlistfromAPI=[];
      this.newsload=[];
      this.newsService.Lsearch1(this.cateofhouseid,categoryid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
        },     
        erros=>{
          console.log(erros);
        }        
      );
  }
  xsearch4(getnewtypeId:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch4(this.cateofhouseid,getnewtypeId,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch5(getnewtypeId:number,provinceId:number,cityId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch5(this.cateofhouseid,getnewtypeId,provinceId,cityId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }


  xsearch6(getnewtypeId:number,provinceId:number,cityId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch6(this.cateofhouseid,getnewtypeId,provinceId,cityId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch7(getnewtypeId:number,categoryid:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch7(this.cateofhouseid,getnewtypeId,categoryid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch8(getnewtypeId:number,categoryid:number,provinceId:number,cityId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch8(this.cateofhouseid,getnewtypeId,categoryid,provinceId,cityId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch9(getnewtypeId:number,categoryid:number,provinceId:number,cityId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch9(this.cateofhouseid,getnewtypeId,categoryid,provinceId,cityId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch12(provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch8(provinceId,this.cateofhouseid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch10(provinceId:number,cityId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch10(this.cateofhouseid,provinceId,cityId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch11(provinceId:number,cityId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch11(this.cateofhouseid,provinceId,cityId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch13(provinceId:number,categoryid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch2(provinceId,this.cateofhouseid,categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch14(provinceId:number,categoryid:number,cityid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch3(provinceId,cityid,this.cateofhouseid,categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch15(provinceId:number,categoryid:number,cityid:number,wardid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.Lsearch4(provinceId,cityid,wardid,this.cateofhouseid,categoryid).then(
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
