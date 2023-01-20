import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil, interval, Subscription, Observable } from 'rxjs';
import { AddInvMapLocationComponent } from 'src/app/admin/dialogs/add-inv-map-location/add-inv-map-location.component';
import { AdjustQuantityComponent } from 'src/app/admin/dialogs/adjust-quantity/adjust-quantity.component';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { QuarantineConfirmationComponent } from 'src/app/admin/dialogs/quarantine-confirmation/quarantine-confirmation.component';
import { SetColumnSeqService } from 'src/app/admin/dialogs/set-column-seq/set-column-seq.service';
import { InventoryMapService } from 'src/app/admin/inventory-map/inventory-map.service';
import { AuthService } from 'src/app/init/auth.service';
import { TransactionService } from '../../transaction.service';

const TRNSC_DATA = [
  { colHeader: 'id', colDef: 'ID' },
  { colHeader: 'importDate', colDef: 'Import Date' },
  { colHeader: 'importBy', colDef: 'Import By' },
  { colHeader: 'importFileName', colDef: 'Import Filename' },
  { colHeader: 'transactionType', colDef: 'Transaction Type' },
  { colHeader: 'orderNumber', colDef: 'Order Number' },
  { colHeader: 'lineNumber', colDef: 'Line Number' },
  { colHeader: 'lineSequence', colDef: 'Line Sequence' },
  { colHeader: 'priority', colDef: 'Priority' },
  { colHeader: 'requiredDate', colDef: 'Required Date' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'unitOfMeasure', colDef: 'Unit of Measure' },
  { colHeader: 'lotNumber', colDef: 'Lot Number' },
  { colHeader: 'expirationDate', colDef: 'Expiration Date' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'description', colDef: 'Description' },
  { colHeader: 'revision', colDef: 'Revision' },
  { colHeader: 'transactionQuantity', colDef: 'Transaction Quantity' },
  { colHeader: 'location', colDef: 'Location' },
  { colHeader: 'wareHouse', colDef: 'Warehouse' },
  { colHeader: 'zone', colDef: 'Zone' },
  { colHeader: 'carousel', colDef: 'Carousel' },
  { colHeader: 'row', colDef: 'Row' },
  { colHeader: 'shelf', colDef: 'Shelf' },
  { colHeader: 'bin', colDef: 'Bin' },
  { colHeader: 'invMapID', colDef: 'Inv Map ID' },
  { colHeader: 'completedDate', colDef: 'Completed Date' },
  { colHeader: 'completedBy', colDef: 'Completed By' },
  { colHeader: 'completedQuantity', colDef: 'Completed Quantity' },
  { colHeader: 'batchPickID', colDef: 'Batch Pick ID' },
  { colHeader: 'notes', colDef: 'Notes' },
  { colHeader: 'exportFileName', colDef: 'Export File Name' },
  { colHeader: 'exportDate', colDef: 'Export Date' },
  { colHeader: 'exportedBy', colDef: 'Exported By' },
  { colHeader: 'exportBatchID', colDef: 'Export Batch ID' },
  { colHeader: 'tableType', colDef: 'Table Type' },
  { colHeader: 'statusCode', colDef: 'Status Code' },
  { colHeader: 'masterRecord', colDef: 'Master Record' },
  { colHeader: 'masterRecordID', colDef: 'Master Record ID' },
  { colHeader: 'label', colDef: 'Label' },
  { colHeader: 'inProcess', colDef: 'In Process' },
  { colHeader: 'userField1', colDef: 'User Field1' },
  { colHeader: 'userField2', colDef: 'User Field2' },
  { colHeader: 'userField3', colDef: 'User Field3' },
  { colHeader: 'userField4', colDef: 'User Field4' },
  { colHeader: 'userField5', colDef: 'User Field5' },
  { colHeader: 'userField6', colDef: 'User Field6' },
  { colHeader: 'userField7', colDef: 'User Field7' },
  { colHeader: 'userField8', colDef: 'User Field8' },
  { colHeader: 'userField9', colDef: 'User Field9' },
  { colHeader: 'userField10', colDef: 'User Field10' },
  { colHeader: 'toteID', colDef: 'Tote ID' },
  { colHeader: 'toteNumber', colDef: 'Tote Number' },
  { colHeader: 'cell', colDef: 'Cell' },
  { colHeader: 'hostTransactionID', colDef: 'Host Transaction ID' },
  { colHeader: 'emergency', colDef: 'Emergency' },
];
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();
let backDate = new Date(year - 50, month, day);
@Component({
  selector: 'app-open-transaction-on-hold',
  templateUrl: './open-transaction-on-hold.component.html',
  styleUrls: ['./open-transaction-on-hold.component.scss'],
})
export class OpenTransactionOnHoldComponent implements OnInit, AfterViewInit {
  @Output() back = new EventEmitter<string>();
  @Output() startdateChange: EventEmitter<MatDatepickerInputEvent<any>> =
    new EventEmitter();
  @Output() enddateChange: EventEmitter<MatDatepickerInputEvent<any>> =
    new EventEmitter();

  searchByToteId = new Subject<string>();
  searchByOrderNumber = new Subject<string>();
  searchBar = new Subject<string>();
  /*for data col. */
  public columnValues: any = [];
  onDestroy$: Subject<boolean> = new Subject();
  public userData: any;
  public displayedColumns: any;
  public dataSource: any = new MatTableDataSource();
  public payload: any;
  public filterLoc: any = 'Nothing';
  public itemList: any;
  transTypeSelect = 'All Transactions';
  transStatusSelect = 'All Transactions';
  rowClicked;
  public detailDataInventoryMap: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;
  pageEvent: PageEvent;

  cols = [];
  customPagination: any = {
    total: '',
    recordsPerPage: 20,
    startIndex: '',
    endIndex: '',
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
  /* End */
  statusType: string = 'All Transactions';
  orderNumber: string = '';
  toteId: string = '';

  sdate: any = backDate.toISOString();
  edate: any = new Date().toISOString();
  public transType: any = [
    {
      type: 'All Transactions',
      value: 'All Transactions',
    },
    {
      type: 'Adjustment',
      value: 'Adjustment',
    },
    {
      type: 'Complete',
      value: 'Complete',
    },
    {
      type: 'Count',
      value: 'Count',
    },
    {
      type: 'Location Change',
      value: 'Location Change',
    },

    {
      type: 'Pick',
      value: 'Pick',
    },

    {
      type: 'Put Away',
      value: 'Put Away',
    },

    {
      type: 'Shipping',
      value: 'Shipping',
    },
    {
      type: 'Shipping Complete',
      value: 'Shipping Complete',
    },
  ];
  public transStatus: any = [
    {
      type: 'All Transactions',
      value: 'All Transactions',
    },
    {
      type: 'Open Transactions',
      value: 'Open Transactions',
    },
    {
      type: 'Completed Transactions',
      value: 'Completed Transactions',
    },
  ];
  constructor(
    private router: Router,
    private seqColumn: SetColumnSeqService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private toastr: ToastrService,
    private invMapService: InventoryMapService,
    private dialog: MatDialog
  ) {
    if (this.router.getCurrentNavigation()?.extras?.state?.['searchValue']) {
      this.columnSearch.searchValue =
        this.router.getCurrentNavigation()?.extras?.state?.['searchValue'];
      this.columnSearch.searchColumn = {
        colDef: this.router.getCurrentNavigation()?.extras?.state?.['colDef'],
        colHeader:
          this.router.getCurrentNavigation()?.extras?.state?.['colHeader'],
      };
    }
  }

  onEndDate(event) {
    alert(event);
  }
  ongg(row,event){
console.log(row)
  }
  filterVals: any = {
    transactions: '',
  };

  ngOnInit(): void {
    // Search by Tote Id Debounce values
    this.searchByToteId
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.toteId = value;
        // this.initializeApi();
        this.getContentData();
      });
    // Search by Order Number Debounce values
    this.searchByOrderNumber
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.orderNumber = value;
        // this.initializeApi();
        this.getContentData();
      });

    // Search Bar  Debounce values
    this.searchBar
      .pipe(debounceTime(900), distinctUntilChanged())
      .subscribe((value) => {
        this.columnSearch.searchValue = value;
        // this.initializeApi();
        if(!this.columnSearch.searchColumn.colDef) return
        this.getContentData();
      });
    this.customPagination = {
      total: '',
      recordsPerPage: 20,
      startIndex: 0,
      endIndex: 20,
    };

    this.userData = this.authService.userData();
    // this.cols = this.displayedColumns.map(c => c);

    // this.getTransactionModelIndex;

    this.initializeApi();
    this.getColumnsData();
  }

  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) {
      this.rowClicked = -1;
    } else {
      this.rowClicked = idx;
    }
  }
  retunrToPrev() {
    this.back.emit('back');
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  /*FUnctions for Table*/
  isAuthorized(controlName: any) {
    return !this.authService.isAuthorized(controlName);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;

    this.customPagination.startIndex = e.pageSize * e.pageIndex;

    this.customPagination.endIndex = e.pageSize * e.pageIndex + e.pageSize;
    // this.length = e.length;
    this.customPagination.recordsPerPage = e.pageSize;
    // this.pageIndex = e.pageIndex;

    this.initializeApi();
    this.getContentData();
  }

  autocompleteSearchColumn() {
    let searchPayload = {
      query: this.searchBar,
      tableName: 2,
      column: this.columnSearch.colDef,
      username: this.userData.userName,
      wsid: 'TESTWSID',
    };
    this.transactionService
      .get(searchPayload, '/Admin/NextSuggestedTransactions')
      .subscribe(
        (res: any) => {},
        (error) => {
          debugger;
        }
      );
  }

  viewInInventoryMaster() {
    this.router.navigate(['/admin/inventoryMaster']);
  }

  adjustQuantity(event) {
    let dialogRef = this.dialog.open(AdjustQuantityComponent, {
      height: 'auto',
      width: '800px',
      data: {
        id: event.invMapID,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.getContentData();
      });
  }
  unQuarantine(event) {
    let dialogRef = this.dialog.open(QuarantineConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'inventory-map-unquarantine',
        id: event.invMapID,
        //   grp_data: grp_data
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.getContentData();
      });
  }
  quarantine(event) {
    let dialogRef = this.dialog.open(QuarantineConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'inventory-map-quarantine',
        id: event.invMapID,
        //   grp_data: grp_data
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.getContentData();
      });
  }
  delete(event: any) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-inventory-map',
        id: event.invMapID,
        //  grp_data: grp_data
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.getContentData();
      });
  }

  getColumnsData() {
    this.displayedColumns = TRNSC_DATA;
    this.getContentData();
    // this.seqColumn
    //   .getSetColumnSeq()
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((res) => {
    //     this.displayedColumns = TRNSC_DATA;

    //     if (res?.data?.columnSequence) {
    //       this.columnValues = res.data?.columnSequence;
    //       this.columnValues.push('actions');
    //       this.getContentData();
    //     } else {
    //       this.toastr.error('Something went wrong', 'Error!', {
    //         positionClass: 'toast-bottom-right',
    //         timeOut: 2000,
    //       });
    // }
    // });
  }

  announceSortChange(e: any) {
    // let index = this.columnValues.findIndex(x => x === e.active );
    // this.sortColumn = {
    //   columnName: index,
    //   sortOrder: e.direction
    // }
    // this.initializeApi();
    // this.getContentData();
  }

  edit(event: any) {
    let dialogRef = this.dialog.open(AddInvMapLocationComponent, {
      height: '750px',
      width: '100%',
      data: {
        mode: 'editInvMapLocation',
        itemList: this.itemList,
        detailData: event,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.getContentData();
      });
  }

  getContentData() {
    let payload = {
      draw: 0,
      sDate: this.sdate,
      eDate: this.edate,
      transType: this.transTypeSelect,
      transStatus: this.transStatusSelect,
      searchString: this.columnSearch.searchValue,
      searchColumn: this.columnSearch.searchColumn.colDef,
      start: 1,
      length: this.customPagination.recordsPerPage,
      orderNumber: this.orderNumber,
      toteID: this.toteId,
      sortColumnNumber: 5,
      sortOrder: 'asc',
      filter: '1=1',
      username: this.userData.userName,
      wsid: 'TESTWSID',
    };
    this.transactionService
      .get(payload, '/Admin/OpenTransactionTable')
      .subscribe(
        (res: any) => {
          this.getTransactionModelIndex();
          this.detailDataInventoryMap = res.data?.transactions;
          this.dataSource = new MatTableDataSource(res.data?.transactions);
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.recordsFiltered;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          debugger;
        }
      );
    // this.invMapService
    //   .getInventoryMap(this.payload)
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((res: any) => {
    //     debugger;
    //     this.itemList = res.data?.inventoryMaps?.map((arr) => {
    //       return { itemNumber: arr.itemNumber, desc: arr.description };
    //     });

    //     this.detailDataInventoryMap = res.data?.inventoryMaps;
    //     this.dataSource = new MatTableDataSource(res.data?.inventoryMaps);
    //     //  this.dataSource.paginator = this.paginator;
    //     this.customPagination.total = res.data?.recordsFiltered;
    //     this.dataSource.sort = this.sort;
    //   });
  }

  initializeApi() {
    this.userData = this.authService.userData();
    this.payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid,
      oqa: this.filterLoc,
      searchString: this.columnSearch.searchValue,
      searchColumn: this.columnSearch.searchColumn.colDef,
      sortColumnIndex: this.sortColumn.columnName,
      sRow: this.customPagination.startIndex,
      eRow: this.customPagination.endIndex,
      sortOrder: this.sortColumn.sortOrder,
      filter: '1 = 1',
    };
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
          this.columnValues = res.data?.openTransactionColumns;
          this.columnValues.push('actions');
          // this.displayOrderCols=res.data.openTransactionColumns;
        },
        (error) => {
          debugger;
        }
      );
  }
  /*End of table functions */
  actionDialog(event) {}

  onDateChange(event): void {
    this.startdateChange.emit();
    this.sdate = new Date(event).toISOString();
    this.initializeApi();
    this.getContentData();
  }

  onEndDateChange(event): void {
    this.enddateChange.emit();
    this.edate = new Date(event).toISOString();
    this.initializeApi();
    this.getContentData();
  }
  selectStatus(event) {
    this.transStatusSelect = event;
    this.initializeApi();
    this.getContentData();
  }
  selectTransType(value) {
    this.transTypeSelect = value;
    this.initializeApi();
    this.getContentData();
  }

  ngOnDestroy() {
    this.searchByToteId.unsubscribe();
    this.searchByOrderNumber.unsubscribe();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
