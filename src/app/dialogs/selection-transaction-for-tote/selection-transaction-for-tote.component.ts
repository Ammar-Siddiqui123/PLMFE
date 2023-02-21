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
    alert("ID:"+id+ " , Item Number: "+itemNumber);
  }

  getTransactions()
  {
    let getTransaction = {
      lowerBound: 1,
      upperBound: 5,
      input: [
        this.inputValue,
        this.inputType,
        "1=1"
      ],
      username: this.userName,
      wsid: this.wsid
    };
    this.service
      .get(getTransaction, '/Induction/TransactionForTote')
      .subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            this.transactionTable = res.data.transactionTable ;
            this.apiResponse = res.data;
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
      autoFocus: '__non_existing_element__'
    })
  }

}
