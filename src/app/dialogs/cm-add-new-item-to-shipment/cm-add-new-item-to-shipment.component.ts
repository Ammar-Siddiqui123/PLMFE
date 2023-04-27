import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-cm-add-new-item-to-shipment',
  templateUrl: './cm-add-new-item-to-shipment.component.html',
  styleUrls: ['./cm-add-new-item-to-shipment.component.scss']
})
export class CmAddNewItemToShipmentComponent implements OnInit {
  OrderNumber:any;
  containerID:any;
  userData:any = {};

  constructor(private http:ConsolidationManagerService,private authService: AuthService,private toast:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CmAddNewItemToShipmentComponent>) {
      this.OrderNumber = this.data.orderNumber;
      this.userData = this.authService.userData(); 
    }

  ngOnInit(): void {
  }
  async ShippingItemAdd(){
    var obj:any = {
      orderNumber: this.OrderNumber,
      containerID: this.containerID,
      userName: this.userData.userName
    }
    this.http.get(obj,'/Consolidation/ShippingItemAdd').subscribe((res:any) => {
      if (res && res.isExecuted) {
        this.dialogRef.close(true);
      }
  })
}
}
