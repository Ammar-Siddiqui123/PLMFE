import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from '../services/base-service.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ConsolidationManagerService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }
}
