import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnSequenceService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}
