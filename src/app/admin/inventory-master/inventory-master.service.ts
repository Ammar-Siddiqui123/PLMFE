import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from '../../../app/services/base-service.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryMasterService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }
}
