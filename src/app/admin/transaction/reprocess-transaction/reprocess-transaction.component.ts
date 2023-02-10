import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import labels from '../../../labels/labels.json';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/init/auth.service';
import { ColumnSequenceDialogComponent } from '../../dialogs/column-sequence-dialog/column-sequence-dialog.component';
import { ReprocessTransactionDetailComponent } from '../../dialogs/reprocess-transaction-detail/reprocess-transaction-detail.component';
import { SetColumnSeqService } from '../../dialogs/set-column-seq/set-column-seq.service';
import { InventoryMapService } from '../../inventory-map/inventory-map.service';
import { TransactionService } from '../transaction.service';
import { SharedService } from '../../../services/shared.service';
import { DialogConfig } from '@angular/cdk/dialog';
import { FunctionAllocationComponent } from '../../dialogs/function-allocation/function-allocation.component';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
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

  isReprocessedChecked = {flag:false};
  isCompleteChecked = {flag:false};
  isHistoryChecked = {flag:false};
  isHold = false;

  deleteReplenishment=true;
  deleteSelected=false;
  deleteBySelectedReason=false;
  deleteBySelectedMessage=false;
  deleteByDateTime=false;
  deleteByItemNumber=false; //Only visible if searched
  deleteByOrderNumber=false; //Only visible if searched


  idx: any;

  createdBy = "";
  transactionDateTime = "";
  reason = "";
  reasonMessage = "";


  orders =
    {
      reprocess: 0,
      complete: 0,
      history: 0,
      reprocessOrders: [{ orderNumber: 0, itemNumber: 0, id: 0 }],
      completeOrders: [{ orderNumber: 0, itemNumber: 0, id: 0 }],
      historyOrders: [{ orderNumber: 0, itemNumber: 0, id: 0 }]
    };
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
  itemNumber: string = '';
  selectedVariable;
  isHistory: boolean = false;
  toteId: string = '';
  searchByToteId = new Subject<string>();
  searchByOrderNumber = new Subject<string>();
  searchBar = new Subject<string>();
  searchAutocompleteList: any;
  tableEvent = "reprocess";
  isEnabled = true;
  transactionID = 0;
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
    private dialog: MatDialog,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.customPagination = {
      total: '',
      recordsPerPage: 10,
      startIndex: 0,
      endIndex: 10,
    };
    this.userData = this.authService.userData();
    this.getColumnsData();
    this.getOrdersWithStatus();

    this.searchByColumn
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumn(false);
        this.getContentData();
      });
  }

  clearDelete(showOptions="")
  {
  if(showOptions=="")
  {
    this.deleteReplenishment=true;
    this.deleteSelected=false;
    this.deleteBySelectedReason=false;
    this.deleteBySelectedMessage=false;
    this.deleteByDateTime=false;
  
    this.deleteByItemNumber=false; //Only visible if searched
    this.deleteByOrderNumber=false; //Only visible if searched
  }
  else 
  {
  this.deleteReplenishment=true;
  this.deleteSelected=true;
  this.deleteBySelectedReason=true;
  this.deleteBySelectedMessage=true;
  this.deleteByDateTime=true;

  this.deleteByItemNumber=true; //Only visible if searched
  this.deleteByOrderNumber=true; //Only visible if searched
  }
  
  }

  getTransaction(row: any) {
    this.isEnabled = false;
    this.transactionID = row.id;

    this.isReprocessedChecked.flag = row.reprocess == 'False' ? false : true;
    this.isCompleteChecked.flag = row.postAsComplete == 'False' ? false : true;
    this.isHistoryChecked.flag = row.sendToHistory == 'False' ? false : true;


    this.itemNumber   = row.itemNumber;
    this.orderNumber  = row.orderNumber;

    this.clearDelete("1");
  }

  getTransactionInfo(completeInfo: boolean) {
    if (!completeInfo) {
      var payload = {
        id: '' + this.transactionID + '',
        username: this.userData.userName,
        wsid: this.userData.wsid,
      }
      this.transactionService.get(payload, '/Admin/ReprocessTransactionData').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            this.createdBy = res.data[0].nameStamp;
            this.transactionDateTime = res.data[0].dateStamp;
            this.reason = res.data[0].reason;
            this.reasonMessage = res.data[0].reasonMessage;
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
    else {
      //Get complete info for edit popup
    }
  }

  changeTableRowColor(idx: any) {
    this.rowClicked = idx;
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
        tableName: 4,
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
        (error) => { }
      );
  }

  selectedOrderNumber(value: any) {
    this.orderNumber = value;
    // this.getContentData();
    this.isHistory ? this.getHistoryData() : this.getContentData();
  }
  selectedItemNum(value: any) {
    this.itemNumber = value;
    // this.getContentData();
    this.isHistory ? this.getHistoryData() : this.getContentData();
  }

  filterCleared(evt:any)
  {
    //sdfsdf
    //this.getHistoryData();
    this.getContentData();
    

  }

  actionDialog(opened: boolean) {
    if(this.selectedVariable!=undefined)
    {
      if (!opened && this.selectedVariable && this.selectedVariable === 'set_column_sq') {
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
            this.selectedVariable = '';
            if (result && result.isExecuted) {
              this.getColumnsData();
            }
          });
      }
      else
      {
        let deletePayload ;
        if (!opened && this.selectedVariable && this.selectedVariable =='deleteReplenishment') 
        {
        deletePayload = 
        {
          "id": 0,
          "history": false,
          "reason": "",
          "message": "",
          "dateStamp": "",
          "itemNumber": "",
          "orderNumber": "",
          "replenishments": true,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        }
        else if (!opened && this.selectedVariable && this.selectedVariable =='deleteSelected') 
        {
        
        }
        else if (!opened && this.selectedVariable && this.selectedVariable =='deleteBySelectedReason') 
        {
          deletePayload = 
          {
            "id": 0,
            "history": false,
            "reason": this.reason,
            "message": "",
            "dateStamp": "",
            "itemNumber": "",
            "orderNumber": "",
            "replenishments": false,
            "username": this.userData.userName,
            "wsid": this.userData.wsid
          }
        }
        else if (!opened && this.selectedVariable && this.selectedVariable =='deleteBySelectedMessage') 
        {
          deletePayload = 
          {
            "id": 0,
            "history": false,
            "reason": "",
            "message": this.reasonMessage,
            "dateStamp": "",
            "itemNumber": "",
            "orderNumber": "",
            "replenishments": false,
            "username": this.userData.userName,
            "wsid": this.userData.wsid
          }
        }
        else if (!opened && this.selectedVariable && this.selectedVariable =='deleteByDateTime') 
        {
          deletePayload = 
          {
            "id": 0,
            "history": false,
            "reason": "",
            "message": "",
            "dateStamp": this.transactionDateTime,
            "itemNumber": "",
            "orderNumber": "",
            "replenishments": false,
            "username": this.userData.userName,
            "wsid": this.userData.wsid
          }
        }
        else if (!opened && this.selectedVariable && this.selectedVariable =='deleteByItemNumber') 
        {
          deletePayload = 
          {
            "id": 0,
            "history": false,
            "reason": "",
            "message": "",
            "dateStamp": "",
            "itemNumber": this.itemNumber,
            "orderNumber": "",
            "replenishments": false,
            "username": this.userData.userName,
            "wsid": this.userData.wsid
          }
        }
        else if (!opened && this.selectedVariable && this.selectedVariable =='deleteByOrderNumber') 
        {
          deletePayload = 
          {
            "id": 0,
            "history": false,
            "reason": "",
            "message": "",
            "dateStamp": "",
            "itemNumber": "",
            "orderNumber": this.orderNumber,
            "replenishments": false,
            "username": this.userData.userName,
            "wsid": this.userData.wsid
          }
        }
  
  
        this.seqColumn.delete(deletePayload).subscribe((res: any) => {
  
  
                this.toastr.success(labels.alert.update, 'Success!',{
                  positionClass: 'toast-bottom-right',
                  timeOut:2000
               });
  
               this.getContentData("1");
               this.getOrdersWithStatus();
      
          (error) => {
            this.toastr.error('Something went wrong', 'Error!', {
                      positionClass: 'toast-bottom-right',
                      timeOut: 2000,
                    });
          }
        });
  
      } 
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
    this.isHistory ? this.getHistoryData() : this.getContentData();
  }

  searchData() {
    if (
      this.columnSearch.searchColumn ||
      this.columnSearch.searchColumn == ''
    ) {
      // this.getContentData();
      this.isHistory ? this.getHistoryData() : this.getContentData();
    }
  }
  getFloatFormabelValue(): FloatLabelType {
    return this.floatLabelControlColumn.value || 'auto';
  }
  getProcessSelection(checkValues) {
    this.tableEvent = checkValues
    if (this.tableEvent === 'history') {
      this.isHistory = true;
      this.getHistoryData();
    }
    else {
      this.isHistory = false;
      this.getContentData();
    }
  }
  reasonFilterEvent(checkValues) {
    if (checkValues === 'hold') {
      this.isHold = true;
      this.getContentData();
    }
    else {
      this.isHold = false;
      this.getContentData();
    }
  }
  deleteOrder(id: any, event) {

    if (id == 0 || id == -1) {
      var message = "";

      if(id==0) 
      {
      message = "Click OK to mark ALL transactions as reprocess";
      }
      else 
      {
      message = "Click OK to unmark ALL transactions as reprocess";
      }


      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          message: message
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result=='Yes'){

          var MarkAsTrue = (id == 0 ? true : false);
          var column = "";
          if (event == 'reprocess') {
            column = 'Reprocess';
          }
          else if (event == 'complete') {
            column = 'Post as Complete';
          }
          else {
            //history
            column = 'Send to History';
          }
          var payload = {
            Column: column,
            MarkAsTrue: MarkAsTrue,
            username: this.userData.userName,
            wsid: this.userData.wsid,
          }
          this.transactionService.get(payload, '/Admin/SetAllReprocessColumn').subscribe(
            (res: any) => {
              if (res.data && res.isExecuted) {
                console.log(res);
                this.getContentData();
                this.getOrdersWithStatus();
                this.toastr.success(labels.alert.update, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000
                });
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
        

      })

    }
    else 
    {


      let dialogRef = this.dialog.open(FunctionAllocationComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          target: 'unassigned',
          function: null
        }
      })
      dialogRef.afterClosed().subscribe(result => {
            var payloadForReprocess = {
              id: id,
              reprocess: 0,
              postComplete: 0,
              sendHistory: 0,
              field: "",
              username: this.userData.userName,
              wsid: this.userData.wsid,
            }
            this.transactionService.get(payloadForReprocess, '/Admin/ReprocessIncludeSet').subscribe(
              (res: any) => {
                if (res.data && res.isExecuted) {
                  this.getContentData();
                  this.getOrdersWithStatus();
                  this.toastr.success(labels.alert.update, 'Success!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000
                  });
                } else {
                  this.toastr.error('Something went wrong', 'Error!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000,
                  });
                }
              },
              (error) => { }
            );
  
  
  
          
      
      })
  
  
  
    }



  }
  getOrdersWithStatus() {
    let payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid
    };
    this.transactionService.get(payload, '/Admin/OrderToPost').subscribe(
      (res: any) => {
        if (res.data) {
          this.orders.reprocess = res.data.reprocessCount;
          this.orders.complete = res.data.completeCount;
          this.orders.history = res.data.historyCount;

          // if(this.orders.reprocessOrders.length&&this.orders.reprocessOrders.length>0)
          // {
          //   this.orders.reprocessOrders.shift();
          // }
          // if(this.orders.completeOrders.length&&this.orders.completeOrders.length>0)
          // {
          //   this.orders.completeOrders.shift();
          // }
          // if(this.orders.historyOrders.length&&this.orders.historyOrders.length>0)
          // {
          //   this.orders.historyOrders.shift();
          // }
          this.orders.reprocessOrders = res.data.reprocess;

          this.orders.completeOrders = res.data.complete;
          this.orders.historyOrders = res.data.history;

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

  deleteReprocessOrder(record: any) { }

  itemUpdatedEvent(event: any) {
    this.getContentData();
    this.getOrdersWithStatus();
    this.isEnabled = false; 
  }

  clearTransactionData() {
    this.isEnabled = true;
    //this.transactionID = 0;
    // this.isReprocessedChecked.flag = false;
    // this.isCompleteChecked.flag = false;
    // this.isHistoryChecked.flag = false;
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
      (error) => { }
    );
  }


  getContentData(clear="") {
    this.rowClicked = "";
    let payload = {
      draw: 0,
      searchString: this.columnSearch.searchValue,
      searchColumn: this.columnSearch.searchColumn.colDef,
      start: this.customPagination.startIndex,
      length: this.customPagination.recordsPerPage,
      orderNumber: clear==""?this.orderNumber:"",
      sortColumnNumber: this.sortCol,
      sortOrder: this.sortOrder,
      itemNumber: clear==""?this.itemNumber:"" ,
      hold: this.isHold,
      username: this.userData.userName,
      wsid: this.userData.wsid
    };
    this.transactionService
      .get(payload, '/Admin/ReprocessTransactionTable', true)
      .subscribe(
        (res: any) => {
          // this.getTransactionModelIndex();
          this.detailDataInventoryMap = res.data?.transactions;
          this.dataSource = new MatTableDataSource(res.data?.transactions);
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.recordsFiltered;
          this.dataSource.sort = this.sort;
        },
        (error) => { }
      );


    this.clearTransactionData();
    this.clearDelete();
  }

  getHistoryData() {
    this.rowClicked = "";
    let payload = {
      draw: 0,
      searchString: this.columnSearch.searchValue,
      searchColumn: this.columnSearch.searchColumn.colDef,
      start: this.customPagination.startIndex,
      length: this.customPagination.recordsPerPage,
      sortColumnNumber: this.sortCol,
      sortOrder: this.sortOrder,
      orderNumber: this.orderNumber,
      itemNumber: this.itemNumber,
      // hold: false,
      username: this.userData.userName,
      wsid: this.userData.wsid
    };
    this.transactionService
      .get(payload, '/Admin/ReprocessedTransactionHistoryTable',true)
      .subscribe(
        (res: any) => {
          // this.getTransactionModelIndex();
          this.detailDataInventoryMap = res.data?.transactions;
          this.dataSource = new MatTableDataSource(res.data?.transactions);
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.recordsFiltered;
          this.dataSource.sort = this.sort;
        },
        (error) => { }
      );


    this.clearTransactionData();
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


  resetFields(event?) {
    // this.orderNo = '';
    this.columnSearch.searchValue = '';
    this.searchAutocompleteListByCol = [];
  }

  openReprocessTransactionDialogue(id: any) {
    const dialogRef = this.dialog.open(ReprocessTransactionDetailComponent, {
      height: 'auto',
      width: '100%',
      autoFocus: '__non_existing_element__',
      data: {
        transactionID: id,
        history: this.isHistory
      }
    })
  }
}
