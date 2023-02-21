import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<any> {
  canDeactivate(component: any): boolean {
    if (component.ifAllowed) {
      return confirm('Changes you made may not be saved.');
    }
    return true;
  }
  
}
