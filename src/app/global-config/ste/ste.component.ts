import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-ste',
  templateUrl: './ste.component.html',
  styleUrls: ['./ste.component.scss']
})
export class SteComponent implements OnInit {
  sideBarOpen: boolean = true;
  Status:any = 'Offline';
  constructor( public dialog: MatDialog,    public authService: AuthService) { }

  ngOnInit(): void {
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
  async STEToggle(){  
    try{
      this.Status = 'Pending';
      if(this.Status != 'Online'){
      this.authService.startSTEService().subscribe((res: any) => {
        if(res.data) this.ServiceStatus('start',res.data);
      }) 
    }else  {
      this.authService.stopSTEService().subscribe((res: any) => {
        if(res.data) this.ServiceStatus('stop',res.data);
      })
    }
    }catch(ex){
      this.Status = 'Offline'
      console.log(ex);
    }
}
async STERestart(){  
  try{
    this.Status = 'Pending'; 
    this.authService.stopSTEService().subscribe((res: any) => {
      if(res.data) this.ServiceStatus('restart',res.data);
    })
   
  }catch(ex){
    this.Status = 'Offline'
    console.log(ex);
  }
}
}
