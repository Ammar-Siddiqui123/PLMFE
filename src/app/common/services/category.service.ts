import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../app/init/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, 
              private authService: AuthService) {}

  public getCategory(body?: any): Observable<any> {
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
    return this.http.post<any>(`${environment.apiUrl}/Common/AllCategories`, paylaod, httpOptions);
  }

  public saveCategory(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/SaveCategory`, body, httpOptions);
  }

  public dltCategory(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/CategoryDelete`, body, httpOptions);
  }
}
