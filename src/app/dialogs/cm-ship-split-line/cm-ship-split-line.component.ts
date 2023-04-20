import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-cm-ship-split-line',
  templateUrl: './cm-ship-split-line.component.html',
  styleUrls: ['./cm-ship-split-line.component.scss']
})
export class CmShipSplitLineComponent implements OnInit {

  public userData: any;

  splitScreenQty : string = '';
  splitScreenQtyBtn : boolean = false;

  @ViewChild('ssQty') ssQty : ElementRef;

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<CmShipSplitLineComponent>,
              private toast: ToastrService,
              private service: ConsolidationManagerService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.focusSplitScreenQty();
  }

  validateSplitScreenQty() {
    if (parseInt(this.splitScreenQty) > this.data.order.qty) {      
      this.splitScreenQtyBtn = false;
    } else if (this.splitScreenQty == '') {      
      this.splitScreenQtyBtn = false;
    } else {      
      this.splitScreenQtyBtn = true;
    }
  }

  focusSplitScreenQty() {
    setTimeout(()=>{
      this.ssQty.nativeElement.focus();
    }, 500);
  }

  saveSplitScreenQty() {
    try {
      var payLoad = {
        id : this.data.order.sT_ID,
        quantity : this.splitScreenQty,
        page: this.data.page,
        username: this.userData.userName,
        wsid: this.userData.wsid
      };

      this.service.create(payLoad, '/Consolidation/SplitLineTrans').subscribe(
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
