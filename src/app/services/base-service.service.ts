import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
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

    public getAll(endPoint:string ,isLoader:boolean=false):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            }),
            context: new HttpContext().set(BYPASS_LOG, isLoader)
        };
        return this.http.get<any>(`${environment.apiUrl}${endPoint}`,httpOptions);  
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
}