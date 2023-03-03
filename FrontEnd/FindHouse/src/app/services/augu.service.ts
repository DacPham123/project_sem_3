import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public router: Router,private jwtHelper:JwtHelperService) {}
  // canActivate(route: ActivatedRouteSnapshot): boolean {
  //   const expectedRole = route.data.expectedRole;
  //   if (expectedRole!==this.cookieSer.get('role')) {
  //       this.router.navigate(['/login']);
 
  //     return false;
  //   }
  //   return true;
  // }
  canActivate(route: ActivatedRouteSnapshot){
    var token = localStorage.getItem("jwt");
    const expectedRole = route.data.expectedRole;
    if(token && !this.jwtHelper.isTokenExpired(token)){
        
       var r=localStorage.getItem("role");
       if(r==localStorage.getItem("role")){
         return true
       }else{
         this.router.navigate(["home"]);
           return false;
       }
       
    }
    this.router.navigate(["login"]);
    return false;
  }
}