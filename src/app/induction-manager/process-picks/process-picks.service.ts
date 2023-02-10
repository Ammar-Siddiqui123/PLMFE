import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../app/services/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessPicksService  extends BaseService{

  constructor(http: HttpClient) {
    super(http);
   }
}
