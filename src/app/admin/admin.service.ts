import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../services/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}