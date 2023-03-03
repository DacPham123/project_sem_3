import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private token: string;

  constructor(
    private jwtHelper:JwtHelperService,
    private router: Router
    ) { }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = next.data.roles as Array<string>;
    if (roles) {
      const match = this.roleMatch(roles);
  
      if (match) {
        return true;
      }
    }
    
    this.router.navigate(["/error"]);
    return false;
  }
  
  private roleMatch(allowedRole: Array<string>): boolean {
    this.token = localStorage.getItem('jwt');
    let isMatch = false;
    const userRole = this.jwtHelper.decodeToken(this.token).Role as string;
    allowedRole.forEach(element => {
      if (userRole.trim() === element) {
    
        isMatch = true;
 
      }
    });
 

    return isMatch;
  }
}
