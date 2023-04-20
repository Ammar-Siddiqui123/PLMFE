import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-cm-tote-id-update-modal',
  templateUrl: './cm-tote-id-update-modal.component.html',
  styleUrls: ['./cm-tote-id-update-modal.component.scss']
})
export class CmToteIdUpdateModalComponent implements OnInit {

  public userData: any;

  containerID : string = '';

  clearContainerIDBtn : boolean = true;
  setContainerIDBtn : boolean = false;

  @ViewChild('conID') conID : ElementRef;

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<CmToteIdUpdateModalComponent>,
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

  focusConID() {
    setTimeout(()=>{
      this.conID.nativeElement.focus();
    }, 500);
  }

  updateToteID() {
    try {
      var payLoad = {
        orderNumber : this.data.order.orderNumber,
        toteID: this.data.order.toteID,
        contID: this.conID,
        username: this.userData.userName,
        wsid: this.userData.wsid
      };

      this.service.create(payLoad, '/Consolidation/ContIDShipTransUpdate').subscribe(
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
