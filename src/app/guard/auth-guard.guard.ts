import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../init/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      console.log(this.auth.isConfigUser());
      if(this.auth.IsloggedIn()){
        return true;
      }
      else if(this.auth.isConfigUser()){
        if(this.auth.IsloggedIn()){
          return true;

        }else{
          return false;
        }
      }
      else{
        if(this.auth.isConfigUser()){
          this.router.navigate(['/globalconfig'])
          return false;
        }else{
          this.router.navigate(['/login']);
          return false;
        }


      }
      

  }
  
}
