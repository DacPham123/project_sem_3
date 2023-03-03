import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';


import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {EditorModule} from 'primeng/editor';
import {TabViewModule} from 'primeng/tabview';

import { CKEditorModule } from 'ckeditor4-angular';
import { NewsTableService } from '../services/newstable.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {GalleriaModule} from 'primeng/galleria';
import {TooltipModule} from 'primeng/tooltip';

import {ImageModule} from 'primeng/image';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { InvoiceService } from '../services/invoice.service';
import { ReportNewsService } from '../services/reportnews.service';
import { ChipModule } from 'primeng/chip';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ChangePassComponent } from './component/changepass/changepass.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { PaymentHistoryComponent } from './component/paymenthistory/paymenthistory.component';
import { PaymentDetailsComponent } from './component/paymentdetails/paymentdetails.component';
import { HeaderAdminComponent } from './headeradmin/headeradmin.component';
import { FooterAdminComponent } from './footeradmin/footeradmin.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import {NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
   UserComponent,
   HeaderAdminComponent,
   FooterAdminComponent,
   SideBarComponent,
   ProfileComponent,
   ChangePassComponent,
   InvoiceComponent,
   PaymentHistoryComponent,
   PaymentDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    RippleModule,
    AutoCompleteModule,
    DropdownModule,
    InputNumberModule,
    EditorModule,
    TabViewModule,
    CKEditorModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
    AvatarGroupModule,
    GalleriaModule,
    TooltipModule,
    ImageModule,
    InputMaskModule,
    ConfirmDialogModule,
    CalendarModule,
    ChipModule,
    SlideMenuModule,
    NoopAnimationsModule
  ],
  providers: [
    NewsTableService,
    ConfirmationService,
    InvoiceService,
    ReportNewsService 
  ],
  bootstrap: []
})
export class UserModule { }
