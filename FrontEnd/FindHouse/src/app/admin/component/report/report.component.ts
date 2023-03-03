import { Component, OnInit } from '@angular/core';
import { ReportNews } from 'src/app/models/reportnews.model';

import { ReportNewsService } from 'src/app/services/reportnews.service';

@Component({
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  useradmin:string;
  listreport:ReportNews[];
  msg:string;
  list:ReportNews[];
  loading: boolean = true;
  listtshow:ReportNews[]
  reportshow:ReportNews;
  display: boolean = false;

  constructor(
    private reportNewsService:ReportNewsService
  ) {}

  

  ngOnInit(): void {
    this.listtshow=[];
    this.useradmin=localStorage.getItem("username");
    
    this.reportNewsService.getreportbyadmin(this.useradmin).then(
      res=>{
        this.listreport= res as ReportNews[];

        if(this.listreport.length>0){
          for(var i=0;i<this.listreport.length;i++){
            if(this.listtshow.length >0){          
              var r=this.listtshow.find(r=>r.newsid==this.listreport[i].newsid );

              if(!r){
                var newr={
                  reportid: this.listreport[i].reportid,
                  newsid: this.listreport[i].newsid,              
                  reportstatus: this.listreport[i].reportstatus,
                  fromadmin: this.listreport[i].fromadmin,
                  touser: this.listreport[i].touser,
                  remark: this.listreport[i].remark,
                  politicsreason: this.listreport[i].politicsreason,
                  cheatreason: this.listreport[i].cheatreason,
                  createdday: this.listreport[i].createdday,
                  deadline: this.listreport[i].deadline,
                  fromuser: this.listreport[i].fromuser
                }
                this.listtshow.push(newr);  

              }
            }else{
              var newr={
                reportid: this.listreport[i].reportid,
                newsid: this.listreport[i].newsid,              
                reportstatus: this.listreport[i].reportstatus,
                fromadmin: this.listreport[i].fromadmin,
                touser: this.listreport[i].touser,
                remark: this.listreport[i].remark,
                politicsreason: this.listreport[i].politicsreason,
                cheatreason: this.listreport[i].cheatreason,
                createdday: this.listreport[i].createdday,
                deadline: this.listreport[i].deadline,
                fromuser: this.listreport[i].fromuser
            }
            this.listtshow.push(newr); 
            }
              
          }
            
        }

        this.loading=false;
      },
      err=>{
            console.log(err);
      } )
  }
  showInfo(reportid:number){

    this.reportNewsService.getreportnews(reportid).then(
      res=>{
        var x:ReportNews = res as ReportNews;
        
            this.msg=x.remark;


      this.display=true;

      },
      err=>{
            console.log(err);
      } )
    
  }

  
}
 