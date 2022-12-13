import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../app/init/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CellSizeService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getCellSize(body?: any): Observable<any> {
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
    return this.http.post<any>(`${environment.apiUrl}/Common/GetCellSize`, paylaod, httpOptions);
  }
  public saveCellSize(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/SaveCellSize`, body, httpOptions);
  }
  public dltCellSize(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/DeleteCellSize`, body, httpOptions);
  }
}
