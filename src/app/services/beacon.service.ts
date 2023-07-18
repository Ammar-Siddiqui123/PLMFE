import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeaconService {

  constructor() { }
  sendRequest(url: string, payload: any): void {
    // const payloadString = JSON.stringify(payload);
    navigator.sendBeacon(url, payload);
  }
}
