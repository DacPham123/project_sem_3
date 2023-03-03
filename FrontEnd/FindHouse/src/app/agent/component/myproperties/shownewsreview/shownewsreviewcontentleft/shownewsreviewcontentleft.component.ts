import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewImages } from 'src/app/models/newsimages.model';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewsTableService } from 'src/app/services/newstable.service';
import { ResultAPI } from 'src/app/models/resultapi.model';
import { NewsTable } from 'src/app/models/newstable.model';



@Component({

  selector:'shownewsreviewcontentleft',
  templateUrl: 'shownewsreviewcontentleft.component.html'
})
export class ShowNewsReviewContentLeftComponent implements OnInit {

   newsid:number;
   newstatus: number;
   news:News;
   images: any[];
  content:string;
  iframe:string;
  saveNewsForm: FormGroup


   responsiveOptions:any[] = [
       {
           breakpoint: '1024px',
           numVisible: 5
       },
       {
           breakpoint: '960px',
           numVisible: 4
       },
       {
           breakpoint: '768px',
           numVisible: 3
       },
       {
           breakpoint: '560px',
           numVisible: 1
       }
   ];
  constructor(
    private route: ActivatedRoute,
    private newsService : NewsService,
    private newsTableService : NewsTableService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
   
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params) => {
      this.newsid=params['id'];  

     //-----show new
     this.newsService.getnewbyidshowdetailspage(this.newsid).then(
      trueresult =>{
        this.news= trueresult as News;
        this.content=this.news.content;

        this.saveNewsForm = this.formBuilder.group({
          newsid: this.news.newsid,
          newstatus: 5,
     })
      },
      erros=>{
        console.log(erros);
      }        
    );
    this.newsService.getnewsimagesbyid(this.newsid).then(
      trueresult =>{
        this.images= trueresult as NewImages[];
        console.log(this.images)
      },
      erros=>{
        console.log(erros);
      }        
    );
  })
  }

  save(){
    var news: NewsTable  = this.saveNewsForm.value;
    news.newstatus=0;
    this.newsTableService.updateNewsStatus(this.newsid, news).then(
      res =>{
          var resl: ResultAPI = res as ResultAPI;
          if(resl.result){

            this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Insert news success!'});    
            this.router.navigate(['/agent/myproperties/list'])
            console.log('OK');
          } else{
              console.log('Fail');
          } 
     },
     err =>{
          console.log(err);
     });
  }


  confirm(){
    this.confirmationService.confirm({
      message: 'Do you want to cancel this record?',
      header: 'Cancel Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.newsTableService.deleteListNewsImg(this.newsid).then(
            res =>{
                var resl: ResultAPI = res as ResultAPI;
                if(resl.result){
                    console.log('OK');
                    this.newsTableService.deleteNews(this.newsid).then(
                      res =>{
                          var resl: ResultAPI = res as ResultAPI;
                          if(resl.result){
                              console.log('OK');
                              this.router.navigate(['/privatesale/myproperties/list'])
                          } else{
                            console.log('Fail');
                          }
                     },
                     err =>{
                          console.log(err);
                     });
                } else{
                  this.messageService.add({severity: 'error', summary: 'Delete fail!', detail: ''});
                  console.log('Fail');
                }
           },
           err =>{
                console.log(err);
           }); 
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
      
  });
  }
}
