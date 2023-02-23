import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReprocessTransactionDetailViewComponent } from '../reprocess-transaction-detail-view/reprocess-transaction-detail-view.component';
import { ProcessPutAwayService } from '../../../app/induction-manager/processPutAway.service';
import { ToastrService } from 'ngx-toastr';
import { UserFieldsComponent } from '../user-fields/user-fields.component';
import { TotesAddEditComponent } from '../totes-add-edit/totes-add-edit.component';
import { UserFieldsEditComponent } from '../../../app/admin/dialogs/user-fields-edit/user-fields-edit.component';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ConfirmationDialogComponent } from '../../../app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';

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

  crossDock: any;
  transactions: any;

  public batchID;
  public zone;
  public description;

  public lowerBound = 1;
  public upperBound = 5;


  public selectedRow;
  public selectedRowObj;
  public nxtToteID;
  public toteID;
  public loopIndex = -1;
  @ViewChild('openAction') openAction: MatSelect;



  constructor(public router: Router, public dialogRef: MatDialogRef<CrossDockTransactionComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private service: ProcessPutAwayService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.itemWhse = this.data.itemWhse;
    this.userId = this.data.userId;
    this.wsid = this.data.wsid;
    this.warehouse = this.data.warehouse;

    this.batchID = this.data.batchID;
    this.zone = this.data.zone;
    this.description = this.data.description;

    this.getCrossDock();
  }

  selectTote(i: any) {
    this.openTotesDialogue(i);
  }

  clearMatSelectList(){
    this.openAction.options.forEach((data: MatOption) => data.deselect());
  }

  openTotesDialogue(position: any) {
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
      if (result) {
        if (result.toteID != "") {
          // alert(result.toteID.toString());
          // alert(result.cellID.toString());
          // gfhgf


          this.transactions[position].toteID = result.toteID.toString();

        }

      }
    });



  }

  selectRow(i: any, t: any) {
    this.loopIndex = i;
    this.selectedRow = i;
    this.selectedRowObj = t;
    console.log(this.selectedRowObj);
  }

  leftClick() {
    this.lowerBound = (this.lowerBound - 5) <= 0 ? 1 : this.lowerBound - 5;
    this.upperBound = this.upperBound - 5;
    if (this.upperBound < 5) { this.upperBound = 5; }
    this.getCrossDock();
  }

  rightClick() {
    this.lowerBound = this.upperBound + 1;
    this.upperBound = (this.lowerBound + 4) <= this.crossDock.numberRecords ? (this.lowerBound + 4) : this.crossDock.numberRecords;
    this.getCrossDock();
  }

  getCrossDock() {
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
          if (res.data && res.isExecuted) {
            this.crossDock = res.data;
            this.transactions = res.data.transaction;
          } else {
            this.toastr.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => { }
      );
  }


  refresh() {
    this.getCrossDock();
  }

  openUserFieldsDialogue() {
    // console.log(this.selectedRowObj);
    if (this.selectedRowObj) {
      const dialogRef = this.dialog.open(UserFieldsComponent, {
        height: 'auto',
        width: '70vw',
        autoFocus: '__non_existing_element__',
        data: this.selectedRowObj
      })
      dialogRef.afterClosed().subscribe((res) => {
        this.selectedRowObj.userField1 = res.userField1
        this.selectedRowObj.userField2 = res.userField2
        this.selectedRowObj.userField3 = res.userField3
        this.selectedRowObj.userField4 = res.userField4
        this.selectedRowObj.userField5 = res.userField5
        this.selectedRowObj.userField6 = res.userField6
        this.selectedRowObj.userField7 = res.userField7
        this.selectedRowObj.userField8 = res.userField8
        this.selectedRowObj.userField9 = res.userField9
        this.selectedRowObj.userField10 = res.userField10

        this.clearMatSelectList()

      });
    }
    
  }
  // openUserFieldsEditDialogue() {
  //   const dialogRef = this.dialog.open(UserFieldsEditComponent, {
  //     height: 'auto',
  //     width: '800px',
  //     autoFocus: '__non_existing_element__',
  //     data: {
  //       transID: this.selectedRowObj.id,
  //       username: this.userId,
  //       wsid: this.wsid
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((res) => {
  //     // this.clearMatSelectList();
  //     if (res.isExecuted) {
  //     }
  //     console.log(res);
  //   });
  // }

  getNxtToteIds() {
    let paylaod = {
      username: this.userId,
      wsid: this.wsid
    }
    if (this.loopIndex >= 0) {
      this.service.get(paylaod, '/Induction/NextTote').subscribe(res => {
        this.transactions[this.loopIndex].toteID = res.data;
        this.nxtToteID = ++res.data;
        this.updateNxtTote();
        this.clearMatSelectList()
      });
    }
    else{
      this.toastr.error('Order must be selected.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.clearMatSelectList()
    }

  }

  updateNxtTote() {
    let updatePayload = {
      "tote": this.nxtToteID,
      username: this.userId,
      wsid: this.wsid
    }
    this.service.update(updatePayload, '/Induction/NextToteUpdate').subscribe(res => {
      if (!res.isExecuted) {
        this.toastr.error('Something is wrong.', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }

    });
  }

  openReprocessTransactionViewDialogue() {
    const dialogRef = this.dialog.open(ReprocessTransactionDetailViewComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__',
      data:{
        itemID:this.itemWhse
      }
    })
    dialogRef.afterClosed().subscribe((res) => {
      this.clearMatSelectList()
    })
  }

  submit() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        message: 'Click OK to proceed without a tote ID. Click Cancel to provide a tote ID.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        this.dialogRef.close("Submit");
      }
    });
  }

  viewOrderStatus() {
    // console.log(this.selectedRowObj);
    this.clearMatSelectList()
    this.router.navigate([]).then((result) => {
      window.open(`/#/InductionManager/TransactionJournal?orderStatus=${this.selectedRowObj.orderNumber}`, '_blank');
    });
  }
}
