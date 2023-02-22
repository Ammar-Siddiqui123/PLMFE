import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ReprocessTransactionDetailViewComponent } from '../reprocess-transaction-detail-view/reprocess-transaction-detail-view.component';
import { ProcessPutAwayService } from '../../../app/induction-manager/processPutAway.service';
import { ToastrService } from 'ngx-toastr';

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



  constructor(private dialog: MatDialog , @Inject(MAT_DIALOG_DATA) public data: any, private service: ProcessPutAwayService,private toastr: ToastrService,) { }

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

  leftClick()
  {
    this.lowerBound = (this.lowerBound-5)<=0?1:this.lowerBound-5;
    this.upperBound =  this.upperBound-5;
    this.getCrossDock();
  }

  rightClick()
  { 
    this.lowerBound = this.upperBound+1;
    this.upperBound = (this.lowerBound+4)<=this.crossDock.numberOfRecords?(this.lowerBound+4):this.crossDock.numberOfRecords;
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
    }
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

  openReprocessTransactionViewDialogue() {
    const dialogRef = this.dialog.open(ReprocessTransactionDetailViewComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__'
    })
  }
}
