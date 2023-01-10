import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  IsloggedIn(){
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return !!user._token;
  }

  userData(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  private userPermission(){
    if(localStorage.getItem('userRights')){
      return JSON.parse(localStorage.getItem('userRights') || '{}');
    }
  }

  isAuthorized(perm:any){
    // console.log(this.userPermission());
    return this.userPermission().includes(perm)
    // console.log(this.userPermission().includes('Admin Menu'))
  }
}
