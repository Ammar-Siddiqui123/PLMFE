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

  delete(event: any){
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-warehouse',
        warehouse: event
      //  grp_data: grp_data
      }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
    this.getWarehouse();
    })
  }


  getWarehouse(){
    this.whService.getWareHouse().subscribe((res) => {
      this.warehouse_list = res.data;
     });
  }
  addwhRow(row:any){
    // this.inputEl.nativeElement.disabled = true;
    this.warehouse_list.unshift([]);
  }
  saveWareHouse(warehosue:any, oldWh:any){ 

    let cond = true;
    this.warehouse_list.forEach(element => {
     if(element == warehosue ) {
      cond= false
      this.toastr.error('Conflict: Warehouse cannot be saved! Another warehouse matches the current. Please save any pending changes before attempting to save this entry.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
     }   
   });
   if(cond ){
    let paylaod = {
      "oldWarehouse": oldWh.toString(),
      "warehouse": warehosue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    // console.log(paylaod);
    
    this.whService.saveWareHouse(paylaod).subscribe((res) => {
      this.toastr.success(labels.alert.success, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    });
  }
  }
  dltWareHouse(warehosue:any){
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

  selectWearHouse(selectedWh: any){
    this.dialogRef.close(selectedWh);
  }
  clearWareHouse(){
    this.dialogRef.close('clear');
  }
}
