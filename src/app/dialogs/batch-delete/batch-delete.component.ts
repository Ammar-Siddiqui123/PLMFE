import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';
import { BatchDeleteConfirmationComponent } from '../batch-delete-confirmation/batch-delete-confirmation.component';

@Component({
  selector: 'app-batch-delete',
  templateUrl: './batch-delete.component.html',
  styleUrls: ['./batch-delete.component.scss'],
})
export class BatchDeleteComponent implements OnInit {
  toteID = '';
  batchID = '';
  transType = 'Put Away';
  clearBatchTote: string = '';
  deleteAllDisable:any;
  enableClear=false;
  constructor(
    public dialogRef: MatDialogRef<BatchDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private service: ProcessPutAwayService
  ) {}

  ngOnInit(): void {
   
    this.toteID = this.data.toteId;
    this.batchID = this.data.batchId;
    this.deleteAllDisable=this.data.deleteAllDisable;
    this.clearBatchTote=this.data.deleteAllDisable?'clearTote':'clearBatch';
    this.enableClear=this.data && this.data.enableClear
  }

  batchTotesDelete(deAllocate?) {
    var payLoad = {
      batch: this.clearBatchTote === 'clearBatch' ? true : false,
      toteID: this.toteID,
      batchID: this.batchID,
      transType: this.transType,
      deAllocate: deAllocate,
      pageFrom: 'Process',
      wsid: this.data.wsid,
      username: this.data.userName,
    };

    const dialogRef = this.dialog.open(BatchDeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'deallocate_clear_batch',
        
        heading: deAllocate 
          ? `Clear & Deallocate ${this.clearBatchTote === 'clearBatch' ? 'Batch' : 'Tote'}` 
          : `Clear ${this.clearBatchTote === 'clearBatch' ? 'Batch' : 'Tote'}`,
        
          message: deAllocate
          ? `Are you sure you want to Clear & Deallocate ${this.clearBatchTote === 'clearBatch' ? `Batch: ${this.batchID} ?` : `Tote: ${this.toteID}`}`
          : `Are you sure you want to Clear ${this.clearBatchTote === 'clearBatch' ? `Batch: ${this.batchID} ?` : `Tote: ${this.toteID}`}`,
        payload: payLoad,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res.isExecuted){
        this.dialogRef.close({isExecuted : true, isDeleted : this.clearBatchTote === 'clearBatch' ? true : false})
      }else{
        return
      }
    });
  }

  allBatchDelete() {
    var payLoad = {

      wsid: this.data.wsid,
      username: this.data.userName,
    };
    const dialogRef = this.dialog.open(BatchDeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete_all_batch',
        heading:'Delete All Batches',
        message: 'Are you sure you want to Clear & Deallocate All Batches',
        payload: payLoad,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
       if(res.isExecuted) this.dialogRef.close({isDeleted:true})
    });
  }
}
