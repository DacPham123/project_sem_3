import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     /**
     * Inject JWT token for every HTTP request to API
     */
      let token = localStorage.getItem('jwt');

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
  
      return next.handle(request);
  }
}
