import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CpbBlossomToteComponent } from 'src/app/dialogs/cpb-blossom-tote/cpb-blossom-tote.component';
import { ShortTransactionComponent } from 'src/app/dialogs/short-transaction/short-transaction.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-complete-pick-batch',
  templateUrl: './complete-pick-batch.component.html',
  styleUrls: ['./complete-pick-batch.component.scss']
})
export class CompletePickBatchComponent implements OnInit {

  displayedColumns: string[] = ['order_no', 'tote_id', 'item_number', 'description', 'transaction_qty', 'location', 'zone','carousel','row','shelf','bin', 'action'];
  tableData: any = [];
  dataSourceList: any;

  batchId: string = "";
  toteId: string = "";
  showToteCol: boolean = false;
  completeBatchEnable: boolean = false;
  blossomToteEnable: boolean = false;

  constructor(
    private dialog: MatDialog,
    private Api: ApiFuntions,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  BatchPickIDKeyup(event: any) {
    this.showToteCol = false;
    this.toteId = "";
    if (event.keyCode === 13 && this.batchId != "") {
      this.pickBatchTransactionTable();
    }
  }

  ToteIDKeyup(event: any) {
    if (event.keyCode === 13 && this.toteId != "") {
      this.pickBatchTransactionTable();
    }
  }

  pickBatchTransactionTable() {
    let payload: any = {
      ToteID: this.toteId,
      StartRow: 1,
      EndRow: 10,
      SortColumn: 1,
      SortOrder: "asc"
    };
    if(this.batchId != ""){
      payload.BatchID = this.batchId;
    }
    this.Api.getPickBatchTransactionTable(payload).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data;
        this.blossomToteEnable = false;
        this.showToteCol = false;
        if (res.data.length > 0) {
          this.showToteCol = true;
          this.completeBatchEnable = true;
          if (this.toteId != "") {
            this.blossomToteEnable = true;
          }
          // else{
          //   $('#ToteID').focus();
          // }
        }
        else {
          if (this.batchId != "" && this.toteId == "") {
            this.toastr.error("No open transactions for the entered batch", 'No Rows', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
          else if (this.batchId != "" && this.toteId != "") {
            this.toastr.error("No open transaction for that tote in the batch", 'No Rows', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.toteId = "";
            this.BatchPickIDKeyup({ keyCode: 13 });
          }
          this.completeBatchEnable = false;
        }
      }
    });
  }

  clearScreen() {
    this.batchId = "";
    this.toteId = "";
    this.showToteCol = false;
    this.blossomToteEnable = false;
    this.completeBatchEnable = false;
    this.pickBatchTransactionTable();
  }

  ShortTransactionDialogue(element:any) {
    const dialogRef = this.dialog.open(ShortTransactionComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
      data: {
        selectedTransaction: element,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pickBatchTransactionTable();
      }
    });
  }

  CpbBlossomToteDialogue() {
    const dialogRef = this.dialog.open(CpbBlossomToteComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
      data: {
        transactions: this.tableData,
        toteId : this.toteId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toteId = result;
        this.pickBatchTransactionTable();
      }
    });
  }

  CompleteTransaction(element:any){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        heading: 'Complete Transaction',
        message: 'Complete this transaction?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        this.Api.completeTransaction({Id:element.id}).subscribe((res: any) => {
          if(res.isExecuted){
            this.pickBatchTransactionTable();
          }
          else{
            this.toastr.error("An error occured completing this transaction", 'Error', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
    });
  }

  CompleteBatch(){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        heading: 'Complete Batch',
        message: 'Complete all remaining in this batch?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        this.Api.completePickBatch({batchId:this.batchId}).subscribe((res: any) => {
          if(res.isExecuted){
            this.clearScreen();
          }
          else{
            this.toastr.error("An error occured completing this transaction", 'Error', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
    });
  }

}
