import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { News } from 'src/app/models/news.model';
import { ReportNews } from 'src/app/models/reportnews.model';
import { ResultAPI } from 'src/app/models/resultAPI.model';
import { AccountService } from 'src/app/services/account.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsTableService } from 'src/app/services/newstable.service';
import { ReportNewsService } from 'src/app/services/reportnews.service';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SideBarComponent implements OnInit {

  username:string;
  account:Account;
  listReport: ReportNews[];
  countReport: number
  items: MenuItem[];


  constructor(
    private accountService: AccountService,
  ) {

  }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.accountService.findByUsername(this.username).then(
    trueresult =>{         
      this.account= trueresult as Account;
    },
    erros=>{
      console.log(erros);
    }        
  );



    this.items = [
      {
         label:'Profile',
         icon:'nav-icon fas fa-user',
         routerLink:"/visitor/profile"
      },
      
      {
         label:'Payment',
         icon:'pi pi-credit-card',
         items:[
            {
               label:'Buy package',
               icon:'pi pi-fw pi-paypal',
               routerLink:"/visitor/invoice"
  
            },
            {
               label:'Payment History',
               icon:'pi pi-fw pi-history',
               routerLink:"/visitor/paymenthistory"
            },
           
         ]
      },
   
      {
         label:'Change Password',
         icon:'nav-icon fas fa-user-edit',
         routerLink:"/visitor/changepass"
      },
      {
         label: 'Messages',
         icon: 'pi pi-comment',
         routerLink: ['/messages/superadmin']
       },
      {
         separator:true
      },
      {
         label:'Logout',
         icon:'pi pi-fw pi-sign-out',
         routerLink:"/logout"
      }
  ];
}
}
 