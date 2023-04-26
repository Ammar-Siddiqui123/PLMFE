import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-cm-shipping-carrier',
  templateUrl: './cm-shipping-carrier.component.html',
  styleUrls: ['./cm-shipping-carrier.component.scss'],
})
export class CmShippingCarrierComponent implements OnInit {
  userData: any;
  carrierList: any;
  carrierListLength: any;
  disableAddField: boolean = false;
  disableEnable = [{ index: -1, value: false }];
  onDestroy$: Subject<boolean> = new Subject();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private cmService: ConsolidationManagerService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getCarrier();
  }

  getCarrier() {
    let payload = {
      userName: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.cmService
      .get(payload, '/Consolidation/CarrierSelect')
      .subscribe((res: any) => {
        if (res.isExecuted) {
          this.disableAddField = false;
          this.carrierList = [...res.data];
          this.carrierListLength = res.data.length;
          this.carrierList = res.data.map((item) => {
            return { carrier: item, oldCarrier: true };
          });
          this.disableEnable.shift();
          for (var i = 0; i < this.carrierList.length; i++) {
            this.disableEnable.push({ index: i, value: true });
          }
          // this.carrierList=res.data;
        }
      });
  }
  addCarrierRow(row: any) {
    if (this.carrierList.length > this.carrierListLength) {
      this.disableAddField = true;
    } else {
      this.disableAddField = false;
      this.carrierList.unshift({ carrier: '', oldCarrier: false });
    }

    //this.disableEnable.unshift({index:0,value:false});
  }

  saveCarrier(carrer, item) {
    let paylaod;
    if (item.oldCarrier) {
      paylaod = {
        carrier: carrer,
        oldCarrier: item.carrier,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
    } else {
      paylaod = {
        carrier: carrer,
        oldCarrier: '',
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
    }

    this.cmService
      .get(paylaod, '/Consolidation/CarrierSave')
      .subscribe((res: any) => {
        if (res.isExecuted) {
          this.toastr.success(res.message);
          this.getCarrier();
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  changeDisable(index: any) {
    this.disableEnable[index].value = false;
  }
  deleteCarrier(event: any) {
    if (event != '') {
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'delete-carrier',
          carrier: event.carrier,
          //  grp_data: grp_data
        },
      });
      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((result) => {
          this.getCarrier();
        });
    } else {
      // this.velocity_code_list.shift();
      // this.getVelocity();
    }
  }
}