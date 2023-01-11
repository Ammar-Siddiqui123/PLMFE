import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    ) {}

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
    return next.handle(authReq).pipe(catchError((error, caught) => {
      this.handleAuthError(error);
      return of(error);
    }) as any);
  
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.toastr.error('Token Expire', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      localStorage.clear();
      this.router.navigate([`/login`]);
      return of(err.message);
    }
    throw err;
  }
}
