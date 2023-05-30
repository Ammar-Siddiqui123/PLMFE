import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<any> {
  constructor( 
    private dialog: MatDialog,
    private router: Router
    // public quarantineDialogRef: MatDialogRef<'quarantineAction'>,
  ) { }
  async  canDeactivate(component: any):Promise<boolean> { 
    if(component.ifAllowed){ 
   return     this.OpenConfirmationDialog();
    } 
    return true;
  }
  async OpenConfirmationDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '786px',
        data: {
          message: 'Changes you made may not be saved.',
          heading: 'Inventory Master'
        },
        autoFocus: '__non_existing_element__',
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Yes') {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
