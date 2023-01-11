import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../init/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetColumnSeqService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getSetColumnSeq(reqPaylaod?:any): Observable<any>{
    let userData = this.authService.userData();
    let payload = {
      "username": reqPaylaod.userData.userName,
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
}
