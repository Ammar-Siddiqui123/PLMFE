import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CmSplitLineComponent } from '../cm-split-line/cm-split-line.component';
import { ConsolidationManagerService } from 'src/app/consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cm-confirm-and-packing-process-transaction',
  templateUrl: './cm-confirm-and-packing-process-transaction.component.html',
  styleUrls: ['./cm-confirm-and-packing-process-transaction.component.scss']
})
export class CmConfirmAndPackingProcessTransactionComponent implements OnInit {
 

  displayedColumns: string[] = ['itemNumber', 'lineNumber', 'transactionQuantity', 'completedQuantity', 'shipQuantity' ];
confPackProcTable: any = [];
confPackTransTable: any = [];
orderNumber: any;
itemNumber: any;
contID: any;
id:  any;
userData:any = {};
IsSelectModal: boolean = false;
constructor(private dialog: MatDialog,private http:ConsolidationManagerService,private authService: AuthService,private toast:ToastrService,
  @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CmConfirmAndPackingProcessTransactionComponent>,) {
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
  this.http.get({id:this.id},'/Consolidation/ConfPackProcModal').subscribe((response:any) => { 
    this.confPackProcTable = response.data;  
  });
} 
async ItemLabelModal(){
  var  Id = this.confPackProcTable[0].sT_ID;   
}
openCmSplitLine() {
  let dialogRef = this.dialog.open(CmSplitLineComponent, {
    height: 'auto',
    width: '560px',
    autoFocus: '__non_existing_element__',
   
  })
  dialogRef.afterClosed().subscribe(result => {
    
    
  })
 }
async SplitLineProcModal(){
  // split modal open
}
async AdjustQauntModal(){
  // openAdjustQuant Modal
}
  //will update the desired record(s) and go thorugh confirm proccess
  async DoneModal(){
    var id = this.confPackProcTable[0].sT_ID;
    var obj : any = {
      id: id,
      orderNumber: this.orderNumber,
      containerID: this.contID,
      modal: "From_Modal",
      userName: this.userData.userName,
      wsid: this.userData.wsid
    };
   this.http.get(obj,'/Consolidation/ConfPackProcModalUpdate').subscribe((res:any) => {
    if (res.data == "Fail") {
      this.toast.error(  "An error has occurred",'Error!', { positionClass: 'toast-bottom-right',timeOut: 2000});
  } else {
      //edit table 
      var index = this.confPackTransTable.findIndex(x=>x.active == true);
      this.confPackTransTable[index].containerID = this.contID;
      this.confPackTransTable[index].complete = true;
      // this.confPackTransTable[index].invalidate() 
        var emit = '';
      if (this.confPackTransTable.length == 1) {
        emit = 'ConfirmedPacked';
      };
      this.dialogRef.close(emit);
  };
   });
  }
  
  ConfPackProcessModal(){
    this.dialogRef.close();
  } 
}
