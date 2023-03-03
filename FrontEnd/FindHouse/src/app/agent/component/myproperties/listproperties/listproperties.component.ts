import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { XuanNews } from 'src/app/models/xuannews.model';
import { NewsService } from 'src/app/services/news.service';
import { NewsTableService } from 'src/app/services/newstable.service';
import { XuanNewsService } from 'src/app/services/xuannews.service';

@Component({
  templateUrl: './listproperties.component.html',
  styleUrls: ['./listproperties.component.scss']
})

export class ListPropertiesComponent implements OnInit {
   
  listnews: News[];
  newsNull: News[]
  first = 0;

  rows = 10;
  username:string;
  statuses: any[];
  @ViewChild('dt') table: Table;

  constructor(
    private newsService: NewsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private newstableService: NewsTableService,
  ) {  
  }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.newsService.getnewsstatusnull(this.username).then(
      trueresult =>{         
        this.newsNull= trueresult as News[];
        if(this.newsNull != null){
          for(let newnull of this.newsNull){
            var idNull: number = newnull.newsid
            this.delete(idNull)
          }
        }
      },
      erros=>{
        console.log(erros);
      });
      this.loadlist();
  }

  loadlist(){
    this.newsService.showallbyseller(this.username).then(
      trueresult =>{         
        this.listnews= trueresult as News[];
      },
      erros=>{
        console.log(erros);
      });
  }

  delete(id: number){
          this.newstableService.deleteListNewsImg(id).then(
            res =>{
                var resl: ResultAPI = res as ResultAPI;
                if(resl.result){
                    console.log('OK');
                    this.newstableService.deleteNews(id).then(
                      res =>{
                          var resl: ResultAPI = res as ResultAPI;
                          if(resl.result){
                              console.log('OK');    
                              this.loadlist();             
                          } else{
                            console.log('Fail');
                          }
                     },
                     err =>{ 
                          console.log(err);
                     });
                } else{
                  console.log('Fail');
                }
           },
           err =>{
                console.log(err);
           });
    }
  
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.listnews ? this.first === (this.listnews.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.listnews ? this.first === 0 : true;
}

}
 