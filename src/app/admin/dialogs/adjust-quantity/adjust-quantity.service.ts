import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../init/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdjustQuantityService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getItemQuantityDetail(id: any): Observable<any> {
    
    let userData = this.authService.userData();
   
    let payload = {
      "mapID": id,
      'username': userData.userName,
      'wsid': userData.wsid
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/AdjustQuantity`, payload, httpOptions);
  }

  public updateItemQuantity(body: any): Observable<any> {

    let payload = body;
    
    let userData = this.authService.userData();
   
     payload['username'] = userData.userName;
     payload["wsid"] =userData.wsid;
    
    // let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateItemQuantity`, payload, httpOptions);
  }

  public getAdjustmentReasonsList(): Observable<any> {
    
    let userData = this.authService.userData();
   
    let payload = {
      'username': userData.userName,
      'wsid': userData.wsid
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/AdjustmentReason`, payload, httpOptions);
  }
}
