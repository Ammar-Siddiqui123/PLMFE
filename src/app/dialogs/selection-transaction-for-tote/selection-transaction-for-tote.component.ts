import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectionTransactionForToteExtendComponent } from '../selection-transaction-for-tote-extend/selection-transaction-for-tote-extend.component';
import { ToastrService } from 'ngx-toastr';
import { ProcessPutAwayService } from '../../../app/induction-manager/processPutAway.service';

@Component({
  selector: 'app-selection-transaction-for-tote',
  templateUrl: './selection-transaction-for-tote.component.html',
  styleUrls: ['./selection-transaction-for-tote.component.scss']
})
export class SelectionTransactionForToteComponent implements OnInit {
  public userData;
  public apiResponse;
  public transactionTable;
  public inputType;
  public inputValue;
  public userName;
  public wsid;
  public zone;
  public batchID;
  public itemNumber;
  public description;

  public lowerBound=1;
  public upperBound=5;



  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<SelectionTransactionForToteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service: ProcessPutAwayService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.inputType  =  this.data.inputType;
    this.inputValue =  this.data.inputValue; 
    this.userName   =  this.data.userName;
    this.wsid       =  this.data.wsid;
    this.zone       =  this.data.zones;
    this.batchID    =  this.data.batchID
    this.getTransactions();

  }

  refresh()
  {
    this.getTransactions();
  }

  selectOrder(id:any,itemNumber:any)
  {
    const dialogRef = this.dialog.open(SelectionTransactionForToteExtendComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__',
      data: {
        otid        : id,
        itemNumber  : itemNumber,
        zones       : this.data.zones,
        batchID     : this.data.batchID,
        totes       : this.data.totes
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.dialogRef.close(res);
    });
  }

  rightClick()
  { 
    this.lowerBound = this.upperBound+1;
    this.upperBound = (this.lowerBound+4)<=this.apiResponse.numberOfRecords?(this.lowerBound+4):this.apiResponse.numberOfRecords;
    this.getTransactions();
  }

  leftClick()
  {
    this.lowerBound = (this.lowerBound-5)<=0?1:this.lowerBound-5;
    this.upperBound =  this.upperBound-5;
    this.getTransactions();
  }

  getTransactions()
  {
    let getTransaction = {
      lowerBound: this.lowerBound,
      upperBound: this.upperBound,
      input: [
        this.inputValue,
        this.inputType,
        "1=1"
      ],
      username: this.userName,
      wsid: this.wsid
    };
    console.log(getTransaction);
    this.service
      .get(getTransaction, '/Induction/TransactionForTote')
      .subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            this.transactionTable = res.data.transactionTable;
            if (!res.data.transactionTable || res.data.transactionTable.length == 0) {
              this.dialogRef.close("NO");
            }
            this.apiResponse = res.data;
            this.apiResponse.numberOfRecords=10;//remove
            this.itemNumber = this.apiResponse.itemNumber;
            this.description = this.apiResponse.description;
          } else {
            this.toastr.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => {}
      );
  }

  openSelectionExtendDialogue() {
    const dialogRef = this.dialog.open(SelectionTransactionForToteExtendComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__',
      data: {
        otid        : '',
        itemNumber  : this.itemNumber,
        zones       : this.data.zones,
        batchID     : this.data.batchID,
        totes       : this.data.totes
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.dialogRef.close(res);
    });
  }

}
