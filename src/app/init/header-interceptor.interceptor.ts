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
    const { _token }  = JSON.parse(localStorage.getItem('user') || '');
    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        '_token': _token
      })
    });
    return next.handle(authReq);
  }
}
