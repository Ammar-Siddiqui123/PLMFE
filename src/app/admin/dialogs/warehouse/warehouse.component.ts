import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from 'src/app/common/services/warehouse.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  public warehosue_list: any;
  public userData: any;

  constructor(
    private whService: WarehouseService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>
    ) { }


  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.whService.getWareHouse().subscribe((res) => {
     this.warehosue_list = res.data;
    });
  
  }
  addwhRow(row:any){
    this.warehosue_list.push([]);
  }
  saveWareHouse(warehosue:any, oldWh:any){ 
    let paylaod = {
      "oldWarehouse": oldWh.toString(),
      "warehouse": warehosue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    console.log(paylaod);
    
    this.whService.saveWareHouse(paylaod).subscribe((res) => {
      this.toastr.success(labels.alert.success, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    });
  }
  dltWareHouse(warehosue:any){
    let paylaod = {
      "warehouse": warehosue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.warehosue_list.pop(warehosue);
    this.whService.dltWareHouse(paylaod).subscribe((res) => {
      this.toastr.success(labels.alert.delete, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    });
  }

  selectWearHouse(selectedWh: any){
    this.dialogRef.close(selectedWh.value);
  }
}
