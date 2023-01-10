import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq: any;
    if(localStorage.getItem('user')){
      const { _token }  = JSON.parse(localStorage.getItem('user') || "{}");
      authReq = request.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          '_token': _token
        })
      });
    
    }
    else{
      authReq = request.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          '_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyTmFtZSI6IjEyMzQiLCJVc2VyVHlwZSI6IlUiLCJBY2Nlc3NEdHRtIjo2MzgwMTk0ODA5MTQ0MTk5NTksIkFwcGxpY2F0aW9uSUQiOiJQaWNrUHJvIiwiQWNjZXNzTGV2ZWwiOiJBZG1pbmlzdHJhdG9yIiwiRmlyc3RMb2dpblRpbWUiOjYzODAxOTQ4MDkxNDQxOTk1OX0.Cyg97oHb_UlFuuBd8MadpE037CW52VPF-_sdYCbxfyA'
        })
      });
    }
    return next.handle(authReq);
  
  }
}
