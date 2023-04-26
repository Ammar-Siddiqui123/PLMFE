import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CmConfirmAndPackingProcessTransactionComponent } from '../cm-confirm-and-packing-process-transaction/cm-confirm-and-packing-process-transaction.component';
import { CmConfirmAndPackingSelectTransactionComponent } from '../cm-confirm-and-packing-select-transaction/cm-confirm-and-packing-select-transaction.component';

@Component({
  selector: 'app-cm-confirm-and-packing',
  templateUrl: './cm-confirm-and-packing.component.html',
  styleUrls: ['./cm-confirm-and-packing.component.scss']
})
export class CmConfirmAndPackingComponent implements OnInit {
  orderNumber:any = "2909782A";
  toteTable:any[]=[];
  ItemNumber:any;
  transTable:any[]=[];
  OldtransTable:any[]=[];
  contIDDrop:any[]=[];
  confPackEnable:any; 
  IsLoading:boolean = false;
  contID:any; 
  reasons:any[]=[];
  shipComp:any;
  PrintPrefs:any={}; 
  IsDisabled:boolean  = false;
 displayedColumns: string[] = ['toteID', 'stagingLocation']; 
userData:any={};
displayedColumns_1: string[] = ['sT_ID','itemNumber', 'lineNumber',   'transactionQuantity', 'completedQuantity', 'containerID',
 'shipQuantity', 'complete']; 
  constructor(private http:ConsolidationManagerService,private authService: AuthService,private toast:ToastrService,private dialog: MatDialog) { 
    this.userData = this.authService.userData();
  }

  ngOnInit(): void {
    this.IsLoading = true;
   this.ConfirmAndPackingIndex()
  }
  async NextContID(){ 
  if (this.contID == '') {
    this.toast.error("An error has occurred",'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});
}  
}

async UnPack(id:any){  
  this.http.get({id:id},'/Consolidation/ShipTransUnPackUpdate').subscribe((res:any) => {
    if (res.data == "Fail") {
      this.toast.error("An error has occurred", 'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});  
  } else {  
     var index =  this.transTable.findIndex(x=>x.sT_ID == id);
     this.transTable[index].containerID = '';
     this.transTable[index].complete = false;
      // this.transTable[0].invalidate();
  };
  });
 
}
 
 
ConfirmAndPackingIndex(){ 
  var obj : any = {
    orderNumber: this.orderNumber,
    username: this.userData.userName,
    wsid: this.userData.wsid, 
  };
 this.http.get(obj,'/Consolidation/ConfirmAndPackingIndex').subscribe((res:any) => {
  debugger
  this.toteTable = res.data.confPackToteTable;
  this.orderNumber = res.data.orderNumber;
  this.transTable = res.data.confPackShipTransTable;
  this.contIDDrop = res.data.confPackContIDDrop;
  this.confPackEnable = res.data.confPackEnable;
  this.contID = res.data.contIDConfirmPack;
  this.reasons = res.data.adjustmentReason;
  this.shipComp = res.data.confPackShipComp;
  this.PrintPrefs = res.data.confPackPrintPrefs; 
  this.IsLoading = false;
});
}
async ClickConfirmAll(){
  var conf = confirm("Confirm All transactions? This will mark this entire order as confirmed and packed.");
  if (conf) {
    var obj : any = {
      scanned: this.contID,
      username: this.userData.userName,
      wsid: this.userData.wsid, 
    };
   this.http.get(obj,'/Consolidation/ConfPackScanItemNum').subscribe((res:any) => {
    if (res.data == "Fail") {
      this.toast.error('An error has occurred', 'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000}); 
  } else { 
      location.reload();
    }
  });
  }
} 
openScanItem(ItemNumber:any,id: any) {
  var index= this.transTable.findIndex(x=>x.sT_ID == id);
  this.transTable[index].active = true;
  let dialogRef = this.dialog.open(CmConfirmAndPackingProcessTransactionComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
    data: {ItemNumber:ItemNumber,orderNumber:this.orderNumber,contID:this.contID,confPackTransTable:this.transTable,id:id}
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'ConfirmedPacked'){
      this.ConfirmedPacked();
    }  
  })
 }
 openSelectTransaction(ItemNumber:any,id: any) {
  var index= this.transTable.findIndex(x=>x.sT_ID == id);
  this.transTable[index].active = true;
  let dialogRef = this.dialog.open(CmConfirmAndPackingSelectTransactionComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
    data: {ItemNumber:ItemNumber,orderNumber:this.orderNumber,contID:this.contID,confPackTransTable:this.transTable,id:id}
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'true'){
      this.transTable[index].containerID = this.contID;
      this.transTable[index].complete = true; 
    }  
  })
 }
 ItemKeyUp(){
  setTimeout(() => {
    if(this.OldtransTable.length > 0){
      this.transTable = this.OldtransTable.filter(x=>  x.itemNumber.indexOf(this.ItemNumber) > -1);  
    }else{
      this.OldtransTable = this.transTable;
      this.transTable = this.transTable.filter(x=>  x.itemNumber.indexOf(this.ItemNumber) > -1);  
    }
  }, 10);
 }
async ScanItemNum($event:any){ 
  debugger   
  if($event.key == "Enter"){
  var index;
var searchCount = 0;
var id;
var contID;
for (var x = 0; x < this.transTable.length; x++) {
    var itemNum = this.transTable[x].itemNumber;
    var complete = this.transTable[x].complete;
    if (this.ItemNumber.toLowerCase() == itemNum.toLowerCase() && complete==false) {
        searchCount += 1;
        id = this.transTable[x].sT_ID;
        index = x;
    };
};
 
if(searchCount == 0){ 
  this.toast.error("The desired item number was not found or is already confirmed and packed",'Item Number Issue', { positionClass: 'toast-bottom-right',timeOut: 2000}); 
} else if (searchCount == 1) {
  var obj : any = {
    id: id,
    orderNumber: this.orderNumber,
    containerID: this.contID,
    modal: "",
    userName: this.userData.userName,
    wsid: this.userData.wsid
  };
 this.http.get(obj,'/Consolidation/ConfPackProcModalUpdate').subscribe((res:any) => {
  
  if (res.data == "Fail") {
    this.toast.error('An error has occurred', 'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});  
} else if (res.data == "Modal") {
    //show modal here
  this.openScanItem($event.target.value,id);
   
 
} else {
  var index =  this.transTable.findIndex(x=>x.itemNumber == $event.target.value);
  // this.transTable[index].containerID = this.contID;
  // this.transTable[index].complete = true;
  // this.transTable[index].sT_ID.invalidate(); 
    if (this.transTable.length == 1) {
        this.ConfirmedPacked();
    };
};
 });
  }else {
   this.openSelectTransaction($event.target.value,id);
};
}
}
async ConfirmedPacked() {
  this.IsDisabled = true; 
  this.contID = null;
};
}
