import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalconfigService extends BaseService  {
  constructor(http: HttpClient) {
    super(http);
  }
}