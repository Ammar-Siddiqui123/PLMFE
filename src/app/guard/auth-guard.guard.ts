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
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { AuthService } from '../init/auth.service';
import { HttpClient } from '@angular/common/http'
import { Location } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class AuthGuardGuard implements CanActivate {
  ConfigJson: any[] = [];
  constructor(
    private router: Router,
    public authService: AuthService, private http: HttpClient, private location: Location
  ) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger
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
    var pathSet: any;
    var Index: any = 0;
    route.url.forEach(item => {
      if (Index == 0) pathSet = item.path;
      else pathSet = pathSet + "/" + item.path;
      Index++;
    });
    if (this.ConfigJson?.length) {

      if (route.url.length == 0) {
        pathSet = route.url[0].path;
      }
      var permission = this.ConfigJson.find(x => x.path.toLowerCase() == pathSet.toLowerCase());
      if (userPermission.filter(x => x.toLowerCase() == permission.Permission.toLowerCase()).length > 0) {
        return true;
      } else{
        this.router.navigate(['/login']);
        return false;
      }
    } else if (!this.ConfigJson?.length && pathSet.toLowerCase() == 'dashboard') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}