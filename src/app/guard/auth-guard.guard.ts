 

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
    if(this.router.url.indexOf('globalconfig') > -1 ||  pathSet.indexOf('/globalconfig') > -1){
      if(!(pathSet.indexOf('/globalconfig/') > -1))    {localStorage.clear(); this.router.navigate(['/globalconfig']);}  
      if(this.authService.IsConfigLogin()) return true; else return false;
    }
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
      if(permission.Permission == true) return true;
      else if (userPermission.filter(x => x.toLowerCase() == permission.Permission.toLowerCase()).length > 0) {
        return true;
      } else{
        localStorage.clear();
        window.location.href = '/#/login';
        return false;
      }
    } else if (!this.ConfigJson?.length && this.authService.IsloggedIn()) {
      return true;
    }
    localStorage.clear();
    window.location.href = '/#/login';
    return false;
  }
}