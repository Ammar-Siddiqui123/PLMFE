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
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private authService: AuthService,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq: any;
 
      // const headerValue = request.headers.get('Payload') ?? '';
    

    if(localStorage.getItem('user')){
      const { _token }  = JSON.parse(localStorage.getItem('user') || "{}");
      authReq = request.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          '_token': _token,
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
      
      let userData = this.authService.userData();
      let paylaod = {
        "username": userData.userName,
        "wsid": userData.wsid,
      }      
      
      if(this.authService.isConfigUser()){
        this.authService.configLogout(paylaod).subscribe((res:any) => {
          if (res.isExecuted) {       
            this.dialog.closeAll();
            this.toastr.error('Token Expire', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.router.navigate(['/globalconfig']);
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });       
      } else {
        this.authService.logout(paylaod).subscribe((res:any) => {
          if (res.isExecuted) {  
            localStorage.clear();     
            this.dialog.closeAll();
            this.toastr.error('Token Expire', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.router.navigate(['/login']);            
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }

      return of(err.message);
    }
    throw err;
  }
}
