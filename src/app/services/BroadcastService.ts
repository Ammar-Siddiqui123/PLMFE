import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BroadcastService extends Subject<any> {
  constructor() {
    super();
  }
}