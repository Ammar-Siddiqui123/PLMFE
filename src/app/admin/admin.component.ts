import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../init/auth.service';
import { AdminService } from './admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TransactionService } from './transaction/transaction.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public columnValues: any = [];
  public dataSource: any = new MatTableDataSource();
  public userData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public sortCol: any = 3;
  public sortOrder: any = 'asc';
  pageEvent: PageEvent;
  searchValue: any = '';
  searchAutocompleteList: any;
  private _liveAnnouncer: LiveAnnouncer;
  searchByInput: any = new Subject<string>();
  @ViewChild(MatSort) sort: MatSort;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  picksOpen = 0;
  picksCompleted = 0;
  picksPerHour = 0;

  putsOpen = 0;
  putsCompleted = 0;
  putsPerHour = 0;

  countOpen = 0;
  countCompleted = 0;
  countPerHour = 0;

  adjustmentOpen = 0;
  adjustmentCompleted = 0;
  adjustmentPerHour = 0;

  reprocessOpen = 0;
  reprocessCompleted = 0;
  reprocessPerHour = 0;

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
  public Order_Table_Config = [
    { colHeader: 'zone', colDef: 'Zone' },
    { colHeader: 'warehouse', colDef: 'Warehouse' },
    { colHeader: 'locationName', colDef: 'Location' },
    { colHeader: 'totalPicks', colDef: 'Lines' },
    { colHeader: 'transactionType', colDef: 'Transaction Type' },
  ];
  public displayedColumns: string[] = [
    'zone',
    'warehouse',
    'locationName',
    'totalPicks',
    'transactionType',
  ];
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private transactionService: TransactionService
  ) {}
  inventoryDetail = new FormGroup({
    item: new FormControl({ value: ' ', disabled: true }),
    description: new FormControl({ value: '', disabled: true }),
    supplierNo: new FormControl({ value: '', disabled: true }),
    minRTSReelQty: new FormControl({ value: '', disabled: true }),
    primaryPickZone: new FormControl({ value: '', disabled: true }),
    secondaryPickZone: new FormControl({ value: '', disabled: true }),
    category: new FormControl({ value: '', disabled: true }),
    subCategory: new FormControl({ value: '', disabled: true }),
    manufacture: new FormControl({ value: '', disabled: true }),
    model: new FormControl({ value: '', disabled: true }),
    supplierItemID: new FormControl({ value: '', disabled: true }),
    avgPieceWeight: new FormControl({ value: '', disabled: true }),
    um: new FormControl({ value: '', disabled: true }),
    minUseScaleQty: new FormControl({ value: '', disabled: true }),
    pickSequence: new FormControl({ value: '', disabled: true }),
    unitCost: new FormControl({ value: '', disabled: true }),
    caseQty: new FormControl({ value: '', disabled: true }),
    carouselMaxQty: new FormControl({ value: '', disabled: true }),
    carouselCellSize: new FormControl({ value: '', disabled: true }),
    carouselVelocity: new FormControl({ value: '', disabled: true }),
    carouselMinQty: new FormControl({ value: '', disabled: true }),
    sampleQty: new FormControl({ value: '', disabled: true }),
    bulkCellSize: new FormControl({ value: '', disabled: true }),
    bulkVelocity: new FormControl({ value: '', disabled: true }),
    bulkMinQty: new FormControl({ value: '', disabled: true }),
    bulkMaxQty: new FormControl({ value: '', disabled: true }),
    cfCellSize: new FormControl({ value: '', disabled: true }),
    cfVelocity: new FormControl({ value: '', disabled: true }),
    cfMinQty: new FormControl({ value: '', disabled: true }),
    cfMaxQty: new FormControl({ value: '', disabled: true }),
  });
  ngOnInit(): void {
    this.searchByInput
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.searchValue = value;
        this.autocompleteSearchColumn();
      });
    this.userData = this.authService.userData();
    this.getAdminMenu();
  }
  searchData() {
    if (
      this.columnSearch.searchColumn ||
      this.columnSearch.searchColumn == ''
    ) {
      this.getInvDetailsList();
    }
  }

  async autocompleteSearchColumn() {
    let searchPayload = {
     
      stockCode:this.searchValue,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.transactionService
      .get(searchPayload, '/Admin/GetLocationTable', true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
        },
        (error) => {}
      );
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getInvDetailsList() {
    let payload = {
      itemNumber: this.searchValue,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(payload, '/Admin/GetInventoryMasterData', true)
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
          }
        },
        (error) => {}
      );
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
    // this.getContentData();
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
    // this.getContentData();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.dataSource.sort = this.sort;
  }
  getAdminMenu() {
    let payload = {
      userName: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.adminService
      .get(payload, '/Admin/GetAdminMenu')
      .subscribe((res: any) => {
        if (res && res.data.totalOrders) {
          this.dataSource = new MatTableDataSource(
            res.data.totalOrders.orderTable
          );
        }
        if (res && res.data.totalOrders && res.data.totalOrders.adminValues) {
          let item = res.data.totalOrders.adminValues;
          this.picksOpen = item.openPicks;
          this.picksCompleted = item.completedPicksToday;
          this.picksPerHour = item.completedPickHours;

          this.putsOpen = item.openPuts;
          this.putsCompleted = item.completedPutsToday;

          this.countOpen = item.openCounts;
          this.countCompleted = item.completedCountsToday;

          this.adjustmentOpen = item.adjustmentsToday;

          this.reprocessOpen = item.reprocess;
        }
      });
  }
  isLookUp = false;

  backAdminAction() {
    this.isLookUp = !this.isLookUp;
  }

  ngOnDestroy() {
    this.searchByInput.unsubscribe();
  }
}
