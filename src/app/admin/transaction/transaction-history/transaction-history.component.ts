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
import { TransactionService } from '../transaction.service';
import { DeleteConfirmationTransactionComponent } from 'src/app/admin/dialogs/delete-confirmation-transaction/delete-confirmation-transaction.component';
import { SetColumnSeqComponent } from 'src/app/admin/dialogs/set-column-seq/set-column-seq.component';
import { FloatLabelType } from '@angular/material/form-field';

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
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  public columnValues: any = [];
  public userData: any;
  public displayedColumns: any;
  public dataSource: any = new MatTableDataSource();
  public detailDataTransHistory: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
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
  
  constructor(
    private router: Router,
    private seqColumn: SetColumnSeqService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  getTransactionModelIndex() {
    let paylaod = {
      viewToShow: 2,
      location: '',
      itemNumber: '',
      holds: false,
      orderStatusOrder: '',
      app: 'Admin',
      username: '1234',
      wsid: 'TESTWSID',
    };
    this.transactionService
      .get(paylaod, '/Admin/TransactionModelIndex')
      .subscribe(
        (res: any) => {
          this.columnValues = res.data?.openTransactionColumns;
          this.columnValues.push('actions');
          // this.displayOrderCols=res.data.openTransactionColumns;
        },
        (error) => {}
      );
  }
  getContentData() {
    let payload = {
      draw: 0,
      sDate: '1973-01-18T19:00:00.000Z',
      eDate: '2022-01-19T11:44:49.752Z',
      transType: 'All Transactions',
      transStatus: 'All Transactions',
      searchString: 'Count',
      searchColumn: 'Transaction Type',
      start: 0,
      length: 20,
      orderNumber: '',
      toteID: '',
      sortColumnNumber: 5,
      sortOrder: 'asc',
      filter: '1=1',
      username: '1234',
      wsid: 'TESTWSID',
    };
    this.transactionService
      .get(payload, '/Admin/OpenTransactionTable')
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
}
