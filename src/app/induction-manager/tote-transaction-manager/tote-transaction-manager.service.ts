import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base-service.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ToteTransactionManagerService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}
