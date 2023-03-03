import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../components/pages/error/error.component';



import { RoleGuard } from '../_guards/role.guard';
import { AuthGuard } from '../_guards/auth.guard';


import { UserComponent } from './user.component';
import { ProfileComponent } from './component/profile/profile.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { PaymentHistoryComponent } from './component/paymenthistory/paymenthistory.component';
import { PaymentDetailsComponent } from './component/paymentdetails/paymentdetails.component';
import { NotificationComponent } from '../privatesale/component/notification/notification.component';
import { ChangePassComponent } from './component/changepass/changepass.component';




const routes: Routes = [
    {path: 'visitor', component: UserComponent, 
     canActivate: [AuthGuard, RoleGuard],
     data: {roles: ['visitor']},
     children: [
        {path: '', component:ProfileComponent},
        {path: 'profile', component:ProfileComponent},
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
export class UserRoutingModule {}