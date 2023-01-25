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

const Order_Table_Config = [
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
@Component({
  selector: 'app-tran-order-list',
  templateUrl: './tran-order-list.component.html',
  styleUrls: ['./tran-order-list.component.scss'],
})
export class TranOrderListComponent implements OnInit, AfterViewInit {
  public columnValues: any = [];
  public displayedColumns: any;
  public dataSource: any = new MatTableDataSource();
  public userData: any;
  public detailDataInventoryMap: any;
  public orderNo: any = '';
  public toteId: any = '';
 public searchCol:any='';
 public searchString:any='';

 
 searchByInput = new Subject<string>();
 
  @Input() set orderNoEvent(event: Event) {
    if(event){
      this.orderNo = event;
      this.getContentData();
    }
 
    // this.getContentData();
  }

  
  @Input() set toteIdEvent(event: Event) {
    if(event){
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;
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
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}
  getContentData() {
    let payload = {
      draw: 0,
      compDate: "",
      identify: 0,
      searchString: this.searchString,
      direct: "asc",
      searchColumn: this.searchCol,
      sRow: this.customPagination.startIndex,
      eRow: this.customPagination.endIndex,
      checkValue: true,
      checkColumn: 0,
      orderNumber: this.orderNo,
      toteID:this.toteId,
      sortColumnNumber: 0,
      sortOrder: "asc",
      filter: "1=1",
      username: this.userData.userName,
      wsid:this.userData.wsid
    };
    this.transactionService
      .get(payload, '/Admin/OrderStatusData')
      .subscribe(
        (res: any) => {
         
          this.getTransactionModelIndex();
          this.detailDataInventoryMap = res.data?.orderStatus;
          this.dataSource = new MatTableDataSource(res.data?.orderStatus);
          this.columnValues = res.data?.orderStatusColSequence;
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.totalRecords;
          this.dataSource.sort = this.sort;
          this.onOpenOrderChange(res.data?.opLines)
          this.onCompleteOrderChange(res.data?.compLines)
          this.onReprocessOrderChange(res.data?.compLines)
          this.onOrderTypeOrderChange(res.data?.orderStatus[0]?.transactionType)
          this.totalLinesOrderChange(res.data?.orderStatus?.length)
        },
        (error) => {}
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
  onCompleteOrderChange(event) {
    this.completeOrders.emit(event);
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
          // this.columnValues = res.data?.openTransactionColumns;
          // this.columnValues.push('actions');
          // this.displayOrderCols=res.data.openTransactionColumns;
        },
        (error) => {}
      );
  }
  getColumnsData() {
    this.displayedColumns = Order_Table_Config;
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

  announceSortChange(e: any) {
    // let index = this.columnValues.findIndex(x => x === e.active );
    // this.sortColumn = {
    //   columnName: index,
    //   sortOrder: e.direction
    // }
    // this.initializeApi();
    // this.getContentData();
  }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.searchByInput
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((value) => {
      this.searchString=value;
    this.getColumnsData();

    });
    this.getColumnsData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
