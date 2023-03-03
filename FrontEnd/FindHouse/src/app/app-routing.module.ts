import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

import { ErrorComponent } from './components/pages/error/error.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ContactComponent } from './components/pages/contact/contact.component';



import { AboutComponent } from './components/pages/about/about.component';
import { SearchComponent } from './components/pages/search/search.component';
import { SearchHomeComponent } from './components/pages/searchhome/searchhome.component';
import { CategoryOfHouseComponent } from './components/pages/categoryOfhouse/categoryofhouse.component';
import { NewsTypeComponent } from './components/pages/newstype/newstype.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { VerifyComponent } from './components/verify/verify.component';
import { NewsDetailComponent } from './components/pages/newsdetails/newsdetail.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './checkout/checkout.component';
import { ReLoadPageComponent } from './reloadpage/reloadpage.component';




const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginRegisterComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'categoryofhouse/:cateTofhouseid', component: CategoryOfHouseComponent},
    {path: 'newtype/:newstypeid', component: NewsTypeComponent},
    {path: 'category/:categoryid', component: CategoryComponent},
    {path: 'search', component: SearchComponent},
    {path: 'newsdetail/:newsid', component: NewsDetailComponent},
    {path: 'searchhome/:provinceId/:cateTofhouseid/:categoryid', component: SearchHomeComponent},
    {path: 'verify', component: VerifyComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'cart', component:CartComponent},
    {path: 'checkout', component:CheckOutComponent},
    {
        path: 'messages',
        loadChildren: () => import('./message/message.module').then(mod => mod.MessageModule)
    },
 
    {path: 'error', component: ErrorComponent}, // This line will remain down from the whole pages component list
    {path: 'reload', component:ReLoadPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}