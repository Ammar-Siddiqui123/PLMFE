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
  clearBatchTote: string = 'clearBatch';
  constructor(
    public dialogRef: MatDialogRef<BatchDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private service: ProcessPutAwayService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.toteID = this.data.toteId;
    this.batchID = this.data.batchId;
  }

  batchTotesDelete(deAllocate?) {
    var payLoad = {
      batch: this.clearBatchTote === 'clearBatch' ? true : false,
      toteID: this.toteID,
      batchID: this.batchID,
      transType: this.transType,
      deAllocate: deAllocate,
      pageFrom: '',
      wsid: this.data.wsid,
      username: this.data.userName,
    };
    const dialogRef = this.dialog.open(BatchDeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'deallocate_clear_batch',
        heading: deAllocate ? 'Clear & Deallocate Batch' : 'Clear Batch',
        message: deAllocate
          ? `Are you sure you want to Clear & Deallocate Batch: ${this.batchID} ?`
          : `Are you sure you want to Clear Batch: ${this.batchID} ?`,
        payload: payLoad,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res.isExecuted){
        this.dialogRef.close({isExecuted:true})
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
      console.log(res);
      

    });
  }
}
