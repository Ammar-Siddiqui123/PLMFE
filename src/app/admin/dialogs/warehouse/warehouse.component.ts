import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { WarehouseService } from 'src/app/common/services/warehouse.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component'

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  public warehouse_list: any;
  public userData: any;
  onDestroy$: Subject<boolean> = new Subject();
  @ViewChild('inputEl') public inputEl: ElementRef;
  enableButton = [{ index: -1, value: true }];


  constructor(
    private whService: WarehouseService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getWarehouse();

  }

  deleteWH(warehosue: any) {
    console.log(warehosue);
    if(warehosue != ''){
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'delete-warehouse',
          warehouse: warehosue
          //  grp_data: grp_data
        }
      })
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
        this.getWarehouse();
      })
    }
    else{
      this.warehouse_list.shift();
      this.getWarehouse();
      // this.toastr.error('Warehouse can not be deleted.', 'Error!', {
      //   positionClass: 'toast-bottom-right',
      //   timeOut: 2000
      // });
    }
   
  }


  getWarehouse() {
    this.enableButton = [];
    this.whService.getWareHouse().subscribe((res) => {
      this.warehouse_list = res.data;
      for (var i = 0; i < this.warehouse_list.length; i++) {
        // this.unitOfMeasure_list.fromDB = true;
        this.enableButton.push({ index: i, value: true });
      }
    });
  }
  addwhRow(row: any) {
    // this.inputEl.nativeElement.disabled = true;
    this.warehouse_list.unshift([]);
    this.enableButton.push({ index: -1, value: true })
  }
  enableDisableButton(i: any) {
    this.enableButton[i].value = false;
  }
  saveWareHouse(warehosue: any, oldWh: any) {

    let cond = true;
    this.warehouse_list.forEach(element => {
      if (element == warehosue) {
        cond = false
        this.toastr.error('Conflict: Warehouse cannot be saved! Another warehouse matches the current. Please save any pending changes before attempting to save this entry.', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        return;
      }
    });
    if (cond) {
      let paylaod = {
        "oldWarehouse": oldWh.toString(),
        "warehouse": warehosue,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      // console.log(paylaod);

      this.whService.saveWareHouse(paylaod).subscribe((res) => {
        if(res.isExecuted){
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.getWarehouse();
        }
      });
    }
  }
  dltWareHouse(warehosue: any) {
    let paylaod = {
      "warehouse": warehosue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    //  this.warehouse_list.pop(warehosue);
    this.whService.dltWareHouse(paylaod).subscribe((res) => {
      this.toastr.success(labels.alert.delete, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });

      this.getWarehouse();

    });
  }

  selectWearHouse(selectedWh: any) {
    this.dialogRef.close(selectedWh);
  }
  clearWareHouse() {
    this.dialogRef.close('clear');
  }
}
