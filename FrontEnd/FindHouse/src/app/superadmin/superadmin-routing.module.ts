import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../components/pages/error/error.component';
import {  NewsAdminComponent } from './component/news/news.component';



import { SuperAdminComponent } from './superadmin.component';

import { InvoiceComponent } from './component/invoice/invoice.component';
import { ChangePassComponent } from './component/changepass/changepass.component';
import { AuthGuard } from '../_guards/auth.guard';
import { RoleGuard } from '../_guards/role.guard';
import { AccountComponent } from './component/account/account.component';

import { PackageComponent } from './component/package/package.component';
import { AddressComponent } from './component/address/address.component';
import { CategoryComponent } from '../superadmin/component/category/category.component';
import { AddUpdatePackage } from './component/package/component/addAndUpdate.component';
import { DetailsNewsAdminComponent } from '../superadmin/component/newsdetails/adminnewsdetails.component';
import { ReportNewsAdminComponent } from './component/reportnews/reportnews.component';



const routes: Routes = [
    {path: 'superadmin', 
        component: SuperAdminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ['superadmin']},
        children: [
            {path: '', component:AccountComponent},
            {path: 'account', component: AccountComponent},
            {path: 'news', component:NewsAdminComponent},
            {path: 'report', component:ReportNewsAdminComponent},
            {path:'newdetail', component:DetailsNewsAdminComponent},
            {path: 'package', component:PackageComponent},
            {path:'packageChange', component:AddUpdatePackage},
            {path: 'address', component:AddressComponent},
            {path: 'changePass', component:ChangePassComponent},
            {path: 'invoice', component:InvoiceComponent},
            {path: 'category', component:CategoryComponent},
            //{path: 'myaccount', component:ProfileComponent}
         
        ]
    },
    
    
    // Here add new pages component

    //{path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule {}