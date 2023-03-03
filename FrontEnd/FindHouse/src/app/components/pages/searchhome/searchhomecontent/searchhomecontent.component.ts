import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { City } from 'src/app/models/city.model';
import { Province } from 'src/app/models/province.model';
import { ShowNewsHome } from 'src/app/models/shownewshome.model';
import { Ward } from 'src/app/models/ward.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { CategoryService } from 'src/app/services/category.service';
import { CateTOFhouseService } from 'src/app/services/cateTOFhouse.service';
import { CityService } from 'src/app/services/city.service';
import { ProvinceService } from 'src/app/services/province.service';
import { WardService } from 'src/app/services/ward.service';
import { XuanNewsService } from 'src/app/services/xuannews.service';

@Component({
  selector:'searchhomecontent',
  templateUrl: './searchhomecontent.component.html'
})
export class SearchHomeContentComponent implements OnInit {

  provinceId: number;
  citiId: number;
  wardId:number;
  categoryid: number;
  cateTofhouseid:number;
  totalpage:number;
  
  newlistfromAPI:XuanNews[];
  newsload:XuanNews[];
  pagenumber:number;
  coutshowitem:number;
  totalitem:number;

  citylist:City[];
  getcity:City;

  provincelist:Province[];
  getprovince:Province;

  categorylist:Category[];
  getcategory:Category;

  catOfHouselist: CateOfHouse[];
  getcatofhouse: CateOfHouse

  wardlist:Ward[];
  getward:Ward;
  
  constructor(
    private route: ActivatedRoute,
    private cityService :CityService,
    private provinceService:ProvinceService,
    private categoryService:CategoryService,
    private catofhouseService: CateTOFhouseService,
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
      this.provinceId=params['provinceId'];
      this.categoryid=params['categoryid'];
      this.cateTofhouseid=params['cateTofhouseid'];  
      
     //-----show new
     this.shownews()

  //----show category house o thanh fillter
  this.catofhouseService.showall().then(
    trueresult =>{
      this.catOfHouselist= trueresult as CateOfHouse[];
    },
    erros=>{
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
  shownews(){
    this.route.params.subscribe( (params) => {
      this.getcity=null;
      this.getward=null;
      this.pagenumber=1;
      this.newsload=[];
      this.newlistfromAPI=[];
      this.provinceId=params['provinceId'];
      this.categoryid=params['categoryid'];
      this.cateTofhouseid=params['cateTofhouseid'];  
    if(this.provinceId != 0 && this.categoryid != 0 && this.cateTofhouseid != 0){
      this.newsService.Lsearch2(this.provinceId, this.cateTofhouseid, this.categoryid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
     }
     else if(this.provinceId == 0 && this.categoryid == 0 && this.cateTofhouseid != 0){
      this.newsService.getcateofhouse(this.cateTofhouseid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
     }
     else if(this.provinceId == 0 && this.categoryid != 0 && this.cateTofhouseid == 0){
      this.newsService.showbycategory(this.categoryid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
     }
     else if(this.provinceId == 0 && this.categoryid == 0 && this.cateTofhouseid == 0){
      this.newsService.showall().then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
     }
     else if(this.provinceId == 0 && this.categoryid != 0 && this.cateTofhouseid != 0){
      this.newsService.Lsearch1(this.cateTofhouseid, this.categoryid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
     }
     else if(this.provinceId != 0 && this.categoryid != 0 && this.cateTofhouseid == 0)
     {
      this.newsService.Lsearch5(this.provinceId, this.categoryid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
     }
     else if(this.provinceId != 0 && this.categoryid == 0 && this.cateTofhouseid != 0)
     {
      this.newsService.Lsearch8(this.provinceId, this.cateTofhouseid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
     }
     else if(this.provinceId != 0 && this.categoryid == 0 && this.cateTofhouseid == 0)
     {
      this.newsService.Lsearch11(this.provinceId).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
    }
  });
  }

  sortCities(){ 
    console.log(this.provinceId)
    if(this.provinceId == null){
      this.cityService.getCities(0).then(
        res => {
            this.citylist = res as City[]
            console.log(this.citylist)
        },
        err =>{
            console.log(err);
        }
      );
      this.wardService.getWards(0).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    }
    else{
      this.cityService.getCities(this.provinceId).then(
        res => {
            this.citylist = res as City[]
            console.log(this.citylist)
        },
        err =>{
            console.log(err);
        }
      );
      this.wardService.getWards(this.citiId).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    } 
  }

  sortWards(){
    if(this.citiId == null)
    {
      this.wardService.getWards(0).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    }
    else{
      console.log(this.provinceId)
      console.log(this.citiId)
      this.wardService.getWards(this.citiId).then(
        res => {
            this.wardlist = res as Ward[]
        },
        err =>{
            console.log(err);
        }
    );
    }
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
    this.cityService.getCities(this.getprovince.provinceId).then(
      trueresult =>{
        this.citylist= trueresult as City[];

      },
      erros=>{
        console.log(erros);
      }        
    );
  }

  showWard(){
    this.wardService.getWards(this.getcity.citiId).then(
      trueresult =>{
        this.wardlist= trueresult as Ward[];

      },
      erros=>{
        console.log(erros);
      }        
    );
  }
 
  search(){
    if(this.provinceId == null && this.cateTofhouseid != null && this.categoryid != null){
      this.sort1();
    }
    else if(this.provinceId == null && this.cateTofhouseid != null && this.categoryid == null){
     this.newsService.getcateofhouse(this.cateTofhouseid).then(
       trueresult =>{
         this.newlistfromAPI= trueresult as XuanNews[];
         this.loadnewsload(this.newlistfromAPI);
         this.totalitem=this.newlistfromAPI.length;
         console.log(this.newlistfromAPI)
     },
       erros=>{
         console.log(erros);
       }        
     );
    }
    else if(this.provinceId == null && this.cateTofhouseid == null && this.categoryid != null){
     this.newsService.showbycategory(this.categoryid).then(
       trueresult =>{
         this.newlistfromAPI= trueresult as XuanNews[];
         this.loadnewsload(this.newlistfromAPI);
         this.totalitem=this.newlistfromAPI.length;
         console.log(this.newlistfromAPI)
     },
       erros=>{
         console.log(erros);
       }        
     );
    }
    else if(this.provinceId != null && this.cateTofhouseid != null && this.categoryid != null){
      this.sort2();
    }
     else if(this.provinceId != null && this.cateTofhouseid == null && this.categoryid != null){
       this.sort3();
     }
     else if(this.provinceId != null && this.cateTofhouseid != null && this.categoryid == null){
       this.sort4();
     }
     else if(this.provinceId != null && this.cateTofhouseid == null && this.categoryid == null){
       this.sort5();
     }
     else{
       this.shownews();
      //  this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Kindly Choose Value'});
     }
  }


    //Province == null and CatHouse != null and Cat != null
    sort1(){
      this.newsService.Lsearch1(this.cateTofhouseid, this.categoryid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          this.loadnewsload(this.newlistfromAPI);
          this.totalitem=this.newlistfromAPI.length;
          console.log(this.newlistfromAPI)
      },
        erros=>{
          console.log(erros);
        }        
      );
    }
  
    //province != null and CatHouse != null and Cat != null
    sort2(){
      if(this.citiId == null){
        this.newsService.Lsearch2(this.provinceId, this.cateTofhouseid, this.categoryid).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else if(this.wardId == null){
        this.newsService.Lsearch3(this.provinceId, this.citiId, this.cateTofhouseid, this.categoryid).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else{
        this.newsService.Lsearch4(this.provinceId, this.citiId, this.wardId, this.cateTofhouseid, this.categoryid).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
    }
  
    //province != null and CatHouse == null and Cat != null
    sort3(){
      if(this.citiId == null){
        this.newsService.Lsearch5(this.provinceId, this.categoryid).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else if(this.wardId == null){
        this.newsService.Lsearch6(this.provinceId, this.citiId, this.categoryid).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else{
        this.newsService.Lsearch7(this.provinceId, this.citiId, this.wardId, this.categoryid).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
    }
  
    //province != null and CatHouse != null and Cat == null
    sort4(){
      if(this.citiId == null){
        this.newsService.Lsearch8(this.provinceId, this.cateTofhouseid).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else if(this.wardId == null){
        this.newsService.xsearch10(this.cateTofhouseid, this.provinceId, this.citiId).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else{
        this.newsService.xsearch11(this.cateTofhouseid, this.provinceId, this.citiId, this.wardId).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
    }
  
    //province != null and CatHouse == null and Cat == null
    sort5(){
      if(this.citiId == null){
        this.newsService.Lsearch11(this.provinceId).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else if(this.wardId == null){
        this.newsService.Lsearch12(this.provinceId, this.citiId).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
      else{
        this.newsService.Lsearch13(this.provinceId, this.citiId, this.wardId).then(
          trueresult =>{
            this.newlistfromAPI= trueresult as XuanNews[];
            this.loadnewsload(this.newlistfromAPI);
            this.totalitem=this.newlistfromAPI.length;
            console.log(this.newlistfromAPI)
        },
          erros=>{
            console.log(erros);
          }        
        );
      }
    }

}
