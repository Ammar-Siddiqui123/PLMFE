import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { AuthService } from 'src/app/init/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CmConfirmAndPackingProcessTransactionComponent } from '../cm-confirm-and-packing-process-transaction/cm-confirm-and-packing-process-transaction.component';
import { CmConfirmAndPackingSelectTransactionComponent } from '../cm-confirm-and-packing-select-transaction/cm-confirm-and-packing-select-transaction.component';
import { contains } from 'jquery';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cm-confirm-and-packing',
  templateUrl: './cm-confirm-and-packing.component.html',
  styleUrls: ['./cm-confirm-and-packing.component.scss']
})
export class CmConfirmAndPackingComponent implements OnInit {
  @ViewChild('order_focus') order_focus: ElementRef;
  orderNumber:any ;
  toteTable:any;
  ItemNumber:any;
  transTable:any;
  OldtransTable:any;
  contIDDrop:any[]=[];
  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild('MatSort2') sort2: MatSort;
  confPackEnable:any; 
  IsLoading:boolean = false;
  contID:any; 
  reasons:any[]=[];
  shipComp:any;
  PrintPrefs:any={}; 
  IsDisabled:boolean  = false;
 displayedColumns: string[] = ['toteID', 'stagingLocation']; 
userData:any={}; 
@ViewChild('paginator1') paginator1: MatPaginator;
@ViewChild('paginator2') paginator2: MatPaginator;
displayedColumns_1: string[] = ['sT_ID','itemNumber', 'lineNumber',   'transactionQuantity', 'completedQuantity', 'containerID',
 'shipQuantity', 'complete']; 
  constructor(private Api:ApiFuntions,public authService: AuthService,private toast:ToastrService,private dialog: MatDialog,
    public route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,private _liveAnnouncer: LiveAnnouncer,
    public dialogRef: MatDialogRef<any>) { 
    this.userData = this.authService.userData();
   
    this.orderNumber = this.data.orderNumber;
  }

  ngOnInit(): void {
    this.IsLoading = true;
    this.toteTable = []; 
    this.transTable = [];
    this.contIDDrop = [];
    this.confPackEnable = null;
    this.contID = null;
    this.reasons = [];
    this.shipComp = null;
    this.PrintPrefs = {};  
      this.ConfirmAndPackingIndex(); 
   
  }
  ngAfterViewInit(): void {
    this.order_focus.nativeElement.focus();
  }
  async NextContID(){ 
    var obj : any = {
      orderNumber: this.orderNumber,
      username: this.userData.userName,
      wsid: this.userData.wsid, 
    };
   this.Api.SelContIDConfirmPack(obj).subscribe((res:any) => { 
    if(res.data == ''){
      this.toast.error("An error has occurred",'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});
    }else this.contID = res.data;
   });
}


async UnPack(id:any){  
  this.Api.ShipTransUnPackUpdate({id:id}).subscribe((res:any) => {
    if (res.data == "Fail") {
      this.toast.error("An error has occurred", 'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});  
  } else {  
     var index =  this.transTable.filteredData.findIndex(x=>x.sT_ID == id);
     this.transTable.filteredData[index].containerID = '';
     this.transTable.filteredData[index].complete = false; 
  };
  });
 
}
 
 
ConfirmAndPackingIndex(){ 


if(this.orderNumber != ""){
  var obj : any = {
    orderNumber: this.orderNumber,
    username: this.userData.userName,
    wsid: this.userData.wsid, 
  };
 this.Api.ConfirmAndPackingIndex(obj).subscribe((res:any) => { 
  
  this.orderNumber = res.data.orderNumber;

  this.contIDDrop = res.data.confPackContIDDrop;
  this.confPackEnable = res.data.confPackEnable;
  this.contID = res.data.contIDConfirmPack;
 
  this.reasons = res.data.adjustmentReason;
  this.shipComp = res.data.confPackShipComp;
  this.PrintPrefs = res.data.confPackPrintPrefs; 
  this.IsLoading = false; 
  this.toteTable =  new MatTableDataSource(res.data.confPackToteTable);
  this.transTable =  new MatTableDataSource(res.data.confPackShipTransTable);
  this.toteTable.paginator = this.paginator1;
  this.transTable.paginator = this.paginator2;
});
}
}
async ClickConfirmAll(){
  let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    height: 'auto',
    width: '560px',
    autoFocus: '__non_existing_element__',
      disableClose:true,
    data: {
      message: "Confirm All transactions? This will mark this entire order as confirmed and packed.",
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result == 'Yes') { 
    var obj : any = {
      orderNumber:this.orderNumber,
      containerID: this.contID,
      username: this.userData.userName,
      wsid: this.userData.wsid, 
    };
   this.Api.ConfirmAllConfPack(obj).subscribe((res:any) => {
    if (res.data == "Fail") {
      this.toast.error('An error has occurred', 'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000}); 
  } else { 
    this.ConfirmAndPackingIndex(); 
    }
  });
}
});
  
} 
openScanItem(ItemNumber:any,id: any) {
  var index= this.transTable.filteredData.findIndex(x=>x.sT_ID == id);
  this.transTable.filteredData[index].active = true; 
  let dialogRef = this.dialog.open(CmConfirmAndPackingProcessTransactionComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
      disableClose:true,
    data: {ItemNumber:ItemNumber,orderNumber:this.orderNumber,contID:this.contID,confPackTransTable:this.transTable,id:id,reasons:this.reasons}
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'ConfirmedPacked'){
     // this.ConfirmedPacked();
    }  
  })
 }
 
announceSortChange1(sortState: Sort) {  
  if (sortState.direction) {
    // Announce the sort direction, and the fact that sorting is cleared.
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }

  // Set the data source's sort property to the new sort.
  this.toteTable.sort = this.sort1;

  // this.toteTable.filteredData =  this.toteTable.filteredData.sort((a, b) => {
  //   if(sortState.direction == 'asc') {
  //     return a[sortState.active] - b[sortState.active];
  //   }
  //   else {
  //     return b[sortState.active] - a[sortState.active];
  //   }
  // }); 
}
announceSortChange2(sortState: Sort) {    
  if (sortState.direction) {
    // Announce the sort direction, and the fact that sorting is cleared.
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }

  // Set the data source's sort property to the new sort.
  this.transTable.sort = this.sort2; 
  // this.transTable.filteredData = this.transTable.filteredData.sort((a, b) => {
  //   if(sortState.direction == 'asc') {
  //     return a[sortState.active] - b[sortState.active];
  //   }
  //   else {
  //     return b[sortState.active] - a[sortState.active];
  //   }
  // }); 
}

 openSelectTransaction(ItemNumber:any,id: any) {
  var index= this.transTable.filteredData.findIndex(x=>x.sT_ID == id);
  this.transTable.filteredData[index].active = true;
  let dialogRef = this.dialog.open(CmConfirmAndPackingSelectTransactionComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
      disableClose:true,
    data: {ItemNumber:ItemNumber,orderNumber:this.orderNumber,contID:this.contID,confPackTransTable:this.transTable,id:id}
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'true'){
      this.transTable.filteredData[index].containerID = this.contID;
      this.transTable.filteredData[index].complete = true; 
    }  
  })
 }
 ItemKeyUp(){
  setTimeout(() => {
    if(this.OldtransTable?.filteredData && this.OldtransTable?.filteredData?.length > 0){
      this.transTable = new MatTableDataSource(this.OldtransTable.filteredData.filter(x=>  x.itemNumber.indexOf(this.ItemNumber) > -1));  
    }else{
      this.OldtransTable = this.transTable;
      this.transTable = new MatTableDataSource(this.transTable.filteredData.filter(x=>  x.itemNumber.indexOf(this.ItemNumber) > -1));  
    }
  }, 10);
 }
async ScanItemNum($event:any){  
  if($event.key == "Enter"){ 
  var index;
var searchCount = 0;
var id;
var contID;
for (var x = 0; x < this.transTable.filteredData.length; x++) {
    var itemNum = this.transTable.filteredData[x].itemNumber;
    var complete = this.transTable.filteredData[x].complete;
    if (this.ItemNumber.toLowerCase() == itemNum.toLowerCase() && complete==false) {
        searchCount += 1;
        id = this.transTable.filteredData[x].sT_ID;
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
 this.Api.ConfPackProcModalUpdate(obj).subscribe((res:any) => {
   
  if (res.data == "Fail") {
    this.toast.error('An error has occurred', 'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});  
} else if (res.data == "Modal") {
    //show modal here
  this.openScanItem($event.target.value,id);  
} else {  
  var index =  this.transTable.filteredData.findIndex(x=>x.sT_ID == id);
  this.transTable.filteredData[index].containerID = this.contID;
  this.transTable.filteredData[index].complete = true; 
    if (this.OldtransTable.filteredData.length == 1) {
        // this.ConfirmedPacked();
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

printPackList(){
  window.open(`/#/report-view?file=FileName:PrintConfPackPackList|OrderNum:${this.orderNumber}`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
  // this.dialogRef.close();
  // window.location.href = `/#/report-view?file=FileName:PrintConfPackPackList|OrderNum:${this.orderNumber}`;
  // window.location.reload();
}

print(type:any){
  if(type == 'list'){
    window.open(`/#/report-view?file=FileName:PrintConfPackPrintCont|OrderNum:${this.orderNumber}|ContID:${this.contID}`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
    // this.dialogRef.close();
    // window.location.href = `/#/report-view?file=FileName:PrintConfPackPrintCont|OrderNum:${this.orderNumber}|ContID:${this.contID}`;
    // window.location.reload();
  }
  else if (type == 'label'){
    window.open(`/#/report-view?file=FileName:PrintConfPackLabel|OrderNum:${this.orderNumber}|ContID:${this.contID}`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
    // this.dialogRef.close();
    // window.location.href = `/#/report-view?file=FileName:PrintConfPackLabel|OrderNum:${this.orderNumber}|ContID:${this.contID}`;
    // window.location.reload();
  }
  else{
    window.open(`/#/report-view?file=FileName:PrintConfPackPrintCont|OrderNum:${this.orderNumber}|ContID:${this.contID}`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
    window.open(`/#/report-view?file=FileName:PrintConfPackLabel|OrderNum:${this.orderNumber}|ContID:${this.contID}`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
    // window.location.href = `/#/report-view?file=FileName:PrintConfPackPrintCont|OrderNum:${this.orderNumber}|ContID:${this.contID}`;
    // window.location.href = `/#/report-view?file=FileName:PrintConfPackLabel|OrderNum:${this.orderNumber}|ContID:${this.contID}`;
    // window.location.reload();
  }
}

itemLabel(element:any){
  window.open(`/#/report-view?file=FileName:PrintConfPackItemLabel|OrderNum:${this.orderNumber}|ST_ID:${element.sT_ID}`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
  // this.dialogRef.close();
  // window.location.href = `/#/report-view?file=FileName:PrintConfPackItemLabel|OrderNum:${this.orderNumber}|ST_ID:${element.sT_ID}`;
  // window.location.reload();
}

}

