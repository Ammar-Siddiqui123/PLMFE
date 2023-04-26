import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
];

@Component({
  selector: 'app-cm-shipping',
  templateUrl: './cm-shipping.component.html',
  styleUrls: ['./cm-shipping.component.scss']
})
export class CmShippingComponent implements OnInit {
  
  displayedColumns: string[] = ['containerID', 'carrier', 'trackingNum','action'];
  tableData = ELEMENT_DATA;
  userData:any = {};
  orderNumber:any = '2910098';
  shippingData:any[]=[];
  carriers:any[]=[];
  shippingComp:any = false;
  shippingPreferences:any={};
   constructor(private http:ConsolidationManagerService,private authService: AuthService,private toast:ToastrService,private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CmShippingComponent>,) { 
      // this.orderNumber = this.data.orderNumber;
    this.userData = this.authService.userData();
  }

  ngOnInit(): void {
    this.ShippingIndex();
  }
async ShippingIndex(){
 var obj : any= {
    orderNumber: this.orderNumber ,
    userName: this.userData.userName,
    wsid: this.userData.wsid
  }
 this.http.get(obj,'/Consolidation/ShippingIndex').subscribe((res:any) => {
  if (res && res.isExecuted) {
  this.shippingData = res.data.shippingData;
  this.carriers = res.data.carriers;
  this.shippingPreferences = res.data.shippingPreferences;
  this.shippingComp = res.data.shippingComp;
  this.orderNumber = res.data.orderNumber;
  }
});
}
async DeleteItem(element:any){
 var obj :any=  {
    id: element.id,
    orderNumber: this.orderNumber,
    contId: element.containerID,
    carrier: element.carrier,
    trackingNum: element.trackingNum,
    userName: this.userData.username,
    wsid: this.userData.wsid
  }
  this.http.get(obj,'/Consolidation/ShipmentItemDelete').subscribe((res:any) => {
    if (res && res.isExecuted) {
      this.ShippingIndex();
    }
  });
} 
async updateShipmentItem(element:any){
  var obj :any=  {
    id: element.id, 
    carrier: element.carrier,
    trackingNum: element.trackingNum, 
    "freight": element.freight,
    "freight1": element.freight1,
    "freight2": element.freight2,
    "weight": element.weight,
    "length": element.length,
    "width": element.width,
    "height": element.height,
    "cube": element.cube
  }
   this.http.get(obj,'/Consolidation/ShipmentItemUpdate').subscribe((res:any) => {
     if (res && res.isExecuted) {
       this.ShippingIndex();
     }
   });
 } 
 async ShippingCompShip(){
  var obj :any= {
    orderNumber: this.orderNumber
  }
   this.http.get(obj,'/Consolidation/SelCountOfOpenTransactionsTemp').subscribe((res:any) => {
     if (res) {
      if (res.data == -1) {
        this.toast.error("An error has occurred","Error",  { positionClass: 'toast-bottom-right',timeOut: 2000});
    } else if (res.data == 0) {
        //call function to complete shipment
        this.completeShipment();
    } else {
        //for temp
        var otherconf = confirm("Back Orders exist for this order number. Still complete shipment?");
        if (otherconf) {
          this.completeShipment();
        };
    };
     }
   });
 }  
 async completeShipment(){
  var obj : any= {
    orderNumber: this.orderNumber ,
    userName: this.userData.userName,
    wsid: this.userData.wsid
  }
  this.http.get(obj,'/Consolidation/CompleteShipment').subscribe((res:any) => {
    if (res && res.isExecuted) {
       this.dialogRef.close(true);
    }else{
      this.toast.error("An error has occurred","Error",  { positionClass: 'toast-bottom-right',timeOut: 2000});
    }
  });
 }
}
