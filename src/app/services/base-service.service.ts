import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    constructor(private http: HttpClient) {
    } 
      Get(endPoint:string ,payload?,isLoader:boolean=false): Observable<any>{
       const headers = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': 'Basic '
          })
          let queryParams = new HttpParams();
       if(payload != null){
            for(let key in payload){
                if(payload[key] != undefined) queryParams=queryParams.append(key,payload[key]);
            }
       }
        return this.http.get<any>(`${environment.apiUrl}${endPoint}`,{headers:headers,params:queryParams}); 
    }
  
    public Post(endPoint: string,reqPaylaod: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.post<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
    }
    public Update(endPoint: string,reqPaylaod: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.put<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
    }
    public Delete(endPoint: string,reqPaylaod: any = null) {
      let queryParams = new HttpParams();
      for(let key in reqPaylaod){
      queryParams=queryParams.append(key,reqPaylaod[key]);
      }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            }),
            params:queryParams
        };
       
        return this.http.delete<any>(`${environment.apiUrl}${endPoint}`, httpOptions);
    } 
    public update(reqPaylaod: any, endPoint: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.put<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
    } 
}