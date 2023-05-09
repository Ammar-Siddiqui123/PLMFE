import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmAddRecordComponent } from 'src/app/dialogs/om-add-record/om-add-record.component';
import { OmCreateOrdersComponent } from 'src/app/dialogs/om-create-orders/om-create-orders.component';
import { OmUpdateRecordComponent } from 'src/app/dialogs/om-update-record/om-update-record.component';
import { OrderManagerService } from '../order-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-om-order-manager',
  templateUrl: './om-order-manager.component.html',
  styleUrls: ['./om-order-manager.component.scss']
})
export class OmOrderManagerComponent implements OnInit {
  
  public userData: any;

  column    : string = "";
  case      : string = "";
  value1    : string = "";
  value1D   : Date = new Date();
  value2    : string = "";
  value2D   : Date = new Date();
  maxOrders : number = 0;
  transType : string = "";
  viewType  : string = "";
  orderType : string = "";

  colList   : any = [];
  searchCol : string = "";
  searchTxt : string = "";
  
  INVMAP_DATA : any = [
    { colHeader: "location", colDef: "Location" },
    { colHeader: "zone", colDef: "Zone" },
    { colHeader: "carousel", colDef: "Carousel" },
    { colHeader: "row", colDef: "Row" },
    { colHeader: "shelf", colDef: "Shelf" },
    { colHeader: "bin", colDef: "Bin" },
    { colHeader: "itemNumber", colDef: "Item Number" },
    { colHeader: "itemQuantity", colDef: "Item Quantity" },
    { colHeader: "description", colDef: "Description" },
    { colHeader: "cellSize", colDef: "Cell Size" },
    { colHeader: "goldenZone", colDef: "Velocity Code" },
    { colHeader: "maxQuantity", colDef: "Maximum Quantity" },
    { colHeader: "dedicated", colDef: "Dedicated" },
    { colHeader: "serialNumber", colDef: "Serial Number" },
    { colHeader: "lotNumber", colDef: "Lot Number" },
    { colHeader: "expirationDate", colDef: "Expiration Date" },
    { colHeader: "unitOfMeasure", colDef: "Unit of Measure" },
    { colHeader: "quantityAllocatedPick", colDef: "Quantity Allocated Pick" },
    { colHeader: "quantityAllocatedPutAway", colDef: "Quantity Allocated Put Away" },
    { colHeader: "putAwayDate", colDef: "Put Away Date" },
    { colHeader: "warehouse", colDef: "Warehouse" },
    { colHeader: "revision", colDef: "Revision" },
    { colHeader: "invMapID", colDef: "Inv Map ID" },
    { colHeader: "userField1", colDef: "User Field1" },
    { colHeader: "userField2", colDef: "User Field2" },
    { colHeader: "masterLocation", colDef: "Master Location" },
    { colHeader: "dateSensitive", colDef: "Date Sensitive" },
    { colHeader: "masterInvMapID", colDef: "Master Inv Map ID" },
    { colHeader: "minQuantity", colDef: "Min Quantity" },
    { colHeader: "laserX", colDef: "Laser X" },
    { colHeader: "laserY", colDef: "Laser Y" },
    { colHeader: "locationNumber", colDef: "Location Number" },
    { colHeader: "locationID", colDef: "Alternate Light" },
    // { colHeader: "qtyAlcPutAway", colDef: "Quantity Allocated Put Away" },
  ];
  displayedColumns  : string[] = []; // ['orderNo', 'priority', 'requiredDate', 'uf1', 'uf2', 'uf3', 'actions']; 
  orderTable        : any = ['10','10','10','10','10','10'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog          : MatDialog,
              private _liveAnnouncer  : LiveAnnouncer,
              private toastr          : ToastrService,
              private OMService       : OrderManagerService,
              private authService     : AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getColumnSequence();
  }  

  getColumnSequence() {
    let payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid,
      tableName: 'Order Manager'
    };

    this.OMService.get(payload, '/Admin/GetColumnSequence').subscribe((res: any) => {
      if (res.isExecuted) {
        this.displayedColumns = res.data;
        this.colList = structuredClone(res.data);
        this.displayedColumns.push('actions', 'Status');
      }
    });
  }

  getOrders() {

    let val1 : any, val2 : any;

    if (this.column.indexOf('Date') > -1) {
      val1 = this.value1D;
      val2 = this.value2D;
    } else {
      val1 = this.value1;
      val2 = this.value2;      
    }

    let payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid,
      column: this.column,
      case: this.case,
      value1: val1,
      value2: val2,
      maxOrders: this.maxOrders,
      transType: this.transType,
      viewType: this.viewType,
      orderType: this.orderType,
    };

    this.OMService.get(payload, '/OrderManager/FillOrderManTempData').subscribe((res: any) => {
      if (res.isExecuted) {

        let payload2 = {
          username: this.userData.userName,
          wsid: this.userData.wsid,
          startRow: "0",
          endRow: "10",
          sortCol: 0,
          sortOrder: "asc",
          searchColumn: this.searchCol,
          searchString: this.searchTxt,
        };

        this.OMService.get(payload2, '/OrderManager/SelectOrderManagerTempDTNew').subscribe((res: any) => {
          this.orderTable = new MatTableDataSource(res.data.transactions);
          this.orderTable.paginator = this.paginator;
        });        
      }
      else this.toastr.error("An Error occured while retrieving data.", 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
    });
  }

  updateRecord(ele : any) {
    let dialogRef = this.dialog.open(OmUpdateRecordComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data: { ele }
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  clearSearch() {
  }

  openOmCreateOrders() { 
    let dialogRef = this.dialog.open(OmCreateOrdersComponent, { 
      height: 'auto',
      width: '1424px',
      autoFocus: '__non_existing_element__', 
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  // Announce the new sort state, if any.
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      // Announce the sort direction, and the fact that sorting is cleared.
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

    // Set the data source's sort property to the new sort.
    this.orderTable.sort = this.sort;
  }

}
