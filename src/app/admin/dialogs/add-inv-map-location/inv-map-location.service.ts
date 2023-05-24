import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../../app/init/auth.service';
import { environment } from '../../../../environments/environment';
import { BYPASS_LOG } from '../../../../app/init/http-interceptor';


@Injectable({
  providedIn: 'root'
})
export class InvMapLocationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getLocZTypeInvMap(body?: any): Observable<any> {
    let userData = this.authService.userData();
    let paylaod = {
      "location": body?.location,
      "zone": body?.zone,
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
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetLocationZoneTypeInventoryMap`, paylaod, httpOptions);
  }

  public getItemNumDetail(body: any): Observable<any> {
    let userData = this.authService.userData();
    let paylaod = {
      "itemNumber": body?.itemNumber,
      "zone": body?.zone,
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
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetItemDetail`, paylaod, httpOptions);
  }

  public createInventoryMap(body: any): Observable<any> {
    const asArray = Object.entries(body);

    const filtered = asArray.filter(([key, value]) =>  value != '');

    
    
    let payload = Object.fromEntries(asArray); //  (filtered)  -> changed to (asArray) because API required all keys with empty values

    
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
    return this.http.post<any>(`${environment.apiUrl}/Admin/InsertInventoryMap`, payload, httpOptions);
  }

  public updateInventoryMap(body: any): Observable<any> {
    const asArray = Object.entries(body);

    const filtered = asArray.filter(([key, value]) =>  value != '');

    let payload = Object.fromEntries(filtered);
    
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
    return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateInventoryMap`, payload, httpOptions);
  }
  public getSearchedItem(query: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '
      }),
      context: new HttpContext().set(BYPASS_LOG, true)
    };
    return this.http.post<any>(`${environment.apiUrl}/Common/SearchItem`, query, httpOptions);
  }
}
