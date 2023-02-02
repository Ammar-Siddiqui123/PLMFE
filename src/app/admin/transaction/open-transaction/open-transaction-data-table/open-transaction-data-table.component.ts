import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { SetColumnSeqService } from 'src/app/admin/dialogs/set-column-seq/set-column-seq.service';
import { AuthService } from 'src/app/init/auth.service';
import { TransactionService } from '../../transaction.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InventoryMapService } from 'src/app/admin/inventory-map/inventory-map.service';
import { AddInvMapLocationComponent } from 'src/app/admin/dialogs/add-inv-map-location/add-inv-map-location.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { QuarantineConfirmationComponent } from 'src/app/admin/dialogs/quarantine-confirmation/quarantine-confirmation.component';
import { AdjustQuantityComponent } from 'src/app/admin/dialogs/adjust-quantity/adjust-quantity.component';

const TRNSC_DATA = [
  { colHeader: 'orderNumber', colDef: 'Order Number' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'wareHouse', colDef: 'Warehouse' },
  { colHeader: 'location', colDef: 'Location' },
  { colHeader: 'transactionType', colDef: 'Transaction Type' },
  { colHeader: 'transactionQuantity', colDef: 'Transaction Quantity' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'lotNumber', colDef: 'Lot Number' },
  { colHeader: 'lineNumber', colDef: 'Line Number' },
  { colHeader: 'hostTransactionID', colDef: 'Host Transaction ID' },
  { colHeader: 'toteID', colDef: 'Tote ID' },
  { colHeader: 'id', colDef: 'ID' },
];

@Component({
  selector: 'app-open-transaction-data-table',
  templateUrl: './open-transaction-data-table.component.html',
  styleUrls: ['./open-transaction-data-table.component.scss'],
})
export class OpenTransactionDataTableComponent
  implements OnInit, AfterViewInit
{
  public columnValues: any = [];
  userData: any;
  onDestroy$: Subject<boolean> = new Subject();
  public displayedColumns=TRNSC_DATA;
  public dataSource: any = new MatTableDataSource();
  payload: any;
  public filterLoc: any = 'Nothing';
  public itemList: any;
  detailDataInventoryMap: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  cols = [];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
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

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;
  pageEvent: PageEvent;

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

  ngOnInit(): void {
    this.customPagination = {
      total: '',
      recordsPerPage: 20,
      startIndex: 0,
      endIndex: 20,
    };

    this.userData = this.authService.userData();
    // this.cols = this.displayedColumns.map(c => c);

    // this.getTransactionModelIndex;

    // this.getColumnsData();

    // this.initializeApi();
     this.getContentData();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   debugger
  //   // this.displayedColumns = [];

  //   this.displayedColumns = changes['displayedColumns']['currentValue']
  //   console.log(this.displayedColumns);

  // }
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

    this.getContentData();
  }

  getColumnsData() {
    let payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid,
      tableName: 'Hold Transactions ',
    };
    this.transactionService
      .get(payload, '/Admin/GetColumnSequence', true)
      .subscribe(
        (res: any) => {
          this.displayedColumns = TRNSC_DATA;
          if (res.data) {
            this.columnValues = res.data;
            this.columnValues.push('actions');
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

  announceSortChange(e: any) {
    // let index = this.columnValues.findIndex(x => x === e.active );
    // this.sortColumn = {
    //   columnName: index,
    //   sortOrder: e.direction
    // }
    // this.initializeApi();
    // this.getContentData();
  }

  getContentData() {
    this.payload = {
      draw: 0,
      sRow: 0,
      eRow: 10,
      sortColumnNumber: 0,
      sortOrder: 'asc',
      username: '1234',
      identify: 'Order Number',
      reels: 'non',
      orderItem: '011196P',
      wsid: 'TESTWSID',
    };
    this.transactionService
      .get(this.payload, '/Admin/HoldTransactionsData', true)
      .subscribe(
        (res: any) => {
          // this.getTransactionModelIndex();

          this.columnValues.push('actions');
          this.detailDataInventoryMap = res.data?.transactions;
          this.dataSource = new MatTableDataSource(res.data?.holdTransactions);
          //  this.dataSource.paginator = this.paginator;
          this.customPagination.total = res.data?.recordsFiltered;
          this.dataSource.sort = this.sort;
        },
        (error) => {}
      );
  }
}
