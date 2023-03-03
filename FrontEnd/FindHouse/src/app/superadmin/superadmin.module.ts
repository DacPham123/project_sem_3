import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SpeedDialModule } from 'primeng/speeddial';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperAdminComponent } from './superadmin.component';
import { SuperAdminRoutingModule } from './superadmin-routing.module';
import { ToastModule } from 'primeng/toast';
import { HeaderAdminComponent } from './headeradmin/headeradmin.component';
import { FooterAdminComponent } from './footeradmin/footeradmin.component';

import { NewsAdminComponent } from './component/news/news.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { AccountComponent } from './component/account/account.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Check } from '../services/validation.service';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PackageComponent } from './component/package/package.component';
import { PackageService } from '../services/package.service';
import { AddressComponent } from './component/address/address.component';

import { ListboxModule } from 'primeng/listbox';
import { CityService } from '../services/city.service';
import { ProvinceService } from '../services/province.service';
import { WardService } from '../services/ward.service';
import { ChangePassComponent } from './component/changepass/changepass.component';
import { CategoryComponent } from '../superadmin/component/category/category.component';
import { InvoiceService } from '../services/invoice.service';
import { AddUpdatePackage } from './component/package/component/addAndUpdate.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import { AdminIframeComponent } from '../superadmin/component/newsdetails/adminnewsdetailcontentleft/adminiframe/adminifarme.component';
import { AdminNewsDetailContentLeftComponent } from '../superadmin/component/newsdetails/adminnewsdetailcontentleft/adminnewsdetailcontentleft.component';
import { AdminNewsDetailContentRightComponent } from '../superadmin/component/newsdetails/adminnewsdetailcontentright/adminnewsdetailcontentright.component';
import { DetailsNewsAdminComponent } from '../superadmin/component/newsdetails/adminnewsdetails.component';
import { AdminNewsDetailsBannerComponent } from '../superadmin/component/newsdetails/adminnewsdetailsbanner/adminnewsdetailsbanner.component';
import {GalleriaModule} from 'primeng/galleria';
import {CalendarModule} from 'primeng/calendar';
import { ReportNewsService } from '../services/reportnews.service';
import { ReportNewsAdminComponent } from './component/reportnews/reportnews.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {SlideMenuModule} from 'primeng/slidemenu';
import {MenuItem} from 'primeng/api';
import { SideBarComponent } from './sidebar/sidebar.component';





@NgModule({
  declarations: [
    SuperAdminComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    NewsAdminComponent,
    InvoiceComponent,
   // ProfileComponent,
    AccountComponent,
    PackageComponent,
    AddressComponent,
    ChangePassComponent,
    //ProfileComponent,
    CategoryComponent,
    InvoiceComponent,
    AddUpdatePackage,
    AdminIframeComponent,
    AdminNewsDetailContentLeftComponent,
    AdminNewsDetailContentRightComponent,
    DetailsNewsAdminComponent,
    AdminNewsDetailsBannerComponent,
    ReportNewsAdminComponent,
   SideBarComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SuperAdminRoutingModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    SpeedDialModule,
    SplitButtonModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ListboxModule,
    CommonModule,
    RouterModule,
    InputTextareaModule,
    InputNumberModule,
    GalleriaModule,
    CalendarModule,
    NoopAnimationsModule,
    SlideMenuModule,

  ],
  providers: [
    Check,
    ConfirmationService,
    PackageService,
    CityService,
    ProvinceService,
    WardService,
    InvoiceService,
    ReportNewsService
    
  ],
  exports: [
    AddUpdatePackage
  ],

  bootstrap: [SuperAdminComponent]
})
export class SuperAdminModule { }
