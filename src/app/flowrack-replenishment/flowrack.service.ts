import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class FlowrackService extends BaseService {

  constructor(http:HttpClient)  {
    super(http);
   }
}
