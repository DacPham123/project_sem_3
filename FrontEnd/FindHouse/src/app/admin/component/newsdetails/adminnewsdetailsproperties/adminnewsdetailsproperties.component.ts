import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from 'src/app/models/invoice.model';
import { News } from 'src/app/models/news.model';
import { NewsTable } from 'src/app/models/newstable.model';
import { NewTypes } from 'src/app/models/newtype.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';


import { InvoiceService } from 'src/app/services/invoice.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsTableService } from 'src/app/services/newstable.service';
import { NewstypeService } from 'src/app/services/newstype.service';
import { formatDate } from "@angular/common";
import { MessageService } from 'primeng/api';
import { ReportNewsService } from 'src/app/services/reportnews.service';
import { ReportNews } from 'src/app/models/reportnews.model';




@Component({

  selector:'adminnewsdetailsproperties',
  templateUrl: 'adminnewsdetailsproperties.component.html'
})
export class AdminNewsDetailsPropertiesComponent implements OnInit {
  useradmin:string;
  myinvoice:Invoice;

  newssttcontent:string;
  listnewstype:NewTypes[];
  getnewstype:NewTypes;
  newsid:number;
  news:News;
 
  listnewstatus:any[];
  newstt:any;
  showReject:number;
  showChooseDate:number;

  newsstatus:number;
  newstypeid:number;
  adsfrom:string;
  adsto:string;

  AcceptAds:boolean;

  listnewsbynewstype:News[];
  countnewsonlist:number;
  countvvip:number;
  countspecial:number;
  countordinary:number;
  msg:string;
 
  newstable:NewsTable;
  update:FormGroup;

  rejectmsg:string;
  oldnewsstatus:number;

  constructor(
    private newsService:NewsService,
    private route: ActivatedRoute,
    private newstypeService:NewstypeService,
    private invoiceService:InvoiceService,
    private newsTableService:NewsTableService,
    private messageService: MessageService,
    private router: Router,
    private reportNewsService:ReportNewsService
    
  ) { }

  ngOnInit(): void {
      this.rejectmsg=null;
      this.countnewsonlist=0;
      this.countvvip=0;
      this.countspecial=0;
      this.countordinary=0;
      this.getnewstype=null;

      this.listnewstype=null;

      this.showReject=2;
      this.useradmin=localStorage.getItem("username");

      this.invoiceService.findlastinvoicebyusername(this.useradmin).then(
            trueresult =>{
              this.myinvoice= trueresult as Invoice;   
              if( new Date(this.myinvoice.expire) > new Date() ){
               this.AcceptAds=true;
              }else{
                this.AcceptAds=false;
              }
            
            },
            erros=>{
              console.log(erros);
            }        
            
      );
        
      this.route.params.subscribe( (params) => {
        this.newsid=params['newsid'];  
        
          this.newsService.getnewbyidshowdetailspage(this.newsid).then(
            trueresult =>{
              this.news= trueresult as News;
              this.newsstatus=this.news.newstatus;
              this.oldnewsstatus=this.news.newstatus;
              
              if(this.newsstatus ==1){
                this.listnewstatus=[
                  {
                    newstatusid:1,
                    content:'Change Type Ads This News'
                  },{
                    newstatusid:2,
                    content:'Reject This News'
                  },{
                    newstatusid:5,
                    content:'hide This News'
                  }
                ];
              }else if (this.newsstatus ==0){
                this.listnewstatus=[
                  {
                    newstatusid:1,
                    content:'Accept This News'
                  },{
                    newstatusid:2,
                    content:'Reject This News'
                  },{
                    newstatusid:5,
                    content:'hide This News'
                  }
                ];
              }else if (this.newsstatus ==5 || this.newsstatus==4){
                this.listnewstatus=[
                  {
                    newstatusid:1,
                    content:'Change Type Ads This News'
                  }
                ];
              }
              
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
             
            },
            erros=>{
              console.log(erros);
            }        
            
          );
         
      })
    }
    
    shownextacction1(){   
      this.getnewstype=null;
      this.showReject=0;
      this.newsstatus=this.newstt.newstatusid;

      if(this.newsstatus==1){    
        this.newstatusAccept();
      }else{
        this.showReject=0;
      }


    }
    newstatusAccept(){
      this.showReject=1;
      this.newstypeService.showall().then(
        trueresult =>{
          this.listnewstype= trueresult as NewTypes[];
        },
        erros=>{
          console.log(erros);
        }        
      );
    }

    shownextacction2(){
      this.countnewsonlist=0;
      this.countvvip=0;
      this.countspecial=0;
      this.countordinary=0;
      this.msg=null;   
      if(this.getnewstype !=null){
        this.newstypeid=this.getnewstype.newstypeid;
        this.adsfrom = formatDate(new Date(),'yyyy-MM-dd','en-US');
        this.adsto=formatDate(this.myinvoice.expire,'yyyy-MM-dd','en-US')  ;
  
        this.newsService.getlistbynewstypeandadmin(this.newstypeid,this.useradmin).then(
          trueresult =>{
            this.listnewsbynewstype= trueresult as News[];
            this.countnewsonlist=this.listnewsbynewstype.length;
            switch (this.newstypeid) {
              case 1:
                  this.countvvip=this.myinvoice.noVvipnews;
                  this.countspecial=0;
                  this.countordinary=0;
                  if(this.countvvip ==  this.countnewsonlist){
                    this.msg="You can't set this type for this news because total news you have set for this type is out of package";
                  }
                  break;
              case 2:  
                this.countvvip=0;
                this.countspecial=this.myinvoice.noVipnews;
                this.countordinary=0;
                if (this.countspecial ==  this.countnewsonlist){
                  this.msg="You can't set this type for this news because total news you have set for this type is out of package";
                }
                break;
              default: 
              this.countvvip=0;
              this.countspecial=0;
              this.countordinary=this.myinvoice.noNormalnews;
              if(this.countordinary ==  this.countnewsonlist){
                this.msg="You can't set this type for this news because total news you have set for this type is out of package";
              }
                break;
          }
  
           
          },
          erros=>{
            console.log(erros);
          }                
        );

      
      }

      
      
   
    }


    updatenews(){
      if(this.msg ==null){
        if(this.newsstatus ==1 && this.getnewstype !=null ){
          this.newstable.adstimefrom=this.adsfrom;
          this.newstable.adstimeto=this.adsto;
          this.newstable.newstatus=this.newsstatus;
          this.newstable.newstypeid=this.getnewstype.newstypeid; 
          this.newsTableService.update(this.newstable).then(
            res=>{
                var resl: ResultAPI=res as ResultAPI  ;
                if(resl.result){
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Valued Saved'});
                  this.router.navigate(['/admin/reloadpage/',{newsid: this.newsid}]);
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          ); 
        }
        else if(this.newsstatus ==1 && this.getnewstype ==null ){
          this.messageService.add({severity:'warn', summary: 'Infomation', detail:'please Select a News Advertisement Type'});
        }
        if(this.newsstatus ==2  || this.newsstatus ==5 ){
          this.newstable.adstimefrom=null;
          this.newstable.adstimeto=null;
          this.newstable.newstatus=this.newsstatus;
          this.newstable.newstypeid=null;

          var reportNews:ReportNews =  {
            reportid: 0,
            newsid: this.newsid,
            createdday : formatDate(new Date(),'yyyy-MM-dd','en-US'),
            deadline:formatDate(new Date(),'yyyy-MM-dd','en-US'),
            reportstatus: 5,  
            fromuser:null,                 
            fromadmin: this.useradmin,
            touser: this.news.username,
            remark: this.rejectmsg,
            politicsreason: null,
            cheatreason: null
          };
          this.reportNewsService.createreports(reportNews).then(
            res=>{
                var resl: ResultAPI=res as ResultAPI  ;
                if(resl.result){
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Send Message to User'});
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          ); 

          this.newsTableService.update(this.newstable).then(
            res=>{
                var resl: ResultAPI=res as ResultAPI  ;
                if(resl.result){
                  this.messageService.add({severity:'success', summary: 'Infomation', detail: 'Valued Saved'});
                  this.router.navigate(['/admin/reloadpage/',{newsid: this.newsid}]);
                }else{
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Some error! Kindly contact to IT'});
                }
            },
            err=>{
                console.log(err);
            }
          ); 
        }

      }
     else{
      this.messageService.add({severity:'warn', summary: 'Infomation', detail: this.msg});
     }
  
    }
}
