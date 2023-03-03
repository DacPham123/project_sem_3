
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { HomeComponent } from './components/pages/home/home.component';
import { ErrorComponent } from './components/pages/error/error.component';


import { SearchNavbarComponent } from './components/navbar/search/searchnavbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideNavComponent } from './components/navbar/navbararea/sidenav/sidenav.component';
import { MainNavComponent } from './components/navbar/navbararea/mainnav/mainnav.component';
import { NavbarAreaComponent } from './components/navbar/navbararea/navbararea.component';
import { ContactComponent } from './components/pages/contact/contact.component';


import { FooterStyleTwoComponent } from './components/footer/footer-style-two.component';
import { CategoryHomeComponent } from './components/pages/home/centerhome/category-home/category-home.component';
import { VipnewsHomeComponent } from './components/pages/home/centerhome/vipnews-home/vipnews-home.component';
import { SpecialnewsHomeComponent } from './components/pages/home/centerhome/specialnews-home/specialnews-home.component';
import { AboutusHomeComponent } from './components/pages/home/centerhome/aboutus-home/aboutus-home.component';
import { VideoHomeComponent } from './components/pages/home/centerhome/video-home/video-home.component';
import { LocationComponent } from './components/pages/home/centerhome/location/location.component';
import { AgentHomeComponent } from './components/pages/home/centerhome/agent-home/agent-home.component';

import { BaseURLService } from './services/baseurl.service';


import { BannerHomeComponent } from './components/pages/home/centerhome/banner-home/banner-home.component';
import { BannerSearchHomeComponent } from './components/pages/home/centerhome/bannersearch-home/bannersearch-home.component';

import { NewstypeService } from './services/newstype.service';

import { SearchComponent } from './components/pages/search/search.component';

import { ProvinceService } from './services/province.service';
import { CityService } from './services/city.service';
import { NewsService } from './services/news.service';
import { AccountService } from './services/account.service';
import { WardService } from './services/ward.service';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CateTOFhouseService } from './services/cateTOFhouse.service';
import { XuanNewsService } from './services/xuannews.service';
import { CategoryService } from './services/category.service';
import { CarouselModule } from 'primeng/carousel';
import { SearchHomeBannerComponent } from './components/pages/searchhome/searchhomebanner/searchhomebanner.component';
import { SearchHomeContentComponent } from './components/pages/searchhome/searchhomecontent/searchhomecontent.component';
import { SearchHomeContentRightComponent } from './components/pages/searchhome/searchhomecontent/searchhomecontentright/searchhomecontentright.component';
import { SearchHomeContentLeftComponent } from './components/pages/searchhome/searchhomecontent/searchhomecontentleft/searchhomecontentleft.component';
import { SearchHomeComponent } from './components/pages/searchhome/searchhome.component';
import { MessageService } from 'primeng/api';
import { NewsTypeComponent } from './components/pages/newstype/newstype.component';
import { NewTypesBannerComponent } from './components/pages/newstype/newstypebanner/newstypebanner.component';
import { NewsTypeContentComponent } from './components/pages/newstype/newstypecontent/newstypecontent.component';
import { CategoryOfHouseContentComponent } from './components/pages/categoryOfhouse/categoryofhousecontent/categoryofhousecontent.component';
import { CategoryOfHouseComponent } from './components/pages/categoryOfhouse/categoryofhouse.component';
import { CateOfHouseBannerComponent } from './components/pages/categoryOfhouse/categoryofhousebanner/categoryofhousebanner.component';
import { LoginService } from './services/login.service';
import { Check } from './services/validation.service';
import { AuthGuardService } from './services/augu.service';
import { ContactService } from './services/contact.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { DialogModule } from 'primeng/dialog';
import { CategoryBannerComponent } from './components/pages/category/categorybanner/categorybanner.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { CategoryContentComponent } from './components/pages/category/categorycontent/categorycontent.component';
import { NewsDetailsBannerComponent } from './components/pages/newsdetails/newsdetailsbanner/newsdetailsbanner.component';

import { NewsDetailComponent } from './components/pages/newsdetails/newsdetail.component';
import { NewsDetailContentRightComponent } from './components/pages/newsdetails/newsdetailcontentright/newsdetailcontentright.component';
import { NewsDetailContentLeftComponent } from './components/pages/newsdetails/newsdetailcontentleft/newsdetailcontentleft.component';
import { NewsDetailsPropertiesComponent } from './components/pages/newsdetails/newsdetailsproperties/newsdetailsproperties.component';
import { IframeComponent } from './components/pages/newsdetails/newsdetailcontentleft/iframe/ifarme.component';

import { LogoutComponent } from './components/logout/logout.component';
import { InputTextModule } from 'primeng/inputtext';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { PrivateSaleModule } from './privatesale/privatesale.module';
import { SearchBannerComponent } from './components/pages/search/search/searchbanner/searchbanner.component';
import { SearchContentComponent } from './components/pages/search/search/searchcontent/searchcontent.component';
import { SearchContentLeftComponent } from './components/pages/search/search/searchcontent/searchcontentleft/searchcontentleft.component';
import { SearchContentRightComponent } from './components/pages/search/search/searchcontent/searchcontentright/searchcontentright.component';

import { ReportNewsService } from './services/reportnews.service';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { InvoiceService } from './services/invoice.service';
import { NewsTableService } from './services/newstable.service';
import { PackageService } from './services/package.service';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './checkout/checkout.component';
import { AdminModule } from './admin/admin.module';
import { SuperAdminModule } from './superadmin/superadmin.module';
import { NgxPayPalModule } from 'ngx-paypal';
import {SlideMenuModule} from 'primeng/slidemenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { UserModule } from './user/user.module';
import { ToastrModule } from 'ngx-toastr';
import { AgentModule } from './agent/agent.module';
import { ReLoadPageComponent } from './reloadpage/reloadpage.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { AboutComponent } from './components/pages/about/about.component';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    ReLoadPageComponent,
    PreloaderComponent,
    HomeComponent,
    NavbarComponent,
    FooterStyleTwoComponent,
    ErrorComponent,
    LoginRegisterComponent,

    ContactComponent,
    CategoryHomeComponent,
    VipnewsHomeComponent,
    SpecialnewsHomeComponent,
    AboutusHomeComponent,
    VideoHomeComponent,
    LocationComponent,
    AgentHomeComponent,

    BannerHomeComponent,
    BannerSearchHomeComponent,

    NavbarAreaComponent,
    SearchNavbarComponent,
    MainNavComponent,
    SideNavComponent,
    ContactComponent,


    SearchComponent,
    CateOfHouseBannerComponent,
    CategoryOfHouseComponent,
    CategoryOfHouseContentComponent,

    NewsTypeComponent,
    NewsTypeContentComponent,
    NewTypesBannerComponent,

    CategoryContentComponent,
    CategoryBannerComponent,
    CategoryComponent,

    NewsDetailsBannerComponent,
    NewsDetailContentLeftComponent,
    NewsDetailComponent,
    NewsDetailContentRightComponent,
    NewsDetailsPropertiesComponent,
    IframeComponent,


    SearchHomeComponent,
    SearchHomeBannerComponent,
    SearchHomeContentComponent,
    SearchHomeContentRightComponent,
    SearchHomeContentLeftComponent,
    SearchComponent,
    SearchBannerComponent,
    SearchContentComponent,
    SearchContentRightComponent,
    SearchContentLeftComponent,

    LogoutComponent,
    CartComponent,
    CheckOutComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,
    ButtonModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastModule,
    SplitButtonModule,
    AvatarModule,
    AvatarGroupModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    GalleriaModule,
    AdminModule,
    PrivateSaleModule,
    
    SuperAdminModule,
    JwtModule.forRoot({       // route guard
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: [],
      },
    }),
    InputTextModule,

    NgxPayPalModule,


    SlideMenuModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ConfirmDialogModule,
    UserModule,
    AgentModule,

    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [
    CateTOFhouseService,
    BaseURLService,
    NewstypeService,
    ProvinceService,
    CityService,
    WardService,
    NewsService,
    AccountService,
    XuanNewsService,
    CategoryService,
    MessageService,
    LoginService,
    Check,
    AuthGuardService,
    JwtHelperService,
    CookieService,
    ContactService,
    //----xuan
    ReportNewsService,
    InvoiceService,
    NewsTableService,
    PackageService,
    ConfirmationService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
