import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {PanelMenuModule} from 'primeng/panelmenu';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import {FileUploadModule} from 'primeng/fileupload';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { HeaderAdminComponent } from './headeradmin/headeradmin.component';
import { FooterAdminComponent } from './footeradmin/footeradmin.component';

import { NewsAdminComponent } from './component/news/news.component';
import { MyAgentComponent } from './component/myagent/myagent.component';

import { PaymentHistoryComponent } from './component/paymenthistory/paymenthistory.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ProfileAdminComponent } from './component/profileadmin/profileadmin.component';

import {GalleriaModule} from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import {DatePipe} from '@angular/common';

import { ReLoadPageComponent } from './component/reloadoage/reloadoage.component';
import { AdminIframeComponent } from './component/newsdetails/adminnewsdetailcontentleft/adminiframe/adminifarme.component';
import { AdminNewsDetailContentLeftComponent } from './component/newsdetails/adminnewsdetailcontentleft/adminnewsdetailcontentleft.component';
import { AdminNewsDetailContentRightComponent } from './component/newsdetails/adminnewsdetailcontentright/adminnewsdetailcontentright.component';
import { DetailsNewsAdminComponent } from './component/newsdetails/adminnewsdetails.component';
import { AdminNewsDetailsBannerComponent } from './component/newsdetails/adminnewsdetailsbanner/adminnewsdetailsbanner.component';
import { AdminNewsDetailsPropertiesComponent } from './component/newsdetails/adminnewsdetailsproperties/adminnewsdetailsproperties.component';



import {DialogModule} from 'primeng/dialog';
import { PaymentDetailsComponent } from './component/paymentdetails/paymentdetails.component';
import { ShowNewsAgentComponent } from './component/shownewsagent/shownewsagent.component';

import {InputTextModule} from 'primeng/inputtext';
import { SlideMenuModule } from 'primeng/slidemenu';


import {StyleClassModule} from 'primeng/styleclass';
import { AdminSideBarComponent } from './adminsidebar/adminsidebar.component';
import { ReportComponent } from './component/report/report.component';
import { ChangePassAdminComponent } from './component/changepassadmin/changepassadmin.component';

@NgModule({
  declarations: [
   AdminComponent,
   HeaderAdminComponent,
   FooterAdminComponent,
   AdminSideBarComponent,
   NewsAdminComponent,
   MyAgentComponent,
   ReportComponent,
   PaymentHistoryComponent,
   InvoiceComponent,

   DetailsNewsAdminComponent,
   AdminNewsDetailsBannerComponent,
   AdminIframeComponent,
   AdminNewsDetailContentLeftComponent,
   AdminNewsDetailContentRightComponent,
   AdminNewsDetailsPropertiesComponent,
   ReLoadPageComponent,
   PaymentDetailsComponent,
   ShowNewsAgentComponent,
  
   ShowNewsAgentComponent,
 
   ChangePassAdminComponent,
   ProfileAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminRoutingModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    GalleriaModule,
    DropdownModule,
    CalendarModule,
    PanelMenuModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    SlideMenuModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    StyleClassModule
  ],
  providers: [
    MessageService,
    DatePipe,
    ConfirmationService
    
    
  ],
  bootstrap: []
})
export class AdminModule { }
