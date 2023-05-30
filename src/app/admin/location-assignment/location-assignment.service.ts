import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/services/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class LocationAssignmentService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
   }
}
