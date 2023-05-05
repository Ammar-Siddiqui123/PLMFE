import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../init/auth.service';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetColumnSeqService {

  constructor(private http: HttpClient, 
              private authService: AuthService) { }

  public getSetColumnSeq(reqPaylaod?:any): Observable<any>{
    let userData = this.authService.userData();
    let payload = {
      "username": userData.userName,
      "wsid": userData.wsid,
      "viewName": "Inventory Map"
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetColumnSequenceDetail`, payload,httpOptions);
  }

  public saveColumnSeq(payload:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/SaveColumns`, payload,httpOptions);
  }
  
  public save(payload:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/SaveTransaction`, payload,httpOptions);
  }

  public delete(payload:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/ReprocessTransactionDelete`, payload,httpOptions);
  }

  public updateAppName(userName:any, wsid:any, appName:any = ''): Observable<any> {
    
      var payLoad = {
        "userName":userName,
        "wsid": wsid,
        "appName":appName   
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      return this.http.post<any>(`${environment.apiUrl}/Common/UserAppNameAdd`, payLoad, httpOptions);           
  }
  
}
