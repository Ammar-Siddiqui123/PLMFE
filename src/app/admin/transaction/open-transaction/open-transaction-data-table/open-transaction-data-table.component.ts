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

const INVMAP_DATA = [
  { colHeader: 'location', colDef: 'Location' },
  { colHeader: 'zone', colDef: 'Zone' },
  { colHeader: 'carousel', colDef: 'Carousel' },
  { colHeader: 'row', colDef: 'Row' },
  { colHeader: 'shelf', colDef: 'Shelf' },
  { colHeader: 'bin', colDef: 'Bin' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'itemQuantity', colDef: 'Item Quantity' },
  { colHeader: 'description', colDef: 'Description' },
  { colHeader: 'cellSize', colDef: 'Cell Size' },
  { colHeader: 'goldenZone', colDef: 'Velocity Code' },
  { colHeader: 'maximumQuantity', colDef: 'Maximum Quantity' },
  { colHeader: 'dedicated', colDef: 'Dedicated' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'lotNumber', colDef: 'Lot Number' },
  { colHeader: 'expirationDate', colDef: 'Expiration Date' },
  { colHeader: 'unitOfMeasure', colDef: 'Unit of Measure' },
  { colHeader: 'quantityAllocatedPick', colDef: 'Quantity Allocated Pick' },
  {
    colHeader: 'quantityAllocatedPutAway',
    colDef: 'Quantity Allocated Put Awa',
  },
  { colHeader: 'putAwayDate', colDef: 'Put Away Date' },
  { colHeader: 'warehouse', colDef: 'Warehouse' },
  { colHeader: 'revision', colDef: 'Revision' },
  { colHeader: 'invMapID', colDef: 'Inv Map ID' },
  { colHeader: 'userField1', colDef: 'User Field1' },
  { colHeader: 'userField2', colDef: 'User Field2' },
  { colHeader: 'masterLocation', colDef: 'Master Location' },
  { colHeader: 'dateSensitive', colDef: 'Date Sensitive' },
  { colHeader: 'masterInvMapID', colDef: 'Master Inv Map ID' },
  { colHeader: 'minQuantity', colDef: 'Min Quantity' },
  { colHeader: 'laserX', colDef: 'Laser X' },
  { colHeader: 'laserY', colDef: 'Laser Y' },
  { colHeader: 'locationNumber', colDef: 'Location Number' },
  { colHeader: 'locationID', colDef: 'Alternate Light' },
  { colHeader: 'qtyAlcPutAway', colDef: 'Quantity Allocated Put Away' },
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
  public displayedColumns: any;
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

    this.initializeApi();
    this.getColumnsData();

    // this.initializeApi();
    //  this.getContentData();
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

    this.initializeApi();
    this.getContentData();
  }
  viewLocationHistory() {}
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
    this.seqColumn
      .getSetColumnSeq()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        this.displayedColumns = INVMAP_DATA;

        if (res?.data?.columnSequence) {
          this.columnValues = res.data?.columnSequence;
          this.columnValues.push('actions');
          this.getContentData();
        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      });
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
    this.invMapService
      .getInventoryMap(this.payload)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        debugger;
        this.itemList = res.data?.inventoryMaps?.map((arr) => {
          return { itemNumber: arr.itemNumber, desc: arr.description };
        });

        this.detailDataInventoryMap = res.data?.inventoryMaps;
        this.dataSource = new MatTableDataSource(res.data?.inventoryMaps);
        //  this.dataSource.paginator = this.paginator;
        this.customPagination.total = res.data?.recordsFiltered;
        this.dataSource.sort = this.sort;
      });
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
          // this.displayOrderCols=res.data.openTransactionColumns;
        },
        (error) => {
          debugger;
        }
      );
  }
}
