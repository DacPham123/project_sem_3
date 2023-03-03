import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

import { XuanNews } from 'src/app/models/xuannews.model';
import { formatDate } from "@angular/common";
import * as moment from 'moment';
import {Message} from 'primeng//api';
import { News } from 'src/app/models/news.model';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { NewsService } from 'src/app/services/news.service';
import { ReportNewsService } from 'src/app/services/reportnews.service';
import { Result } from 'src/app/models/result.model';
import { ReportNews } from 'src/app/models/reportnews.model';
import { NewsTable } from 'src/app/models/newstable.model';
import { NewsTableService } from 'src/app/services/newstable.service';

@Component({

  selector:'newsdetailcontentright',
  templateUrl: 'newsdetailcontentright.component.html',
  providers: [ConfirmationService,MessageService]
})
export class NewsDetailContentRightComponent implements OnInit {
  username:string;
  newsid:number;
  news:News;
  agentuser:Account;
  reportreason:any[] ;
  reason:any;
  display:boolean=false;
  display1:boolean=false;
  newstable:NewsTable;
  Result:Result;
  reportNews:ReportNews;
  expire:Date;
  constructor(
    private route: ActivatedRoute,
    private accountService:AccountService,
    private messageService: MessageService,
    private newsService : NewsService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private reportNewsService:ReportNewsService,
    private newsTableService:NewsTableService,
  ) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");

    this.route.params.subscribe( (params) => {

      this.newsid=params['newsid'];  
      this.reportreason= [
        {
            reasonid:1,
            reasonname:'Politics Reason'
        },
        {
          reasonid:2,
          reasonname:'Cheat Reason'
        }
      ];
      this.reason={
        reasonid:0,
        reasonname:''
      }
     //-----show new
     this.newsService.getnewbyidshowdetailspage(this.newsid).then(
      trueresult =>{
        this.news= trueresult as News;
 
        if(this.news.agentuser !=null){
          this.accountService.findByUsername(this.news.agentuser).then(
            trueresult =>{
              this.agentuser= trueresult as Account;

            },
            erros=>{
              console.log(erros);
            }        
          );
        }
   
      },
      erros=>{
        console.log(erros);
      }        
    );

    

  })
  
 
  }

  showbutton(){
    if(this.reason != null && this.reason.reasonid >0){
      this.display=true;
    }else{
      this.display=false;
    }
  }
  confirm1() {
    this.username=localStorage.getItem("username");
  
    if(this.username != null){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed report?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.runcreate();
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
    }else{
      this.confirmationService.confirm({
        message: 'You need log in to process report this news!',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigate(['/login']);
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



creatreport(){
  this.newstable={
    newsid: this.news.newsid,
    createdate: formatDate(this.news.createdate,'yyyy-MM-dd','en-US'),
    categoryid:this.news.categoryid ,
    cateTofhouseid: this.news.cateTofhouseid,
    title: this.news.title,
    content: this.news.content,
    acreage: this.news.acreage,
    nobedroom: this.news.nobedroom,
    nolivroom: this.news.nolivroom,
    nobathroom: this.news.nobathroom,
    garden: this.news.garden,
    bancony: this.news.bancony,
    wardid: this.news.wardid, 
    price: this.news.price,
    newstypeid: this.news.newstypeid,
    adstimefrom: formatDate(this.news.adstimefrom,'yyyy-MM-dd','en-US') ,
    adstimeto: formatDate(this.news.adstimeto,'yyyy-MM-dd','en-US')  ,
    username: this.news.username,
    newstatus: this.news.newstatus,
  }
  var season=this.reason.reasonid;

  var d = new Date(); 
  d.setDate(d.getDate() + 3);

if(season==1){
  this.reportNewsService.getreportnewsbynewidandpolitics(this.newsid).then(
    res=>{
        var resl:ReportNews =res as ReportNews ;
        if(resl.reportid >0){
          this.reportNews =  {
            reportid: 0,
            newsid: this.newsid,
            createdday : formatDate(new Date(),'yyyy-MM-dd','en-US'),
            deadline:formatDate(d,'yyyy-MM-dd','en-US'),
            reportstatus: 0,  
            fromuser:this.username,                 
            fromadmin:'' ,
            touser: '',
            remark: 'Warning: Your news has been reported for politics reason',
            politicsreason: (resl.politicsreason+1),
            cheatreason: 0
          };
          this.reportNewsService.createreports(this.reportNews).then(
            res=>{
                var resl:Result =res as Result ;
                if(resl.result){
                  this.display=false;
                  this.reportreason= [
                    {
                        reasonid:1,
                        reasonname:'Politics Reason'
                    },
                    {
                      reasonid:2,
                      reasonname:'Cheat Reason'
                    }
                  ];
                  this.reason={
                    reasonid:0,
                    reasonname:''
                  }
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Report successfull'});
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          ); 
          if(resl.politicsreason==9){
            this.newstable.newstatus=5;
            this.newsTableService.update(this.newstable).then(
              res=>{
                  var resl: Result=res as Result ;
                  if(resl.result){
                    this.messageService.add({severity:'success', summary: 'Infomation', detail: 'This news has disabled'});
                    this.router.navigate(['/home']);
                  }else{
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                  }
              },
              err=>{
                  console.log(err);
              }
            );
          }
        }else{
          this.reportNews =  {
            reportid: 0,
            newsid: this.newsid,
            createdday : formatDate(new Date(),'yyyy-MM-dd','en-US'),
            deadline:formatDate(d,'yyyy-MM-dd','en-US'),
            reportstatus: 0,  
            fromuser:this.username,                 
            fromadmin:'' ,
            touser: '',
            remark: 'Warning: Your news has been reported for politics reason',
            politicsreason: 1,
            cheatreason: 0
          };
          this.reportNewsService.createreports(this.reportNews).then(
            res=>{
                var resl:Result =res as Result ;
                if(resl.result){
                  this.display=false;
                  this.reportreason= [
                    {
                        reasonid:1,
                        reasonname:'Politics Reason'
                    },
                    {
                      reasonid:2,
                      reasonname:'Cheat Reason'
                    }
                  ];
                  this.reason={
                    reasonid:0,
                    reasonname:''
                  }
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Report successfull'});
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          ); 
        }
        
    },
    err=>{
        console.log(err);
    }
  );
}else if(season==2){
  this.reportNewsService.getreportnewsbynewidandcheat(this.newsid).then(
    res=>{
        var resl:ReportNews =res as ReportNews ;
        if(resl.reportid >0){
          var a=(resl.cheatreason +1);
          this.reportNews =  {
            reportid: 0,
            newsid: this.newsid,
            createdday : formatDate(new Date(),'yyyy-MM-dd','en-US'),
            deadline:formatDate(d,'yyyy-MM-dd','en-US'),
            reportstatus: 0,  
            fromuser:this.username,                 
            fromadmin:'' ,
            touser: '',
            remark: 'Warning: Your news has been reported for scam reasons',
            politicsreason: 0,
            cheatreason: a
          };
          this.reportNewsService.createreports(this.reportNews).then(
            res=>{
                var resl:Result =res as Result ;
                if(resl.result){
                  this.display=false;
                  this.reportreason= [
                    {
                        reasonid:1,
                        reasonname:'Politics Reason'
                    },
                    {
                      reasonid:2,
                      reasonname:'Cheat Reason'
                    }
                  ];
                  this.reason={
                    reasonid:0,
                    reasonname:''
                  }
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Report successfull'});
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          );
          if(resl.cheatreason==9){
            this.newstable.newstatus=3;
            this.reportNews.remark='Warning: Your news has been locked for scam reasons';
            this.newsTableService.update(this.newstable).then(
              res=>{
                  var resl: Result=res as Result ;
                  if(resl.result){
                    this.messageService.add({severity:'success', summary: 'Infomation', detail: 'This news has locked'});
                    this.router.navigate(['/home']);
                  }else{
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                  }
              },
              err=>{
                  console.log(err);
              }
            );
          }
        }else{
          this.reportNews =  {
            reportid: 0,
            newsid: this.newsid,
            createdday : formatDate(new Date(),'yyyy-MM-dd','en-US'),
            deadline:formatDate(d,'yyyy-MM-dd','en-US'),
            reportstatus: 0,  
            fromuser:this.username,                 
            fromadmin:'' ,
            touser: '',
            remark: '',
            politicsreason: 0,
            cheatreason: 1
          };
          this.reportNewsService.createreports(this.reportNews).then(
            res=>{
                var resl:Result =res as Result ;
                if(resl.result){
                  this.display=false;
                  this.reportreason= [
                    {
                        reasonid:1,
                        reasonname:'Politics Reason'
                    },
                    {
                      reasonid:2,
                      reasonname:'Cheat Reason'
                    }
                  ];
                  this.reason={
                    reasonid:0,
                    reasonname:''
                  }
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Report successfull'});
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          );
        }
        
    },
    err=>{
        console.log(err);
    }
  );
}   
}
runcreate(){
  var season=this.reason.reasonid;

  this.reportNewsService.checkreportexits(this.newsid,this.username,season).then(
    trueresult =>{
     this.Result=trueresult as Result;
      if(this.Result){
        this.messageService.add({severity:'error', summary:'Rejected', detail:'You have reported this news and your report is being processed. Please wait for our reply.'});
      }else{
        this.creatreport();
      }
    },
    erros=>{
      console.log(erros);
    }        
  );
}    
}
