import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgentRoutingModule } from './agent-routing.module';

import { HeaderAdminComponent } from './headeradmin/headeradmin.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './component/profile/profile.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import { MyPropertiesComponent } from './component/myproperties/myproperties.component';
import { ChangePassComponent } from './component/changepass/changepass.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {AgentComponent} from './agent.component';
import { AddPropertiesComponent } from './component/myproperties/addproperties/addproperties.component';
import { ListPropertiesComponent } from './component/myproperties/listproperties/listproperties.component';


import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {EditorModule} from 'primeng/editor';
import {TabViewModule} from 'primeng/tabview';
import { DetailPropertiesComponent } from './component/myproperties/detailproperties/detailproperties.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NewsTableService } from '../services/newstable.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {GalleriaModule} from 'primeng/galleria';
import {TooltipModule} from 'primeng/tooltip';
import { NewsImagesComponent } from './component/myproperties/newsimages/newsimages.component';
import {ImageModule} from 'primeng/image';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ShowNewsReviewComponent } from './component/myproperties/shownewsreview/shownewsreview.component';
import { ShowNewsReviewBannerComponent } from './component/myproperties/shownewsreview/shownewsreviewbanner/shownewsreviewbanner.component';
import { ShowNewsReviewContentLeftComponent } from './component/myproperties/shownewsreview/shownewsreviewcontentleft/shownewsreviewcontentleft.component';
import { ShowNewsReviewContentRightComponent } from './component/myproperties/shownewsreview/shownewsreviewcontentright/shownewsreviewcontentright.component';

import { InvoiceService } from '../services/invoice.service';
import { ReportNewsService } from '../services/reportnews.service';
import { ReviewNewsIframeComponent } from './component/myproperties/shownewsreview/shownewsreviewcontentleft/reviewnewsiframe/reviewnewsiframe.component';
import { ChipModule } from 'primeng/chip';
import { InvoiceComponent } from './component/invoice/invoice.component';

import { NotificationComponent } from './component/notification/notification.component';
import { FooterAdminComponent } from './footeradmin/footeradmin.component';

import {SlideMenuModule} from 'primeng/slidemenu';
import {NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmPopupModule} from 'primeng/confirmpopup';


@NgModule({
  declarations: [
    AgentComponent,
   HeaderAdminComponent,
   FooterAdminComponent,
   SideBarComponent,
   ProfileComponent,
   MyPropertiesComponent,
   AddPropertiesComponent,
   ListPropertiesComponent,
   DetailPropertiesComponent,
   NewsImagesComponent,
   ChangePassComponent,
   ShowNewsReviewComponent,
   ShowNewsReviewContentLeftComponent,
   ShowNewsReviewContentRightComponent,
   ShowNewsReviewBannerComponent,
   
   ReviewNewsIframeComponent,
   InvoiceComponent,

   NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgentRoutingModule,
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
    ConfirmPopupModule,
    NoopAnimationsModule,
    SlideMenuModule,
  ],
  providers: [
    NewsTableService,
    ConfirmationService,
    InvoiceService,
    ReportNewsService 
  ],
  bootstrap: []
})
export class AgentModule { }
