import { Injectable } from '@angular/core';
import { BaseService } from '../services/base-service.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ConsolidationManagerService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}
