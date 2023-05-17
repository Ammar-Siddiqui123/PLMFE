import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-ccsif',
  templateUrl: './ccsif.component.html',
  styleUrls: ['./ccsif.component.scss']
})
export class CcsifComponent implements OnInit {
  sideBarOpen: boolean = true;
  Status:any = 'Offline';
  constructor( public dialog: MatDialog,    public authService: AuthService) { }

  ngOnInit(): void {
    this.CheckStatus(); 
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
   ServiceStatus(changeType, success) {
    if (changeType == 'start' || changeType == 'restart') {
        if (success) {
            this.Status = 'Online';
            this.ConfirmationPopup('Service ' + changeType + ' was successful.');
        } else {
          this.Status = 'Offline'; 
          this.ConfirmationPopup('Service ' + changeType + ' was unsuccessful.  Please try again or contact Scott Tech for support.');
        };
    } else {
      this.Status = 'Offline'; 
        if (success) {
          this.ConfirmationPopup('Service stop was successful.');
        } else {
          this.ConfirmationPopup('Service stop encountered an error.  Please try again or contact Scott Tech for support.');
        };
    };
};
  ConfirmationPopup(msg:any) {
    const dialogRef  = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        message: msg,
      },
    });  
     dialogRef.afterClosed().subscribe((result) => {
      if (result==='Yes') {
        this.ServiceStatus('start',true);
      }
    }); 
  }
  async CCSIFToggle(){  
    this.Status = 'Pending';
    if(this.Status != 'Online'){
    this.authService.startCCSIF().subscribe((res: any) => {
      if(res.data) this.ServiceStatus('start',res.data);
    }) 
  }else  {
    this.authService.stopCCSIF().subscribe((res: any) => {
      if(res.data) this.ServiceStatus('stop',res.data);
    })
  }
}
async CheckStatus(){
  this.authService.ServiceStatusCCSIF().subscribe((res: any) => {
    if(res.data) this.ServiceStatus('start',res.data);
    else this.ServiceStatus('stop',res.data);
  })
  
}
}
