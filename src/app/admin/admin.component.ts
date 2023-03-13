import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../init/auth.service';
import { AdminService } from './admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

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
  private _liveAnnouncer: LiveAnnouncer
  @ViewChild(MatSort) sort: MatSort;

    picksOpen=0;
    picksCompleted=0;
    picksPerHour=0;

    putsOpen=0;
    putsCompleted=0;
    putsPerHour=0;

    countOpen=0;
    countCompleted=0;
    countPerHour=0;

    adjustmentOpen=0;
    adjustmentCompleted=0;
    adjustmentPerHour=0;

    reprocessOpen=0;
    reprocessCompleted=0;
    reprocessPerHour=0;


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
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getAdminMenu()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      userName:  this.userData.userName,
      wsid:this.userData.wsid,
    };

    this.adminService.get(payload,'/Admin/GetAdminMenu').subscribe((res:any)=>{
      if(res && res.data.totalOrders){
        this.dataSource = new MatTableDataSource(res.data.totalOrders.orderTable);
      }
      if(res && res.data.totalOrders && res.data.totalOrders.adminValues){
        let item=res.data.totalOrders.adminValues;
        this.picksOpen=item.openPicks;
        this.picksCompleted=item.completedPicksToday;
        this.picksPerHour=item.completedPickHours;

        this.putsOpen=item.openPuts;
        this.putsCompleted=item.completedPutsToday;
        
        this.countOpen=item.openCounts;
        this.countCompleted=item.completedCountsToday;

        this.adjustmentOpen=item.adjustmentsToday;

        this.reprocessOpen=item.reprocess;
      }
    })
  }
  isLookUp = false;

  backAdminAction(){
    this.isLookUp= !this.isLookUp;
  }
}
