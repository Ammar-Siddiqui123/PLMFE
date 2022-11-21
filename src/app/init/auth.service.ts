import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  IsloggedIn(){
    let {_token} = JSON.parse(localStorage.getItem('user') || '{}');
    return !!_token;
  }
}
