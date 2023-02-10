import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../init/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isConfigUser()) {
      if (this.auth.IsConfigLogin()) {
        return true;
      } else {
        localStorage.clear();
        this.router.navigate(['/globalconfig']);
        return false;
      }
    } else {
      if (this.auth.IsloggedIn()) {
        return true;
      } else {
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }
    }
    return false;
  }
}
