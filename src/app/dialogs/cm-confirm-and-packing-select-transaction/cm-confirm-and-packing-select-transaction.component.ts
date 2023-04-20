import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { CmConfirmAndPackingProcessTransactionComponent } from '../cm-confirm-and-packing-process-transaction/cm-confirm-and-packing-process-transaction.component';

@Component({
  selector: 'app-cm-confirm-and-packing-select-transaction',
  templateUrl: './cm-confirm-and-packing-select-transaction.component.html',
  styleUrls: ['./cm-confirm-and-packing-select-transaction.component.scss']
})
export class CmConfirmAndPackingSelectTransactionComponent implements OnInit {
 
 itemNumber: any;
 orderNumber: any;
  confPackSelectTable:any[] = [];

 displayedColumns: string[] = ['sT_ID','itemNumber', 'lineNumber','completedQuantity',   'transactionQuantity']; 
 dataSourceList:any
 userData:any = {}; 
 confPackTransTable:any;
 contID:any;
 id:any;
 constructor(private http:ConsolidationManagerService,private authService: AuthService,
  private toast:ToastrService,private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CmConfirmAndPackingSelectTransactionComponent>,) {
  this.userData = this.authService.userData();
  this.confPackTransTable = this.data.confPackTransTable;
  this.orderNumber = this.data.orderNumber;
  this.contID = this.data.contID;
  this.id = this.data.id;
  this.itemNumber = this.data.ItemNumber;
 } 

  ngOnInit(): void {
    this.ConfPackProc();
  }

  async ConfPackProc(){
    var Obj:any = { 
        "orderNumber": this.orderNumber,
        "itemNumber": "024768727870" 
    };
    this.http.get(Obj,'/Consolidation/ConfPackSelectDT').subscribe((response:any) => { 
      this.confPackSelectTable = response.data;  
    });
  } 
  
openScanItem(ItemNumber:any,id: any) {
  var index= this.confPackTransTable.findIndex(x=>x.sT_ID == id);
  this.confPackTransTable[index].active = true;
  let dialogRef = this.dialog.open(CmConfirmAndPackingProcessTransactionComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
    data: {ItemNumber:ItemNumber,orderNumber:this.orderNumber,contID:this.contID,confPackTransTable:this.confPackTransTable,id:id}
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result == 'ConfirmedPacked'){
      this.ConfPackProc();
    }  
  })
 }
  async ConfPackSelectTableClick(id){
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
       this.openScanItem(this.itemNumber,id);
       
     
    }else {
      //edit table
      for (var x = 0; x < this.confPackTransTable.length; x++) {
          var tabID = this.confPackTransTable[x].sT_ID;
          if (id == tabID) {
            // click active 
          };
      }; 
      //remove items from modal table here
      this.dialogRef.close('true');
  
   
  };
  });

}
 
}
