import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { SetColumnSeqService } from 'src/app/admin/dialogs/set-column-seq/set-column-seq.service';
import { TransactionService } from '../../transaction.service';
import { AuthService } from 'src/app/init/auth.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { HttpContext, HttpHeaders } from '@angular/common/http';
import { BYPASS_LOG } from 'src/app/init/http-interceptor';

@Component({
  selector: 'app-tran-order-list',
  templateUrl: './tran-order-list.component.html',
  styleUrls: ['./tran-order-list.component.scss'],
})
export class TranOrderListComponent implements OnInit, AfterViewInit {
  public columnValues: any = [];
  public Order_Table_Config = [
    { colHeader: 'transactionType', colDef: 'Transaction Type' },
    { colHeader: 'completedDate', colDef: 'Completed Date' },
    { colHeader: 'location', colDef: 'Location' },
    { colHeader: 'transactionQuantity', colDef: 'Transaction Quantity' },
    { colHeader: 'itemNumber', colDef: 'Item Number' },
    { colHeader: 'lineNumber', colDef: 'Line Number' },
    { colHeader: 'requiredDate', colDef: 'Required Date' },
    { colHeader: 'description', colDef: 'Description' },
    { colHeader: 'completedQuantity', colDef: 'Completed Quantity' },
    { colHeader: 'toteID', colDef: 'Tote ID' },
    { colHeader: 'priority', colDef: 'Priority' },
    { colHeader: 'completedBy', colDef: 'Completed By' },
    { colHeader: 'unitOfMeasure', colDef: 'Unit of Meure' },
    { colHeader: 'lotNumber', colDef: 'Lot Number' },
    { colHeader: 'expirationDate', colDef: 'Expiration Date' },
    { colHeader: 'serialNumber', colDef: 'Serial Number' },
    { colHeader: 'revision', colDef: 'Revision' },
    { colHeader: 'wareHouse', colDef: 'Warehouse' },
    { colHeader: 'importDate', colDef: 'Import Date' },
    { colHeader: 'batchPickID', colDef: 'Batch Pick ID' },
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
    { colHeader: 'toteNumber', colDef: 'Tote Number' },
    { colHeader: 'cell', colDef: 'Cell' },
    { colHeader: 'hostTransactionID', colDef: 'Host Transaction ID' },
    { colHeader: 'zone', colDef: 'Zone' },
    { colHeader: 'emergency', colDef: 'Emergency' },
    { colHeader: 'id', colDef: 'ID' },
    { colHeader: 'importBy', colDef: 'Import By' },
    { colHeader: 'fileFrom', colDef: 'filefrom' },
    { colHeader: 'orderNumber', colDef: 'Order Number' },
    { colHeader: 'lineSequence', colDef: 'Line Sequence' },
    { colHeader: 'carousel', colDef: 'Carousel' },
    { colHeader: 'row', colDef: 'Row' },
    { colHeader: 'shelf', colDef: 'Shelf' },
    { colHeader: 'bin', colDef: 'Bin' },
    { colHeader: 'invMapID', colDef: 'Inv Map ID' },
    { colHeader: 'notes', colDef: 'Notes' },
    { colHeader: 'exportFileName', colDef: 'Export File Name' },
    { colHeader: 'exportDate', colDef: 'Export Date' },
    { colHeader: 'exportedBy', colDef: 'Exported By' },
    { colHeader: 'exportBatchID', colDef: 'Export Batch ID' },
    { colHeader: 'tableType', colDef: 'Table Type' },

    { colHeader: 'statusCode', colDef: 'Status Code' },
    { colHeader: 'masterRecord', colDef: 'Mter Record' },
    { colHeader: 'masterRecordID', colDef: 'Mter Record ID' },
    { colHeader: 'label', colDef: 'Label' },
    { colHeader: 'inProcess', colDef: 'In Process' },
  ];
  public displayedColumns: string[] = [
    'transactionType',
    'completedDate',
    'location',
    'transactionQuantity',
    'itemNumber',
    'lineNumber',
    'requiredDate',
    'description',
    'completedQuantity',
    'toteID',
    'priority',
    'completedBy',
    'unitOfMeasure',
    'lotNumber',
    'expirationDate',
    'serialNumber',
    'revision',
    'wareHouse',
    'importDate',
    'batchPickID',
    'userField1',
    'userField2',
    'userField3',
    'userField4',
    'userField5',
    'userField6',
    'userField7',
    'userField8',
    'userField9',
    'userField10',
    'toteNumber',
    'cell',
    'zone',
    'hostTransactionID',
    'emergency',
    'id',
    'importBy',
    'fileFrom',
    'orderNumber',
    'lineSequence',
    'carousel',
    'row',
    'shelf',
    'bin',
    'invMapID',
    'notes',
    'exportFileName',
    'exportDate',
    'exportedBy',
    'exportBatchID',
    'tableType',
    'statusCode',
    'masterRecord',
    'masterRecordID',
    'label',
    'inProcess',
    'rn',
  ];
  public dataSource: any = new MatTableDataSource();
  public userData: any;
  public detailDataInventoryMap: any;
  public orderNo: any = '';
  public toteId: any = '';
  public searchCol: any = '';
  public searchString: any = '';
  public payload;
  public sortCol: any = 3;
  public sortOrder: any = 'asc';
  searchByInput = new Subject<string>();
  @Input()
  set deleteEvnt(event: Event) {
    if (event) {
      this.getContentData();
      console.log(this.detailDataInventoryMap);
    }
  }

  @Input() set orderNoEvent(event: any) {
    this.toteId = '';
    this.orderNo = '';
    this.searchCol='';
    this.searchString=''
    if (event) {
      event.columnFIeld && event.columnFIeld === 'Order Number'
        ? (this.orderNo = event.searchField)
        : (this.toteId = event.searchField);
      
      this.getContentData();
    }

    // this.getContentData();
  }

  @Input() set toteIdEvent(event: Event) {
    if (event) {
      this.toteId = event;
    }
    // this.getContentData();
  }
  // Emitters
  @Output() openOrders = new EventEmitter<any>();
  @Output() completeOrders = new EventEmitter<any>();
  @Output() reprocessOrders = new EventEmitter<any>();
  @Output() orderTypeOrders = new EventEmitter<any>();
  @Output() totalLinesOrders = new EventEmitter<any>();
  @Output() locationZones = new EventEmitter<any>();
  @Output() currentStatus = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatSort) set matSort(sort:MatSort){
  //   this.dataSource.sort=sort
  // }
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  pageEvent: PageEvent;
  searchAutocompleteList;
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
    columnName: 3,
    sortOrder: 'asc',
  };

  @Input()
  set clearEvent(event: Event) {
    if (event) {
      this.dataSource = new MatTableDataSource();
    }
  }

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  getContentData() {
    this.payload = {
      draw: 0,
      compDate: '',
      identify: 0,
      searchString: this.searchString,
      direct: 'asc',
      searchColumn: this.searchCol,
      sRow: this.customPagination.startIndex,
      eRow: this.customPagination.endIndex,
      checkValue: true,
      checkColumn: 0,
      orderNumber: this.orderNo,
      toteID: this.toteId,
      sortColumnNumber: this.sortCol,
      sortOrder: this.sortOrder,
      filter: '1=1',
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(this.payload, '/Admin/OrderStatusData', true)
      .subscribe(
        (res: any) => {
          // this.getTransactionModelIndex();
          this.detailDataInventoryMap = res.data?.orderStatus;
          this.dataSource = new MatTableDataSource(res.data?.orderStatus);
          // this.displayedColumns = Order_Table_Config;

          this.columnValues = res.data?.orderStatusColSequence;
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.totalRecords;
          // this.dataSource.sort = this.sort;
          if (res.data) {
            this.onOpenOrderChange(res.data?.opLines);
            this.onCompleteOrderChange(res.data?.compLines);
            this.onReprocessOrderChange(res.data?.reLines);
            if (
              res.data &&
              res.data.orderStatus &&
              res.data.orderStatus.length > 0
            ) {
              res.data.orderStatus.find((el) => {
                return el.completedDate === ''
                  ? (res.data.completedStatus = 'In Progress')
                  : (res.data.completedStatus = 'Completed');
              });
            }
            this.onOrderTypeOrderChange(
              res.data &&
                res.data.orderStatus &&
                res.data.orderStatus.length > 0 &&
                res.data.orderStatus[0].transactionType
            );
            this.currentStatusChange(res.data.completedStatus);
            this.totalLinesOrderChange(res.data?.totalRecords);
          }

          if (res.data?.onCar.length) {
            res.data.onCar.filter((item) => {
              return (item.carousel = 'on');
            });
            this.onLocationZoneChange(res.data?.onCar);
          } else if (res.data?.offCar.length) {
            res.data.offCar.filter((item) => {
              return (item.carousel = 'off');
            });
            this.onLocationZoneChange(res.data?.offCar);
            // this.onCompleteOrderChange(res.data?.offCar);
          } else {
            this.onLocationZoneChange(res.data?.onCar);
          }
        },
        (error) => {}
      );
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  deleteSelectedOrder() {
    this.detailDataInventoryMap.this.payload = {
      transType: '',
      orderNumber: '',
      id: 0,
      itemNumber: '',
      lineNumber: '',
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.transactionService
      .get(this.payload, '/Admin/DeleteOrder', true)
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error) => {}
      );
  }
  orderNoChange(event: Event) {
    this.orderNoEvent = event;
  }
  toteIdChange(event: Event) {
    this.orderNoEvent = event;
  }
  onOpenOrderChange(event) {
    this.openOrders.emit(event);
  }
  onOrderTypeOrderChange(event) {
    this.orderTypeOrders.emit(event);
  }
  onReprocessOrderChange(event) {
    this.reprocessOrders.emit(event);
  }
  totalLinesOrderChange(event) {
    this.totalLinesOrders.emit(event);
  }
  currentStatusChange(event) {
    this.currentStatus.emit(event);
  }
  onCompleteOrderChange(event) {
    this.completeOrders.emit(event);
  }
  onLocationZoneChange(event) {
    this.locationZones.emit(event);
  }
  getRowClass(row) {}
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
          // this.columnValues = res.data?.openTransactionColumns;
          // this.columnValues.push('actions');
          // this.displayOrderCols=res.data.openTransactionColumns;
        },
        (error) => {}
      );
  }
  getColumnsData() {
    // this.displayedColumns = Order_Table_Config;
    this.getContentData();
  }
  async autocompleteSearchColumn() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ',
      }),
      context: new HttpContext().set(BYPASS_LOG, true),
    };
    let searchPayload = {
      query: this.searchString,
      tableName: 1,
      column: this.searchCol,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    // NextSuggestedTransactions
    // OrderNumberNext
    this.transactionService
      .get(searchPayload, `/Admin/NextSuggestedTransactions`, true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
        },
        (error) => {}
      );
  }
  searchData() {}
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
    this.getContentData();
  }

  actionDialog(event) {
    this.toteId = '';
    // this.orderNo = '';
    this.searchCol = event;
   this.searchString='';
   this.searchAutocompleteList=[];

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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.orderNo='';
    this.toteId='';
    this.searchByInput
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.searchString = value;
        this.autocompleteSearchColumn();
        this.getContentData();
      });
    this.getContentData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
