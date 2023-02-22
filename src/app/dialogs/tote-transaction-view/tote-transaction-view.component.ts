import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';
import { AlertConfirmationComponent } from '../alert-confirmation/alert-confirmation.component';
import { BatchDeleteComponent } from '../batch-delete/batch-delete.component';
import { MarkToteFullComponent } from '../mark-tote-full/mark-tote-full.component';
import labels from '../../labels/labels.json';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-tote-transaction-view',
  templateUrl: './tote-transaction-view.component.html',
  styleUrls: ['./tote-transaction-view.component.scss'],
})
export class ToteTransactionViewComponent implements OnInit {

  public dummy_data={
    "data": [
        {
            "id": 13328205,
            "cell": "",
            "itemNumber": "024768586491",
            "transactionQuantity": 1,
            "itemLocation": " 08 1 02 02 B1",
            "hostTransactionID": "",
            "rn": 1
        },
        {
            "id": 13328230,
            "cell": "",
            "itemNumber": "024768578274",
            "transactionQuantity": 1,
            "itemLocation": " 08 2 09 05 A1",
            "hostTransactionID": "024768971587",
            "rn": 2
        },
        {
            "id": 13333599,
            "cell": "",
            "itemNumber": "024768767715",
            "transactionQuantity": 1,
            "itemLocation": " 08 1 32 06 A1",
            "hostTransactionID": "",
            "rn": 3
        },
        {
            "id": 13347897,
            "cell": "",
            "itemNumber": "024768765629",
            "transactionQuantity": 1,
            "itemLocation": " 08 1 14 03 A1",
            "hostTransactionID": "",
            "rn": 4
        },
        {
            "id": 13347899,
            "cell": "",
            "itemNumber": "024768765629",
            "transactionQuantity": 1,
            "itemLocation": " 08 1 14 03 A1",
            "hostTransactionID": "",
            "rn": 5
        },
        {
            "id": 13362573,
            "cell": "",
            "itemNumber": "024768751165",
            "transactionQuantity": 1,
            "itemLocation": " 08 1 11 05 A1",
            "hostTransactionID": "",
            "rn": 6
        },
        {
            "id": 13362710,
            "cell": "",
            "itemNumber": "024768751165",
            "transactionQuantity": 1,
            "itemLocation": " 08 1 11 05 A1",
            "hostTransactionID": "",
            "rn": 7
        },
        {
            "id": 13362718,
            "cell": "",
            "itemNumber": "024768961076",
            "transactionQuantity": 3,
            "itemLocation": " 08 1 13 02 C1",
            "hostTransactionID": "",
            "rn": 8
        },
        {
            "id": 13366460,
            "cell": "",
            "itemNumber": "024768586514",
            "transactionQuantity": 1,
            "itemLocation": " 08 2 43 06 A1",
            "hostTransactionID": "",
            "rn": 9
        },
        {
            "id": 13366570,
            "cell": "",
            "itemNumber": "024768189791",
            "transactionQuantity": 1,
            "itemLocation": " 08 1 17 02 C1",
            "hostTransactionID": "",
            "rn": 10
        }
    ],
    "responseMessage": "Data Available",
    "isExecuted": true
  }
  
  batchID: any;
  tote: any;
  toteID: any;
  selectedOption: any;
  cell:any;
  isData:any;
  @ViewChild('actionRef') actionRef: MatSelect;
  pageEvent: PageEvent;
  public sortCol:any=0;
  public sortOrder:any='asc';
  customPagination: any = {
    total: '',
    recordsPerPage: 10,
    startIndex: 1,
    endIndex: 10,
  };
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private service: ProcessPutAwayService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.batchID = this.data.batchID;
    this.tote = this.data.tote;
    this.toteID = this.data.toteID;
    this.cell=this.data.cell;
    this.getTransactionTable();
  }

  
  displayedColumns: string[] = [
    'cell',
    'itemNumber',
    'transactionQuantity',
    'itemLocation',
    'hostTransactionID',
    'other',
  ];
  dataSource:any;

  clearMatSelectList() {
    this.actionRef.options.forEach((data: MatOption) => data.deselect());
  }

  sortChange(event) {
    if (!this.dataSource._data._value || event.direction=='' || event.direction==this.sortOrder) return;
    let index;
    this.displayedColumns.find((x, i) => {
      if (x === event.active) {
        index = i;
      }
    });

    this.sortCol = index;
    this.sortOrder = event.direction;
    this.getTransactionTable();
    // this.getContentData();
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.customPagination.startIndex =  e.pageIndex
    this.customPagination.startIndex = e.pageSize * e.pageIndex;

    this.customPagination.endIndex = e.pageSize * e.pageIndex + e.pageSize;
    // this.length = e.length;
    this.customPagination.recordsPerPage = e.pageSize;
    // this.pageIndex = e.pageIndex;

    // this.initializeApi();
    this.getTransactionTable();
  }
  getTransactionTable() {
    let payLoad = {
      toteNumber: this.toteID,
      batchID: this.batchID,
      sRow:  this.customPagination.startIndex,
      eRow: this.customPagination.endIndex,
      sortColumn: this.sortCol,
      sortOrder: this.sortOrder,
      username: this.data.userName,
      wsid: this.data.wsid,
    };

    this.service.get(payLoad,'/Induction/TransTableView').subscribe((res:any)=>{
      
      if(res && res.data){
        this.isData=true
      // this.dataSource = new MatTableDataSource<any>(res.data);

      this.dataSource = new MatTableDataSource<any>(res.data);

      }else{
        this.isData=false
      }
    }, (error) => {})
  }
  actionDialog(opened: boolean) {
    if (!opened && this.selectedOption && this.selectedOption === 'clearTote') {
      const dialogRef = this.dialog.open(BatchDeleteComponent, {
        height: 'auto',
        width: '50vw',
        autoFocus: '__non_existing_element__',
        data: {
          deleteAllDisable:true,
          batchId: this.batchID,
          toteId: this.toteID,
          userName: this.data.userName,
          wsid: this.data.wsid,
          
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res.isExecuted) {
        }
      });
    } else if (
      !opened &&
      this.selectedOption &&
      this.selectedOption === 'fullTote'
    ) {
      this.clearMatSelectList();
      const dialogRef = this.dialog.open(MarkToteFullComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'add-trans',
          message: 'Click OK to mark this Tote as being Full',
          userName: this.data.userName,
          wsid: this.data.wsid,
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          let payLoad = {
            toteNumber: this.toteID,
            cell: this.cell,
            batchID: this.batchID,
            username: this.data.userName,
            wsid: this.data.wsid,
          };

          this.service.create(payLoad, '/Induction/MarkToteFull').subscribe(
            (res: any) => {
              if (res.data && res.isExecuted) {
                this.toastr.success(labels.alert.success, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
              } else {
                this.toastr.error(labels.alert.went_worng, 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
              }
            },
            (error) => {}
          );
          
        }
      });
    } else if (
      !opened &&
      this.selectedOption &&
      this.selectedOption === 'printToteLabel'
    ) {
      this.clearMatSelectList();
    } else if (
      !opened &&
      this.selectedOption &&
      this.selectedOption === 'printItemLabel'
    ) {
      this.clearMatSelectList();
    } else if (
      !opened &&
      this.selectedOption &&
      this.selectedOption === 'printToteContent'
    ) {
      this.clearMatSelectList();
    }
  }

  clear(type,item) {
   
    let itemId=item.id
    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data: {
        message:
          type === 'clear'
            ? 'Clear This Transaction From This Tote ?'
            : 'Clear And DeAllocate This Transaction From The Tote?',
        heading:
          type === 'clear'
            ? 'Clear Transaction'
            : 'Clear And DeAllocate Transaction',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let payLoad={
          id:itemId,
          username: this.data.userName,
          wsid: this.data.wsid,
        }
        let baseUrl=type==='clear'?'/Induction/ClearItemFromTote':'/Induction/DeAllocateItemFromTote'
        this.service.get(payLoad,baseUrl).subscribe((res:any)=>{
          if (res && res.isExecuted) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
            this.getTransactionTable();
          } else {
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        })
      }
    });
  }


}
