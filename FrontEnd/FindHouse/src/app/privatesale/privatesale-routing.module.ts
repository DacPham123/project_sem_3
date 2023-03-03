import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../components/pages/error/error.component';
import { ProfileComponent } from './component/profile/profile.component';


import { ChangePassComponent } from './component/changepass/changepass.component';
import { PrivateSaleComponent } from './privatesale.component';
import { ListPropertiesComponent } from './component/myproperties/listproperties/listproperties.component';
import { AddPropertiesComponent } from './component/myproperties/addproperties/addproperties.component';
import { RoleGuard } from '../_guards/role.guard';
import { AuthGuard } from '../_guards/auth.guard';
import { DetailPropertiesComponent } from './component/myproperties/detailproperties/detailproperties.component';
import { NewsImagesComponent } from './component/myproperties/newsimages/newsimages.component';
import { MyPropertiesComponent } from './component/myproperties/myproperties.component';
import { ShowNewsReviewComponent } from './component/myproperties/shownewsreview/shownewsreview.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { PaymentHistoryComponent } from './component/paymenthistory/paymenthistory.component';
import { PaymentDetailsComponent } from './component/paymentdetails/paymentdetails.component';
import { NotificationComponent } from './component/notification/notification.component';



const routes: Routes = [
    {path: 'privatesale', component: PrivateSaleComponent, 
     canActivate: [AuthGuard, RoleGuard],
     data: {roles: ['privateseller']},
     children: [
        {path: '', component:ListPropertiesComponent},
        {path: 'profile', component:ProfileComponent},
        {path: 'myproperties', component:MyPropertiesComponent, children:[
            {path: '', component:ListPropertiesComponent},
            {path: 'list', component:ListPropertiesComponent},
            {path: 'add', component:AddPropertiesComponent},
            {path: 'review', component:ShowNewsReviewComponent},
            {path: 'detail', component:DetailPropertiesComponent},
            {path: 'newsimg', component:NewsImagesComponent},
        ]},
        {path: 'invoice', component:InvoiceComponent},
        {path: 'paymenthistory', component:PaymentHistoryComponent},
        {path: 'paymendetails', component:PaymentDetailsComponent},
        {path: 'notification', component:NotificationComponent},
        {path: 'changepass', component:ChangePassComponent},
    ]},
    
    // Here add new pages component

    //  {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class PrivateSaleRoutingModule {}