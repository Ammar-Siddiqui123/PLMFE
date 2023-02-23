import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ReprocessTransactionDetailViewComponent } from '../reprocess-transaction-detail-view/reprocess-transaction-detail-view.component';
import { ProcessPutAwayService } from '../../../app/induction-manager/processPutAway.service';
import { ToastrService } from 'ngx-toastr';
import { UserFieldsComponent } from '../user-fields/user-fields.component';
import { TotesAddEditComponent } from '../totes-add-edit/totes-add-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cross-dock-transaction',
  templateUrl: './cross-dock-transaction.component.html',
  styleUrls: ['./cross-dock-transaction.component.scss']
})
export class CrossDockTransactionComponent implements OnInit {

  public itemWhse;
  public userId;
  public wsid;
  public warehouse;

  crossDock:any;
  transactions:any;

  public batchID;
  public zone;
  public description;

  public lowerBound=1;
  public upperBound=5;


  public selectedRow;
  public selectedRowObj;



  constructor(public router:Router,public dialogRef : MatDialogRef<CrossDockTransactionComponent>, private dialog: MatDialog , @Inject(MAT_DIALOG_DATA) public data: any, private service: ProcessPutAwayService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.itemWhse = this.data.itemWhse;
    this.userId = this.data.userId;
    this.wsid = this.data.wsid;
    this.warehouse = this.data.warehouse;

    this.batchID =  this.data.batchID;
    this.zone = this.data.zone;
    this.description =  this.data.description;

    this.getCrossDock();
  }

  selectTote(i:any)
  {
  this.openTotesDialogue(i);
  }

  openTotesDialogue(position:any) {
    const dialogRef = this.dialog.open(TotesAddEditComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data:
      {
        position: position
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      if(result.toteID!="")
      {
        // alert(result.toteID.toString());
        // alert(result.cellID.toString());
        // gfhgf


        this.transactions[position].toteID = result.toteID.toString();
        
      }

      }
    });



  }

  selectRow(i:any,t:any)
  {
    this.selectedRow = i;
    this.selectedRowObj = t;
    console.log(this.selectedRowObj);
  }

  leftClick()
  {
    this.lowerBound = (this.lowerBound-5)<=0?1:this.lowerBound-5;
    this.upperBound =  this.upperBound-5;
    if(this.upperBound<5){this.upperBound=5;}
    this.getCrossDock();
  }

  rightClick()
  { 
    this.lowerBound = this.upperBound+1;
    this.upperBound = (this.lowerBound+4)<=this.crossDock.numberRecords?(this.lowerBound+4):this.crossDock.numberRecords;
    this.getCrossDock();
  }

  getCrossDock()
  {
    this.itemWhse = "238562";
    let payLoad = {
      sRow: this.lowerBound,
      eRow: this.upperBound,
      itemWhse: [
        this.itemWhse,
        this.warehouse,
        "1=1"
      ],
      username: this.userId,
      wsid: this.wsid
    };
    
    this.service
      .get(payLoad, '/Induction/CrossDock')
      .subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) 
          {
            this.crossDock    = res.data;
            this.transactions = res.data.transaction;
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


  refresh()
  {
    this.getCrossDock();
  }

  openUserFieldsDialogue() {
    const dialogRef = this.dialog.open(UserFieldsComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__',
      data: this.selectedRowObj
    })
  }

  openReprocessTransactionViewDialogue() {
    const dialogRef = this.dialog.open(ReprocessTransactionDetailViewComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__'
    })
  }

  submit() {
    this.dialogRef.close("Submit");
  }

  viewOrderStatus(){
    console.log(this.selectedRowObj);
    this.router.navigate([]).then((result) => {   
          window.open(`/#/InductionManager/TransactionJournal?orderStatus=${this.selectedRowObj.orderNumber}`, '_blank');  
          });
  }
}
