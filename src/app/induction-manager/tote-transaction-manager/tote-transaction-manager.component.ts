import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { ProcessPutAwayService } from '../processPutAway.service';
import { ToteTransactionManagerService } from './tote-transaction-manager.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/init/auth.service';
import { BatchDeleteComponent } from 'src/app/dialogs/batch-delete/batch-delete.component';
import labels from '../../labels/labels.json';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-tote-transaction-manager',
  templateUrl: './tote-transaction-manager.component.html',
  styleUrls: ['./tote-transaction-manager.component.scss'],
})
export class ToteTransactionManagerComponent implements OnInit {
  ELEMENT_DATA: any[] = [
    {
      batch_id: '253215',
      pos_no: '28',
      tote_id: '30022',
      zone: '120322',
      trans_type: 'pick',
      host_trans_id: '123641',
    },
    {
      batch_id: '253215',
      pos_no: '28',
      tote_id: '30022',
      zone: '120322',
      trans_type: 'pick',
      host_trans_id: '123641',
    },
    {
      batch_id: '253215',
      pos_no: '28',
      tote_id: '30022',
      zone: '120322',
      trans_type: 'pick',
      host_trans_id: '123641',
    },
  ];
  pageEvent: PageEvent;
  public dataSource: any = new MatTableDataSource();
  batchId: any = '';
  sortOrder = 'asc';
  sortCol = 0;
  startRow=0;
  endRow=10;
  recordsPerPage=10;
  totalRecords=0;
  batchPickId = new Subject<string>();
  userData: any;
  searchAutocompletBatchPick: any = [];
  // displayedColumns: string[] = [
  //   'batch_id',
  //   'pos_no',
  //   'tote_id',
  //   'zone',
  //   'trans_type',
  //   'host_trans_id',
  //   'action',
  // ];
  public displayedColumns: string[] = [
    'batchPickID',
    'filterCount',
    'hostTransaction',
    'toteId',
    'transactionType',
    'zoneLabel',
    'action'
  ];

  hideRequiredControl = new FormControl(false);
  tableData = this.ELEMENT_DATA;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  dataSourceList: any;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private toteService: ToteTransactionManagerService,
    private authService: AuthService
  ) {
    this.userData = this.authService.userData();
  }

  ngOnInit(): void {
    this.batchPickId
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumn();
      });

    this.getToteTrans();
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  searchData(event) {}

  clearBatchButt() {
    this.batchId = '';
    this.searchAutocompletBatchPick.length = 0;
    this.getToteTrans();
  }

  clearInfo(type,row?) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'clear-pick-tote-info',
        action: 'clear',
        actionMessage:
          type === 'pickTote'
            ? 'the info for all pick batches'
            : 'this batch or tote id',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Yes') {
        if (type != 'pickTote') {
          const dialogRef = this.dialog.open(BatchDeleteComponent, {
            height: 'auto',
            width: '50vw',
            autoFocus: '__non_existing_element__',
            data: {
              deleteAllDisable:true,
              batchId: row.batchPickID,
              toteId: row.toteId,
              userName: this.userData.userName,
              wsid: this.userData.wsid,
            },
          });
          dialogRef.afterClosed().subscribe((res) => {
            if (res.isExecuted) {
              this.getToteTrans()
              // this.getTransactionTable();
            }
          });
        } else {
          // Clear tote info
          this.clearToteInfo();
        }
      }
    });
  }

  // getToteTrans() {
  //   let payload = {
  //     userName: this.userData.userName,
  //     wsid: this.userData.wsid,
  //     batchID: this.batchId?this.batchId:'',
  //     startRow: 0,
  //     endRow: 0,
  //     sortCol: this.sortCol,
  //     sortOrder: this.sortOrder,
  //     filter: '1=1',
  //   };
  //   this.toteService
  //     .getAll('/Induction/SelectToteTransManTable',payload,true)
  //     .subscribe((res: any) => {
  //       this.dataSource = new MatTableDataSource(res?.data);
  //     });
  // }
 getToteTrans() {
    let payload = {
   
      BatchID: this.batchId?this.batchId:'',
      StartRow: this.startRow,
      EndRow: this.endRow,
      SortCol: this.sortCol,
      SortOrder:this.sortOrder,
      Filter: '1=1',
    };
    this.toteService
      .getAll('/Induction/SelectToteTransManTable',payload,true)
      .subscribe((res: any) => {
        this.totalRecords=res.data && res.data[0] && res.data[0].totalCount? res.data[0].totalCount:0;
        this.dataSource = new MatTableDataSource(res?.data);
      });
  }

  async autocompleteSearchColumn() {
    let searchPayload = {
      batchID:this.batchId
    };
    this.toteService
    .getAll('/Induction/SelectBatchPickTA',this.batchId?searchPayload:null,true)
      .subscribe(
        (res: any) => {
          this.searchAutocompletBatchPick = res.data;
          this.getToteTrans();
        },
        (error) => {}
      );
  }
  clearToteInfo() {
    let payload = {
      userName: this.userData.userName,
      wsid: this.userData.wsid,
      appName: '',
    };
    this.toteService
      .put(payload, '/Induction/ClearPickToteInfo')
      .subscribe((res: any) => {
        if (res.isExecuted) {
          this.getToteTrans();
          this.toastr.success(labels.alert.delete, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.customPagination.startIndex =  e.pageIndex
    this.startRow = e.pageSize * e.pageIndex;

    this.endRow = e.pageSize * e.pageIndex + e.pageSize;
    // this.length = e.length;
    this.recordsPerPage = e.pageSize;
    // this.pageIndex = e.pageIndex;

    // this.initializeApi();
    this.getToteTrans();
  }


  sortChange(event) {
    if (
      !this.dataSource._data._value ||
      event.direction == '' ||
      event.direction == this.sortOrder
    )
      return;

    let index;
    this.displayedColumns.find((x, i) => {
      if (x === event.active) {
        index = i;
      }
    });

    this.sortCol = index;
    this.sortOrder = event.direction;
    this.getToteTrans();
  }
}
