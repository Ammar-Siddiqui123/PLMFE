import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/init/auth.service';
import { ColumnSequenceDialogComponent } from '../../dialogs/column-sequence-dialog/column-sequence-dialog.component';
import { SetColumnSeqService } from '../../dialogs/set-column-seq/set-column-seq.service';
import { InventoryMapService } from '../../inventory-map/inventory-map.service';
import { TransactionService } from '../transaction.service';
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
  { colHeader: 'reasonMessage', colDef: 'Reason Message' },
  { colHeader: 'dateStamp', colDef: 'Date Stamp' },
  { colHeader: 'reason', colDef: 'Reason' },
  { colHeader: 'nameStamp', colDef: 'Name Stamp' },
];
@Component({
  selector: 'app-reprocess-transaction',
  templateUrl: './reprocess-transaction.component.html',
  styleUrls: ['./reprocess-transaction.component.scss'],
})
export class ReprocessTransactionComponent implements OnInit {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);

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
  searchAutocompleteListByCol: any;
  public sortCol: any = 5;
  public sortOrder: any = 'asc';

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
  selectedVariable;
  toteId: string = '';
  searchByToteId = new Subject<string>();
  searchByOrderNumber = new Subject<string>();
  searchBar = new Subject<string>();
  searchAutocompleteList: any;
  tableEvent="reprocess";
  floatLabelControlColumn = new FormControl('auto' as FloatLabelType);
  hideRequiredFormControl = new FormControl(false);
  searchByColumn = new Subject<string>();
  /*for data col. */

  constructor(
    private seqColumn: SetColumnSeqService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private toastr: ToastrService,
    private invMapService: InventoryMapService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getColumnsData();

    this.searchByColumn
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumn(false);
        this.getContentData();
      });
  }
  async autocompleteSearchColumn(isSearchByOrder: boolean = false) {
    let searchPayload;
    if (isSearchByOrder) {
      searchPayload = {
        query: this.orderNumber,
        tableName: 2,
        column: 'Order Number',
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
    } else {
      searchPayload = {
        query: this.columnSearch.searchValue,
        tableName: 2,
        column: this.columnSearch.searchColumn.colDef,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
    }

    this.transactionService
      .get(searchPayload, '/Admin/NextSuggestedTransactions', true)
      .subscribe(
        (res: any) => {
          if (isSearchByOrder) {
            this.searchAutocompleteList = res.data;
          } else {
            this.searchAutocompleteListByCol = res.data;
          }
        },
        (error) => {}
      );
  }

  actionDialog(opened: boolean) {
    if (!opened && this.selectedVariable && this.selectedVariable==='set_column_sq') {
      let dialogRef = this.dialog.open(ColumnSequenceDialogComponent, {
        height: '96%',
        width: '70vw',
        data: {
          mode: event,
          tableName: 'Open Transactions',
        },
      });
      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((result) => {
          this.selectedVariable='';
          if (result && result.isExecuted) {
            this.getColumnsData();
          }
        });
    }
  }
  sortChange(event) {
    if (
      !this.dataSource._data._value ||
      event.direction == '' ||
      event.direction == this.sortOrder
    )
      return;

    let index;
    this.columnValues.find((x, i) => {
      if (x === event.active) {
        index = i;
      }
    });

    this.sortCol = index;
    this.sortOrder = event.direction;
    this.getContentData();
  }

  searchData() {
    if (
      this.columnSearch.searchColumn ||
      this.columnSearch.searchColumn == ''
    ) {
      this.getContentData();
    }
  }
  getFloatFormabelValue(): FloatLabelType {
    return this.floatLabelControlColumn.value || 'auto';
  }
  getProcessSelection(checkValues) {
    this.tableEvent=checkValues
  }
  getColumnsData() {
    let payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid,
      tableName: 'Open Transactions Temp',
    };
    this.transactionService.get(payload, '/Admin/GetColumnSequence').subscribe(
      (res: any) => {
        this.displayedColumns = TRNSC_DATA;
        if (res.data) {
          this.columnValues = res.data;

          this.getContentData();
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

  
  getContentData() {
    let payload = {
      draw: 0,
      searchString: "",
      searchColumn: "",
      start: 1,
      length: 11,
      orderNumber: "",
      sortColumnNumber: this.sortCol,
      sortOrder: this.sortOrder,
      itemNumber: "",
      hold: false,
      username: this.userData.userName,
      wsid: this.userData.wsid
    };
    this.transactionService
      .get(payload, '/Admin/ReprocessTransactionTable')
      .subscribe(
        (res: any) => {
          // this.getTransactionModelIndex();
          this.detailDataInventoryMap = res.data?.transactions;
          this.dataSource = new MatTableDataSource(res.data?.transactions);
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.recordsFiltered;
          this.dataSource.sort = this.sort;
        },
        (error) => {}
      );
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    
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


  resetFields(event?) {
    // this.orderNo = '';
    this.columnSearch.searchValue = '';
    this.searchAutocompleteListByCol = [];
  }
}
