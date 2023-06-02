import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { BYPASS_LOG } from '../init/http-interceptor';

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    constructor(private http: HttpClient) {
    }

    public get(reqPaylaod: any, endPoint: string, isLoader:boolean=false): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            }),
            context: new HttpContext().set(BYPASS_LOG, isLoader)
        };
        return this.http.post<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod,httpOptions);
    }

    public getAll(endPoint:string ,payload?,isLoader:boolean=false):Observable<any>{
       const headers = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': 'Basic ',
       
          })
        //   'Payload':JSON.stringify(payload)
        let queryParams = new HttpParams();
            for(let key in payload){
            queryParams=queryParams.append(key,payload[key]);
            }
        return this.http.get<any>(`${environment.apiUrl}${endPoint}`,{headers:headers,params:queryParams});  
    }

    public create(reqPaylaod: any, endPoint: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.post<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
    }
    public update(reqPaylaod: any, endPoint: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.post<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
    }
    public delete(reqPaylaod: any, endPoint: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.post<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
    }

    public put(reqPaylaod: any, endPoint: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.put<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
    }
}