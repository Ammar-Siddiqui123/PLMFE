import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryMapService {

  constructor(private http: HttpClient) { }


  public getSetColumnSeq(userName:any, wsid: any): Observable<any>{
   // let userData = this.authService.userData();
    let payload = {
      "username": userName,
      "wsid": wsid,
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

  public quarantineInventoryMap(reqPaylaod:any): Observable<any>{
    // let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateInventoryMapOTQuarantine`, reqPaylaod,httpOptions);
  }

  public unQuarantineInventoryMap(reqPaylaod:any): Observable<any>{
    // let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/UpdateInventoryMapOTUnQuarantine`, reqPaylaod,httpOptions);
  }


  public getSearchData(reqPaylaod:any): Observable<any>{
    // let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/GetTypeAheadInventoryMap`, reqPaylaod,httpOptions);
  }

}
