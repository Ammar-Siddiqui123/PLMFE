import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/Iemployee';
import { ITransactions } from 'src/app/interface/transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public getOpenTransactions(employee: IEmployee): Observable<ITransactions> {
    let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + basicAuth
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/Admin/OpenTransactionTable`,employee,httpOptions);
  }
}
