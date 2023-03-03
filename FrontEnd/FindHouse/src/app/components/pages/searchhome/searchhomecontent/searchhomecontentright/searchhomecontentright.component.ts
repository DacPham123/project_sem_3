import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CateOfHouse } from 'src/app/models/cateTOFhouse.model';
import { XuanNews } from 'src/app/models/xuannews.model';

import { XuanNewsService } from 'src/app/services/xuannews.service';

@Component({

  selector:'searchhomecontentright',
  templateUrl: './searchhomecontentright.component.html'
})
export class SearchHomeContentRightComponent implements OnInit {

  cateofhouseid:number;
  newlistfromAPI:XuanNews[];
  newsload:XuanNews[];
  pagenumber:number;
  coutshowitem:number;
  totalitem:number;
  constructor(
    private route: ActivatedRoute,
    private newsService : XuanNewsService
  ) { }

  ngOnInit(): void {
    this.pagenumber=1;
    this.newsload=[];
    this.route.params.subscribe( (params) => {
      this.cateofhouseid=params['cateTofhouseid'];    
      this.newsService.getcateofhouse(this.cateofhouseid).then(
        trueresult =>{
          this.newlistfromAPI= trueresult as XuanNews[];
          for(var i=0;i<this.pagenumber*6;i++){    
              this.newsload.push(this.newlistfromAPI[i])
          }
        },
        erros=>{
          console.log(erros);
        }        
      );
      
    });
      
         
  }

  loadmore(){
    this.newsload=[];
    this.pagenumber+=1;
    for(var i=0;i<this.pagenumber*6;i++){    
      this.newsload.push(this.newlistfromAPI[i])
  }
    
  }
}
