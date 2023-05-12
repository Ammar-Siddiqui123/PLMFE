// import { PlatformLocation } from '@angular/common';
// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../init/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuardGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (this.auth.isConfigUser()) {
//       if (this.auth.IsConfigLogin()) {
//         return true;
//       } else {
//         localStorage.clear();
//         this.router.navigate(['/globalconfig']);
//         return false;
//       }
//     } else {
//       if (this.auth.IsloggedIn()) {
//         return true;
//       } else {
//         localStorage.clear();
//         this.router.navigate(['/login']);
//         return false;
//       }
//     }
//     return false;
//   }
// }

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../init/auth.service';
import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class AuthGuardGuard implements CanActivate {
  ConfigJson: any[] = [];
  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    public authService: AuthService, private http: HttpClient, private location: Location
  ) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
    const pathSet = state.url.split('?')[0]; 
    if (!this.ConfigJson?.length) {
      var Storagepermission = JSON.parse(localStorage.getItem('Permission') || '[]');
      if (Storagepermission?.length) {
        this.ConfigJson = Storagepermission;
      } else {
        this.http.get('assets/json/GlobalConfigrations.json').subscribe((res: any) => {
          if (res) {
            this.ConfigJson = res;
            localStorage.setItem('Permission', JSON.stringify(this.ConfigJson));
          }
        });
      }
    }
    const userPermission = this.authService.userPermission(); 
    if (this.ConfigJson?.length) {

     
      var permission = this.ConfigJson.find(x => x.path.toLowerCase() == pathSet.toLowerCase());
      if (userPermission.filter(x => x.toLowerCase() == permission.Permission.toLowerCase()).length > 0) {
        return true;
      } else{
        this.router.navigate(['/login']);
        return false;
      }
    } else if (!this.ConfigJson?.length) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}