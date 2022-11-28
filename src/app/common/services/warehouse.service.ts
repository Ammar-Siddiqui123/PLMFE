import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../app/init/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getWareHouse(body?: any): Observable<any> {
    let userData = this.authService.userData();
    let paylaod = {
      "username": userData.userName,
      "wsid": userData.wsid,
    }
    // let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/GetWarehouses`, paylaod, httpOptions);
  }
  public saveWareHouse(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/SaveWarehouse`, body, httpOptions);
  }
  public dltWareHouse(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/DeleteWarehouse`, body, httpOptions);
  }
}
