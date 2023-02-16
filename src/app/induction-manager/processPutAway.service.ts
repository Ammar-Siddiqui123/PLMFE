import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/Iemployee';
import { ITransactionModelIndex, ITransactions } from 'src/app/interface/transaction';
import { BaseService } from 'src/app/services/base-service.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProcessPutAwayService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  // public getTransactionModelIndex(employee: ITransactionModelIndex): Observable<ITransactions> {
  //   let basicAuth = window.btoa(`${environment.userName}`+':'+`${environment.password}`)
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Basic ' + basicAuth
  //     })
  //   };
  //   return this.http.post<any>(`${environment.apiUrl}/Admin/TransactionModelIndex`,employee,httpOptions);
  // }
}
