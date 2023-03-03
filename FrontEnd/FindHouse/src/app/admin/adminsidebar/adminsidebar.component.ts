import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'adminsidebar',
  templateUrl: './adminsidebar.component.html',

})
export class AdminSideBarComponent implements OnInit {

  username:string;
  account:Account;
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
       label:'News',
       icon:'pi pi-fw pi-images',
       routerLink:"/admin/news"
    },
    {
       label:'My Agents',
       icon:'pi pi-fw pi-users',
       routerLink:"/admin/listagent"
    },

    {
       label:'Package',
       icon:'pi pi-fw pi-book',
       items:[
          {
             label:'My Ad Packs',
             icon:'pi pi-fw pi-paypal',
             routerLink:"/admin/invoice"

          },
          {
             label:'Payment History',
             icon:'pi pi-fw pi-history',
             routerLink:"/admin/paymenthistory"
          },
         
       ]
    },
 
    {
      label:'Notification',
      icon:'nav-icon fas fa-bell',
      routerLink:"/admin/report"
   },

    {
       label:'My Account',
       icon:'pi pi-fw pi-user',
       routerLink:"/admin/myaccount"
    },
    {
      label:'Change Password',
      icon:'nav-icon fas fa-user-edit',
      routerLink:"/admin/changepass"
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
 