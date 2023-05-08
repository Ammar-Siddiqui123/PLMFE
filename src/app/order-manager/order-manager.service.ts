import { Injectable } from '@angular/core';
import { BaseService } from '../services/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService extends BaseService  {
  constructor(http: HttpClient) {
    super(http);
  }
}
