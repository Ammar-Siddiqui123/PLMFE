import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-cm-ship-edit-qty',
  templateUrl: './cm-ship-edit-qty.component.html',
  styleUrls: ['./cm-ship-edit-qty.component.scss']
})
export class CmShipEditQtyComponent implements OnInit {

  public userData: any;

  adjustShipQty : string = '';
  adjustReason : string = '';

  clearContainerIDBtn : boolean = true;
  saveAdjustShipQtyBtn : boolean = false;

  @ViewChild('adjReason') adjReason : ElementRef;

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<CmShipEditQtyComponent>,
              private toast: ToastrService,
              private service: ConsolidationManagerService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  validateShipQty() {
    if (this.adjustShipQty != '') {
      this.saveAdjustShipQtyBtn = true;
    } else {
      this.saveAdjustShipQtyBtn = false;
    }
  }

  validateReason() {
    if (this.adjustReason != '') {
      this.saveAdjustShipQtyBtn = true;
    } else {
      this.saveAdjustShipQtyBtn = false;
    }
  }

  clearReason() {
    this.adjustReason = '';
    this.saveAdjustShipQtyBtn = false;
    this.focusReason();
  }

  focusReason() {
    setTimeout(()=>{
      this.adjReason.nativeElement.focus();
    }, 500);
  }

  saveAdjustShipQty() {
    try {
      var payLoad = {
        stid : this.data.id,
        adjustShipQty: this.adjustShipQty,
        adjustReason: this.adjustReason,
        username: this.userData.userName,
      }
      this.service.create(payLoad, '/Consolidation/ShipQTYShipTransUpdate').subscribe((res:any)=>{
        if (res.isExecuted) {
          this.dialogRef.close(res.data);
        } else {
          this.toast.error('Something went wrong', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

}
