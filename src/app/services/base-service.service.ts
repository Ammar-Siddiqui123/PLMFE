import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    constructor(private http: HttpClient) {
    }

    public get(reqPaylaod: any, endPoint: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic '
            })
        };
        return this.http.post<any>(`${environment.apiUrl}${endPoint}`, reqPaylaod, httpOptions);
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