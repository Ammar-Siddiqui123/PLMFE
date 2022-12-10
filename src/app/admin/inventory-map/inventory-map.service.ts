import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryMapService {

  constructor(private http: HttpClient) { }


  public getInventoryMap(reqPaylaod:any): Observable<any>{
    // let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetInventoryMap`, reqPaylaod,httpOptions);
  }

  public deleteInventoryMap(reqPaylaod:any): Observable<any>{
    // let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/DeleteInventoryMap`, reqPaylaod,httpOptions);
  }
}
