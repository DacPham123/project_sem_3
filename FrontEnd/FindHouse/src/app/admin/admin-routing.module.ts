import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../components/pages/error/error.component';
import {  NewsAdminComponent } from './component/news/news.component';
import { ProfileAdminComponent } from './component/profileadmin/profileadmin.component';


import { AdminComponent } from './admin.component';

import { InvoiceComponent } from './component/invoice/invoice.component';

import { MyAgentComponent } from './component/myagent/myagent.component';


import { AuthGuard } from '../_guards/auth.guard';
import { RoleGuard } from '../_guards/role.guard';

import { ReLoadPageComponent } from './component/reloadoage/reloadoage.component';
import { DetailsNewsAdminComponent } from './component/newsdetails/adminnewsdetails.component';

import { PaymentHistoryComponent } from './component/paymenthistory/paymenthistory.component';
import { PaymentDetailsComponent } from './component/paymentdetails/paymentdetails.component';
import { ShowNewsAgentComponent } from './component/shownewsagent/shownewsagent.component';

import { ReportComponent } from './component/report/report.component';
import { ChangePassAdminComponent } from './component/changepassadmin/changepassadmin.component';





const routes: Routes = [
    {path: 'admin', 
        component: AdminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ['admin']},
        children: [
            {path: '', component:NewsAdminComponent},
            {path: 'news', component:NewsAdminComponent},
            {path: 'shownewsdeatils', component:DetailsNewsAdminComponent},
            {path: 'listagent', component:MyAgentComponent},

            {path: 'invoice', component:InvoiceComponent},
            {path: 'myaccount', component:ProfileAdminComponent},           
            {path: 'reloadpage', component:ReLoadPageComponent},
            {path: 'paymenthistory', component:PaymentHistoryComponent},
            {path: 'paymendetails', component:PaymentDetailsComponent}, 
            {path: 'shownewsagent', component:ShowNewsAgentComponent},
            {path: 'report', component:ReportComponent},
            {path: 'changepass', component:ChangePassAdminComponent},
     
        ]
    },
    
    
    // Here add new pages component

   // {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AdminRoutingModule {}