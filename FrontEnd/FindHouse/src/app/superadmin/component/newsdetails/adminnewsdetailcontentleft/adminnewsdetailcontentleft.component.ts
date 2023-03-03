import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { XuanNews } from 'src/app/models/xuannews.model';


import { Message } from 'primeng/api';
import { NewImages } from 'src/app/models/newsimages.model';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { NewsSuperAdmin } from 'src/app/models/newsuperadmin.model';
import { ReportNewsService } from 'src/app/services/reportnews.service';
import { ReportNews } from 'src/app/models/reportnews.model';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Result } from 'src/app/models/result.model';
import { UpdateReportNewsModel } from 'src/app/models/updateReportNewsModel.model';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { formatDate } from '@angular/common';

@Component({

  selector: 'adminnewsdetailcontentleft',
  templateUrl: 'adminnewsdetailcontentleft.component.html'
})
export class AdminNewsDetailContentLeftComponent implements OnInit {

  newsid: number;
  news: NewsSuperAdmin;
  images: any[];
  content: string;
  iframe: string;
  report: ReportNews;
  reportname: string;
  total: number;
  displayModal: boolean;
  remark: string;
  reportstatus:number;
  displayModal3:boolean;
  responsiveOptions: any[] = [
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
  groupStatus: any[];
  selectedCity3: any;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private reportSer: ReportNewsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accSer: AccountService


  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.newsid = params['newsid'];

      //-----show new
      this.newsService.getnewbyidshowdetailspagebysuperadmin(this.newsid).then(
        trueresult => {
          this.news = trueresult as NewsSuperAdmin;
          this.content = this.news.content;
        },
        erros => {
          console.log(erros);
        }
      );
      this.newsService.getnewsimagesbyid(this.newsid).then(
        trueresult => {
          this.images = trueresult as NewImages[];
        },
        erros => {
          console.log(erros);
        }
      );
      this.reportSer.getreportbyidnewssuperadmin(this.newsid).then(
        res => {
          this.report = res as ReportNews;
          if (this.report != null) {
            this.reportstatus= this.report.reportstatus;
            if (this.report.cheatreason >= 10) {
              this.reportname = "cheat"
            } else if (this.report.politicsreason >= 10) {
              this.reportname = "politic"
            }
          }
           

        },
        err => { console.log(err) }

      )


    })
  }

  lock() {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to lock this news?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.displayModal3=true;
        this.accSer.findByUsername(this.news.username).then(
          res => {
             var acc = res as Account;
             var reportN : ReportNews ={
              reportid: 0,
              newsid: this.news.newsid,
              createdday : formatDate(new Date(),'yyyy-MM-dd','en-US'),
              deadline: formatDate(new Date(),'yyyy-MM-dd','en-US'),
              reportstatus: 5,  
              fromuser:"",                 
              fromadmin:acc.agentuser,
              touser:acc.username,
              remark: this.remark,
              politicsreason: 0,
              cheatreason: 0
             }
            this.reportSer.locknews(reportN).then(
              res => {
                var re = res as boolean;
                if (re) {
                  this.displayModal3=false;
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lock Success' });
                  this.displayModal=false;
                  this.load();
                } else {
                  this.displayModal3=false
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
                }
              }
            )


          }, err => { console.log(err);  this.displayModal3=false }
        )

      }
    });
 
  }
  active() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to unlock this news?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.newsService.checkcanactivenews(this.newsid).then(
          res => {
            var result = res as boolean;
            if (result) {
              this.newsService.setStatusNews(this.newsid, 1).then(
                res => {
                  var re = res as boolean;
                  if (re) {
                    this.reportSer.deletereportsuperlock(this.newsid).then(res=>{console.log(res)}, err=>{console.log(err)});
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Unlock Success' });
                    this.load();
                  } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
                  }
                }
              )
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This user can no longer add this type of news ' });
            }

          },
          err => {
            console.log(err);
          }

        );

      }

    });

  }
  active2() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to unlock this news?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.displayModal3=true;
        this.report.reportstatus = 2;


        var upRe: UpdateReportNewsModel = {
          newsid: this.report.newsid,
          reportid: this.report.reportid,
          remark: "",
          newstatus: 0,
          reportstatus: this.report.reportstatus

        }
        this.reportSer.setactivereportssuperadmin(upRe).then(
          res => {
            var re = res as Result;
            if (re.result) {
              this.displayModal3=false;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Unlock Success' });
              this.load();
            } else {
              this.displayModal3=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
            }
          },
          err => { console.log(err) ;   this.displayModal3=false; }

        )
      }
    })

  }
  accept() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to accept this report?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.displayModal3=true;
        this.report.reportstatus = 1;
        this.report.remark = 'Warning: News had lock due politics reason';


        var upRe: UpdateReportNewsModel = {
          newsid: this.report.newsid,
          reportid: this.report.reportid,
          remark: this.report.remark,
          newstatus: 3,
          reportstatus: this.report.reportstatus

        }
        this.reportSer.updatereportssuperadmin(upRe).then(
          res => {
            var re = res as Result;
            if (re.result) {
              this.displayModal3=false;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Accept This Report' });
              this.load();
            } else {
              this.displayModal3=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
            }
          },
          err => { console.log(err) ;    this.displayModal3=false;}

        )
      }
    })

  }
  reject() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject this report?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.displayModal3=true;
        this.report.reportstatus = 2;

        var upRe: UpdateReportNewsModel = {
          newsid: this.report.newsid,
          reportid: this.report.reportid,
          remark: "",
          newstatus: 0,
          reportstatus: this.report.reportstatus

        }
        this.reportSer.updatereportssuperadmin(upRe).then(
          res => {
            var re = res as Result;
            if (re.result) {
              this.displayModal3=false;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reject This Report' });
              this.load();
            } else {
              this.displayModal3=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
            }
          },
          err => { console.log(err) ;    this.displayModal3=false;}

        )
      }
    })

  }
  load(){
    this.newsService.getnewbyidshowdetailspagebysuperadmin(this.newsid).then(
      trueresult => {
        this.news = trueresult as NewsSuperAdmin;
        this.content = this.news.content;
      },
      erros => {
        console.log(erros);
      }
    );
    this.newsService.getnewsimagesbyid(this.newsid).then(
      trueresult => {
        this.images = trueresult as NewImages[];
      },
      erros => {
        console.log(erros);
      }
    );
    this.reportSer.getreportbyidnewssuperadmin(this.newsid).then(
      res => {
        this.report = res as ReportNews;
        if (this.report != null) {
          if (this.report.cheatreason >= 10) {
            this.reportname = "cheat"
          } else if (this.report.politicsreason >= 10) {
            this.reportname = "politic"
          }
        }


      },
      err => { console.log(err) }

    )
  }

}
