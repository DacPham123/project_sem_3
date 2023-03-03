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

@Component({

  selector:'newstypecontent',
  templateUrl: 'newstypecontent.component.html'
})
export class NewsTypeContentComponent implements OnInit {

  newstypeid:number;
  totalpage:number;

  newlistfromAPI:XuanNews[];
  newsload:XuanNews[];
  pagenumber:number;
  coutshowitem:number;
  totalitem:number;

  
  getcategoryofhouse:CateOfHouse;
  categoryofhouselist:CateOfHouse[];

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
    private newsService : XuanNewsService,
    private cateTOFhouseService : CateTOFhouseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {

      this.getcity=null;
      this.getward=null;
      this.pagenumber=1;
      this.newsload=[];
      this.newlistfromAPI=[];
      
      this.newstypeid=params['newstypeid'];  
     //-----show new
      this.newsService.showbynewtype(this.newstypeid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          
      },
        erros=>{
          console.log(erros);
        }        
      );

    //-----show category of house  new o thanh fillter
      this.cateTOFhouseService.showall().then(
        trueresult =>{         
          this.categoryofhouselist= trueresult as CateOfHouse[];

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
    console.log(this.getcategory);
    console.log(this.getcategoryofhouse);
    console.log(this.getprovince);
    if(this.getcategoryofhouse !=null || this.getprovince !=null || this.getcategory !=null ){
      if(this.getprovince == null){
        this.provincenull();
      }else{
        if(this.getcategory == null && this.getcategoryofhouse == null && this.getprovince !=null){
          this.categorynullandcategoryofhousenull();
        }else if(this.getcategory != null && this.getcategoryofhouse == null && this.getprovince !=null){
          this.categorynotnullandcategoryofhousenull();
        }else if(this.getcategory != null && this.getcategoryofhouse != null && this.getprovince !=null){
          this.categorynotnullandcategoryofhousenotnull();
        }else if(this.getcategory == null && this.getcategoryofhouse != null && this.getprovince !=null){
          this.categorynullandcategoryofhousenotnull();
        }
      }
    }else{
      this.newlistfromAPI=[];
    this.newsload=[];
      this.newsService.showbynewtype(this.newstypeid).then(
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


  provincenull(){
    console.log('nhay vo province null');
    if(this.getcategory==null && this.getcategoryofhouse !=null){
      this.xsearch1(this.getcategoryofhouse.cateTofhouseid);
      console.log('nhay vo xsearch1');
    }else if(this.getcategory!=null && this.getcategoryofhouse ==null){
      this.xsearch12(this.getcategory.categoryid);
      console.log('nhay vo xsearch12');
    }else if(this.getcategory!=null && this.getcategoryofhouse !=null){
      this.xsearch3(this.getcategoryofhouse.cateTofhouseid,this.getcategory.categoryid);
      console.log('nhay vo xsearch3');
    }
  }

  categorynullandcategoryofhousenotnull(){
    if(this.getcategoryofhouse != null && this.getprovince !=null && this.getcity == null && this.getward == null){
     this.xsearch4(this.getcategoryofhouse.cateTofhouseid,this.getprovince.provinceId);
    }else if(this.getcategoryofhouse != null && this.getprovince !=null && this.getcity != null && this.getward == null){
    this. xsearch5(this.getcategoryofhouse.cateTofhouseid,this.getprovince.provinceId,this.getcity.citiId);
    }else if(this.getcategoryofhouse != null && this.getprovince !=null && this.getcity != null && this.getward != null){
      this. xsearch6(this.getcategoryofhouse.cateTofhouseid,this.getprovince.provinceId,this.getcity.citiId,this.getward.wardId);
    }
  }

  categorynullandcategoryofhousenull(){
    if(this.getprovince !=null && this.getcity == null && this.getward == null){
      this.xsearch13(this.getprovince.provinceId);
    }else if(this.getprovince !=null && this.getcity != null && this.getward == null){
      this.xsearch14(this.getprovince.provinceId,this.getcity.citiId);
    }else if(this.getprovince !=null && this.getcity != null && this.getward != null){
      this.xsearch15(this.getprovince.provinceId,this.getcity.citiId,this.getward.wardId);
    }
  }

  categorynotnullandcategoryofhousenull(){
    if(this.getcategory != null && this.getprovince !=null && this.getcity == null && this.getward == null){
      this.xsearch16(this.getcategory.categoryid,this.getprovince.provinceId);
    }else if(this.getcategory != null && this.getprovince !=null && this.getcity != null && this.getward == null){
      this.xsearch17(this.getcategory.categoryid,this.getprovince.provinceId,this.getcity.citiId);
    }else if(this.getcategory != null && this.getprovince !=null && this.getcity != null && this.getward != null){
      this.xsearch18(this.getcategory.categoryid,this.getprovince.provinceId,this.getcity.citiId,this.getward.wardId);
    }
  }
  
  categorynotnullandcategoryofhousenotnull(){
    if(this.getcategory!=null && this.getcategoryofhouse !=null && this.getprovince !=null && this.getcity == null && this.getward == null ){
      this.xsearch7(this.getcategoryofhouse.cateTofhouseid,this.getcategory.categoryid,this.getprovince.provinceId);

    }else if( this.getcategory!=null &&  this.getcategoryofhouse !=null && this.getprovince !=null && this.getcity != null && this.getward == null  ){
      this.xsearch8(this.getcategoryofhouse.cateTofhouseid,this.getcategory.categoryid,this.getprovince.provinceId , this.getcity.citiId);

    }else if(this.getcategory!=null &&  this.getcategoryofhouse !=null && this.getprovince !=null && this.getcity != null && this.getward != null ){
      this.xsearch9(this.getcategoryofhouse.cateTofhouseid,this.getcategory.categoryid,this.getprovince.provinceId , this.getcity.citiId,this.getward.wardId);
    }
  }

  xsearch1(cateofhouseid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch1(cateofhouseid,this.newstypeid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch12(categoryid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch12(this.newstypeid,categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch3(cateofhouseid:number,categoryid:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch3(cateofhouseid,this.newstypeid,categoryid).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch13(provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch13(this.newstypeid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch14(provinceId:number,citiId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch14(this.newstypeid,provinceId,citiId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch15(provinceId:number,citiId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch15(this.newstypeid,provinceId,citiId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch16(categoryid:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch16(this.newstypeid,categoryid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch17(categoryid:number,provinceId:number,citiId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch17(this.newstypeid,categoryid,provinceId,citiId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch18(categoryid:number,provinceId:number,citiId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch18(this.newstypeid,categoryid,provinceId,citiId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch7(cateTofhouseid:number,categoryid:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch7(cateTofhouseid,this.newstypeid,categoryid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch8(cateTofhouseid:number,categoryid:number,provinceId:number,citiId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch8(cateTofhouseid,this.newstypeid,categoryid,provinceId,citiId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }
  xsearch9(cateTofhouseid:number,categoryid:number,provinceId:number,citiId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch9(cateTofhouseid,this.newstypeid,categoryid,provinceId,citiId,wardId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch4(categoryofhouis:number,provinceId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch4(categoryofhouis,this.newstypeid,provinceId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }

  xsearch5(categoryofhouis:number,provinceId:number,cityId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch5(categoryofhouis,this.newstypeid,provinceId,cityId).then(
      trueresult =>{
        this.newlistfromAPI= trueresult as XuanNews[];
        this.loadnewsload(this.newlistfromAPI);
      },     
      erros=>{
        console.log(erros);
      }        
    );
  }


  xsearch6(categoryofhouis:number,provinceId:number,cityId:number,wardId:number){
    this.newlistfromAPI=[];
    this.newsload=[];
    this.newsService.xsearch6(categoryofhouis,this.newstypeid,provinceId,cityId,wardId).then(
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
