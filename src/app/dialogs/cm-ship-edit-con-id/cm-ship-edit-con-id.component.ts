import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-cm-ship-edit-con-id',
  templateUrl: './cm-ship-edit-con-id.component.html',
  styleUrls: ['./cm-ship-edit-con-id.component.scss']
})
export class CmShipEditConIdComponent implements OnInit {

  public userData: any;

  containerID : string = '';

  clearContainerIDBtn : boolean = true;
  setContainerIDBtn : boolean = false;

  @ViewChild('conID') conID : ElementRef;

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<CmShipEditConIdComponent>,
              private toast: ToastrService,
              private service: ConsolidationManagerService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.focusConID();
  }

  validateContainerID() {
    if (this.containerID != '') {      
      this.setContainerIDBtn = true;
    } else {      
      this.setContainerIDBtn = false;
    }
  }

  clearContainerID() {
    this.containerID = '';
    this.setContainerIDBtn = false;
    this.focusConID();
  }

  focusConID() {
    setTimeout(()=>{
      this.conID.nativeElement.focus();
    }, 500);
  }

  setContainerID() {
    try {
      var payLoad = {
        stid : this.data.order.id,
        containerID: this.conID,
        username: this.userData.userName,
        wsid: this.userData.wsid
      };

      this.service.create(payLoad, '/Consolidation/ContainerIdSingleShipTransUpdate').subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.dialogRef.close(res.data);
          } else {
            this.toast.error('Something went wrong', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
          }
        },
        (error) => { }
      );
    } catch (error) {
      console.log(error);
    }
  }

}
