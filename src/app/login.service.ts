import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { ILogin, ILoginInfo } from './login/Ilogin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) {  
    
  }

  public login(login: ILogin): Observable<ILoginInfo> {
    let basicAuth = '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Login/LoginUser`, login, httpOptions);
  }
  public CompanyInfo(body:any): Observable<any> {
    let basicAuth = '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Login/CompanyInfo`,body ,httpOptions);
  }

  public getSecurityEnvironment(): Observable<ILoginInfo> {
    let basicAuth = '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Login/GetSecurityEnvironment`, '', httpOptions);
  }
  public changePassword(FormData): Observable<ILoginInfo> {
    let basicAuth = '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Login/ChangePassword`, FormData, httpOptions);
  }
  
}

