import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from 'angular-routing';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/init/auth.service';
import { ColumnSequenceDialogComponent } from '../../dialogs/column-sequence-dialog/column-sequence-dialog.component';
import { SetColumnSeqComponent } from '../../dialogs/set-column-seq/set-column-seq.component';
import { SetColumnSeqService } from '../../dialogs/set-column-seq/set-column-seq.service';
import { TransactionService } from '../transaction.service';

const TRNSC_DATA = [
  { colHeader: 'importDate', colDef: 'Import Date' },
  { colHeader: 'importBy', colDef: 'Import By' },
  { colHeader: 'importFileName', colDef: 'Import Filename' },
  { colHeader: 'transactionType', colDef: 'Transaction Type' },
  { colHeader: 'orderNumber', colDef: 'Order Number' },
  { colHeader: 'lineNumber', colDef: 'Line Number' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'lotNumber', colDef: 'Lot Number' },
  { colHeader: 'expirationDate', colDef: 'Expiration Date' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'transactionQuantity', colDef: 'Transaction Quantity' },
  { colHeader: 'reasonMessage', colDef: 'Reason Message' },
  { colHeader: 'reason', colDef: 'Reason' },
  { colHeader: 'dateStamp', colDef: 'Date Stamp' },
  { colHeader: 'nameStamp', colDef: 'Name Stamp' },
  { colHeader: 'reprocessDate', colDef: 'ReProcess Date' },
  { colHeader: 'reprocessBy', colDef: 'ReProcess By' },
  { colHeader: 'reprocessType', colDef: 'ReProcess Type' },
];
@Component({
  selector: 'app-reprocessed-transaction',
  templateUrl: './reprocessed-transaction.component.html',
  styleUrls: ['./reprocessed-transaction.component.scss'],
})
export class ReprocessedTransactionComponent implements OnInit {
  public columnValues: any = [];
  public userData: any;
  public displayedColumns: any;
  public dataSource: any = new MatTableDataSource();
  public detailDataTransHistory: any;
  onDestroy$: Subject<boolean> = new Subject();

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  searchBar = new Subject<string>();
  searchAutocompleteList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageEvent: PageEvent;
  cols = [];
  customPagination: any = {
    total: '',
    recordsPerPage: 20,
    startIndex: 0,
    endIndex: 20,
  };
  columnSearch: any = {
    searchColumn: {
      colHeader: '',
      colDef: '',
    },
    searchValue: '',
  };
  sortColumn: any = {
    columnName: 32,
    sortOrder: 'asc',
  };
  constructor(
    private seqColumn: SetColumnSeqService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.searchBar
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.columnSearch.searchValue = value;
        if (!this.columnSearch.searchColumn.colDef) return;

        this.autocompleteSearchColumn();
        // if (!this.searchAutocompleteList.length) {
        //   // this.getContentData();
        // }
      });

    this.userData = this.authService.userData();
    this.getColumnsData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getColumnsData() {
    this.displayedColumns = TRNSC_DATA;
    this.getContentData();
  }
  getTransactionModelIndex() {
    let paylaod = {
      viewToShow: 2,
      location: '',
      itemNumber: '',
      holds: false,
      orderStatusOrder: '',
      app: 'Admin',
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(paylaod, '/Admin/TransactionModelIndex')
      .subscribe(
        (res: any) => {
          this.columnValues = res.data?.reprocessedColumns;
          // this.columnValues.push('actions');
          // this.displayOrderCols=res.data.openTransactionColumns;
        },
        (error) => {}
      );
  }
  getContentData() {
    let payload = {
      draw: 0,
      searchString: this.columnSearch.searchValue,
      searchColumn: this.columnSearch.searchColumn.colDef,
      start: this.customPagination.startIndex,
      length: this.customPagination.endIndex,
      sortColumnNumber: 5,
      sortOrder: 'asc',
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(payload, '/Admin/ReprocessedTransactionTable')
      .subscribe(
        (res: any) => {
          this.getTransactionModelIndex();
          this.detailDataTransHistory = res.data?.transactions;
          this.dataSource = new MatTableDataSource(res.data?.transactions);
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.recordsFiltered;
          this.dataSource.sort = this.sort;
        },
        (error) => {}
      );
  }
  searchData(event) {
    if(event==this.columnSearch.searchValue) return
    if (
      this.columnSearch.searchColumn ||
      this.columnSearch.searchColumn == ''
    ) {
      this.getContentData();
    }
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  async autocompleteSearchColumn() {
    let searchPayload = {
      query: this.columnSearch.searchValue,
      tableName: 6,
      column: this.columnSearch.searchColumn.colDef,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/NextSuggestedTransactions')
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
          this.getContentData();
        },
        (error) => {}
      );
  }

  actionDialog(actionEvent: any) {
    if (actionEvent.value === 'set_column_sq') {
      let dialogRef = this.dialog.open(ColumnSequenceDialogComponent, {
        height: '700px',
        width: '900px',
        data: {
          mode: actionEvent.value,
          tableName:'Reprocessed Transactions'
        }
      })
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
        if(result.isExecuted){
          // this.getColumnsData();
        }
   
      })
    }
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
    this.getContentData();
  }
  ngOnDestroy() {
    this.searchBar.unsubscribe();
  }
}
