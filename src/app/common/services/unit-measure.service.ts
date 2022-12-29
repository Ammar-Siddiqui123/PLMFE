import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../app/init/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasureService {

  constructor(private http: HttpClient, 
              private authService: AuthService) {}

  public getUnitOfMeasure(body?: any): Observable<any> {
    let userData = this.authService.userData();
    let paylaod = {
      "username": userData.userName,
      "wsid": userData.wsid,
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/UnitOfMeasure`, paylaod, httpOptions);
  }

  public saveUnitOfMeasure(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/UnitOfMeasureSave`, body, httpOptions);
  }

  public dltUnitOfMeasure(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/UnitOfMeasureDelete`, body, httpOptions);
  }
}
