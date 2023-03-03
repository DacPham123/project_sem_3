import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { City } from 'src/app/models/city.model';
import { NewTypes } from 'src/app/models/newtype.model';
import { Province } from 'src/app/models/province.model';
import { CityService } from 'src/app/services/city.service';
import { NewstypeService } from 'src/app/services/newstype.service';
import { ProvinceService } from 'src/app/services/province.service';




@Component({

  templateUrl: './searchcontentleft.component.html'
})
export class SearchContentLeftComponent implements OnInit {

  cateofhouseid:number;
  getnewtype:NewTypes;
  newtypelist:NewTypes[];
  citylist:City[];
  provincelist:Province[];


  constructor(
    private route: ActivatedRoute,
    private newstypeService : NewstypeService,
    private cityService :CityService,
    private provinceService:ProvinceService,
 
  
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {

      this.cateofhouseid=params['cateTofhouseid'];  
 
      this.newstypeService.showall().then(
        trueresult =>{
         
          this.newtypelist= trueresult as NewTypes[];
         
        },
        erros=>{
          console.log('loi gi do');
          console.log(erros);
        }        
      );

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
  selectprovice(e:any){
    console.log(e.target.value);
  }

  getTypeNew(e:any){
    console.log(e.target.value);
  }
  get(){
    
  }

}
