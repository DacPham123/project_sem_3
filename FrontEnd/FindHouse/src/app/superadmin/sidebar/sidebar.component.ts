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

  username: string;
  account: Account;
  listReport: ReportNews[];
  countReport: number
  items: MenuItem[];

  constructor(
    private accountService: AccountService,
    private reportService: ReportNewsService,
  ) {

  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.accountService.findByUsername(this.username).then(
      trueresult => {
        this.account = trueresult as Account;
      },
      erros => {
        console.log(erros);
      }
    );
    this.reportService.getreporttouser(this.username).then(
      trueresult => {
        this.listReport = trueresult as ReportNews[];
        this.countReport = this.listReport.length
      },
      erros => {
        console.log(erros);
      });


    this.items = [
      {
        label: 'Account',
        icon: 'nav-icon fas fa-user',
        items: [
          {
            label: 'Admin',
            icon: 'pi pi-user',
            routerLink: ['/superadmin/account', { action: 2 }]

          },
          {
            label: 'Agent',
            icon: 'pi pi-user',
            routerLink: ['/superadmin/account', { action: 3 }]

          }, {
            label: 'Private Saler',
            icon: 'pi pi-user',
            routerLink: ['/superadmin/account', { action: 4 }]

          }, {
            label: 'Visitor',
            icon: 'pi pi-user',
            routerLink: ['/superadmin/account', { action: 5 }]

          },

        ]
      },
      {
        label: 'News',
        icon: 'pi pi-fw pi-images',
        items: [
          {
            label: 'List News',
            icon: 'pi pi-list',
            routerLink: ['/superadmin/news']

          },
          {
            label: 'List Report',
            icon: 'nav-icon fas fa-plus-circle',
            routerLink:['/superadmin/report']
          },

        ]
      },

      {
        label: 'Package',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/superadmin/package']
      },


      {
        label: 'Category',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/superadmin/category']
      },

      {
        label: 'Address',
        icon: 'pi pi-fw pi-map-marker',
        routerLink:['/superadmin/address']
      },
      {
        label: 'Invoice',
        icon: 'pi pi-fw pi-ticket',
        routerLink:['/superadmin/invoice']
      },
      {
        label: 'Messages',
        icon: 'pi pi-comment',
        routerLink: ['/messages/']
      },
      {
        label: 'Change Password',
        icon: 'nav-icon fas fa-user-edit',
        routerLink: ['/superadmin/changePass']
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: ['/logout']
      },
      {
        separator: true
      }
   
    ];
  }
}
