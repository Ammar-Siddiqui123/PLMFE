import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/init/auth.service';
import { FloatLabelType } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertConfirmationComponent } from 'src/app/dialogs/alert-confirmation/alert-confirmation.component';

const TRNSC_DATA = [
  { colHeader: 'warehouse', colDef: 'Warehouse' },
  { colHeader: 'locationNumber', colDef: 'Location Number' },
  { colHeader: 'goldenZone', colDef: 'Golden Zone' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'description', colDef: 'Description' },
  { colHeader: 'itemQuantity', colDef: 'Item Quantity' },
  { colHeader: 'quantityAllocatedPick', colDef: 'Quantity Allocated Pick' },
  {
    colHeader: 'quantityAllocatedPutAway',
    colDef: 'Quantity Allocated Put Away',
  },
  { colHeader: 'zone', colDef: 'Zone' },
  { colHeader: 'carousel', colDef: 'Carousel' },
  { colHeader: 'row', colDef: 'Row' },
  { colHeader: 'shelf', colDef: 'Shelf' },
  { colHeader: 'bin', colDef: 'Bin' },
  { colHeader: 'cellSize', colDef: 'Cell Size' },
  { colHeader: 'lotNumber', colDef: 'Serial Lot Number' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'expirationDate', colDef: 'Expiration Date' },
  { colHeader: 'revision', colDef: 'Revision' },
  { colHeader: 'unitOfMeasure', colDef: 'Unit of Measure' },
  { colHeader: 'maximumQuantity', colDef: 'Maximum Quantity' },
  { colHeader: 'putAwayDate', colDef: 'Put Away Date' },
  { colHeader: 'userField1', colDef: 'User Field1' },
  { colHeader: 'userField2', colDef: 'User Field2' },
  { colHeader: 'masterLocation', colDef: 'Master Location' },
  { colHeader: 'dateSensitive', colDef: 'Date Sensitive' },
  { colHeader: 'dedicated', colDef: 'Dedicated' },
  { colHeader: 'masterInvMapID', colDef: 'Master Inv Map ID' },
  { colHeader: 'minQuantity', colDef: 'Min Quantity' },
  { colHeader: 'invMapID', colDef: 'Inv Map ID' },
];

@Component({
  selector: 'app-move-items',
  templateUrl: './move-items.component.html',
  styleUrls: ['./move-items.component.scss'],
})
export class MoveItemsComponent implements OnInit {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  public dataSource: any = new MatTableDataSource();
  userData: any;
  itemNo: any = '';
  reqDate: Date = new Date();
  sortOrder = 'asc';
  sortCol = 0;
  totalRecords = 0;
  startRow = 0;
  endRow = 10;
  recordsPerPage = 10;
  recordsFiltered = 0;
  viewMode = 'NOA';
  viewModeTo = 'NOA';
  viewAll=false
  customLabel = '';
  from_priority = 0;
  from_warehouse = '';
  from_location = '';
  from_itemNo = '';
  from_description = '';
  from_itemQuantity = 0;
  from_cellSize = '';

  from_lotNo = '';
  from_serialNo = '';
  from_moveQty = '';
  fillQty = 0;
  maxMoveQty = 0;
  dedicateMoveTo = false;
  undedicateMoveFrom = false;
  isDedicated = false;
  MoveFromDedicated = '';
  MoveToDedicated = '';
  pageEvent: PageEvent;
  itemNumberSearch = new Subject<string>();
  hideRequiredControl = new FormControl(false);
  searchAutocompletItemNo: any = [];
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.userData = this.authService.userData();
  }

  ngOnInit(): void {
    this.itemNumberSearch
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        // this.autocompleteSearchColumn();
        this.autocompleteSearchColumn();
      });
    this.getMoveItemList('MoveFrom');
    this.getMoveItemList('MoveTo');
  }
  public displayedColumns: any = [
    'warehouse',
    'locationNumber',
    'goldenZone',
    'itemNumber',
    'description',
    'itemQuantity',
    'quantityAllocatedPick',
    'quantityAllocatedPutAway',
    'zone',
    'carousel',
    'row',
    'shelf',
    'bin',
    'cellSize',
    'lotNumber',
    'serialNumber',
    'expirationDate',
    'revision',
    'unitOfMeasure',
    'maximumQuantity',
    'putAwayDate',
    'userField1',
    'userField2',
    'masterLocation',
    'dateSensitive',
    'dedicated',
    'masterInvMapID',
    'minQuantity',
    'invMapID',
  ];
  stageTable: any = [];
  columnSeq: any = [];
  getMoveItemList(tableName) {

    if(tableName==='MoveTo' &&  (this.viewAll || this.dataSource.data.length===0 )){
      this.viewModeTo='All'
    }else{
      this.viewModeTo='NOA'
    }
    
    let payload = {
      draw: 1,
      sRow: this.startRow,
      eRow: this.endRow,
      searchString: this.itemNo,
      searchColumn: 'Item Number',
      sortColumnIndex: this.sortCol,
      sortOrder: this.sortOrder,
      username: this.userData.userName,
      tableName: tableName,
      cellSize: this.from_cellSize,
      warehouse: this.from_warehouse,
      invMapid: -1,
      viewMode: tableName==='MoveFrom'?this.viewMode:this.viewModeTo,
      filter: '1 = 1',
      wsid: this.userData.wsid,
    };
    this.adminService
      .get(payload, '/Admin/GetMoveItemsTable')
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res?.data['moveMapItems']);
        this.totalRecords = res?.data.recordsTotal;
        this.recordsFiltered = res?.data.recordsFiltered;
        this.customLabel = `Showing page ${this.totalRecords} of ${Math.ceil(
          this.totalRecords / this.recordsPerPage
        )}`;

        // this.displayedColumns = TRNSC_DATA;
      });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  async autocompleteSearchColumn() {
    let searchPayload = {
      itemNumber: this.itemNo,
      beginItem: '---',
      isEqual: false,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.adminService.get(searchPayload, '/Common/SearchItem').subscribe(
      (res: any) => {
        this.searchAutocompletItemNo = res.data;
        this.getMoveItemList('MoveFrom');
      },
      (error) => {}
    );
  }
  searchData(event) {}
  isQuantityGreater(quantity: number): boolean {
    return quantity >= 2;
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
    this.getMoveItemList('MoveFrom');
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.customPagination.startIndex =  e.pageIndex
    this.startRow = e.pageSize * e.pageIndex;

    this.endRow = e.pageSize * e.pageIndex + e.pageSize;
    // this.length = e.length;
    this.recordsPerPage = e.pageSize;
    // this.pageIndex = e.pageIndex;

    // this.initializeApi();
    this.getMoveItemList('MoveFrom');
  }
  getMoveFromDetails(row) {
    this.from_warehouse = row.warehouse;
    this.from_location = row.location;
    this.from_itemNo = row.itemNumber;
    this.from_description = row.description;
    this.from_itemQuantity = row.itemQuantity;
    this.from_cellSize = row.cellSize;
    this.from_lotNo = row.lotNumber;
    this.from_serialNo = row.serialNumber;
    this.from_itemQuantity = row.itemQuantity;
    this.MoveFromDedicated =
      row.dedicated === true ? 'Dedicated' : 'Not Dedicated';
    this.isDedicated = row.dedicated === true ? true : false;
    this.fillQty =
      row.itemQuantity - row.maximumQuantity - row.quantityAllocatedPutAway;

    if (this.fillQty < 0) {
      this.fillQty = 0;
    }
    this.maxMoveQty = row.itemQuantity - row.quantityAllocatedPick;
    if (this.maxMoveQty <= 0) {
      this.openAlertDialog('MaxAlloc');
    } else if (row.quantityAllocatedPick > 0) {
      this.openAlertDialog('MoveCap', this.maxMoveQty);
    } else {
      this.from_itemQuantity = this.maxMoveQty;
    }



    this.getMoveItemList('MoveTo')
  }

  openAlertDialog(type, maxMoveQty?) {
    let message = '';
    switch (type) {
      case 'Un-Dedicate':
        message = 'Would you like to Undedicate your move from Location?';
        break;

      case 'Dedicate':
        message = 'Would you like to Dedicate your move to Location?';
        break;
      case 'ZeroQty':
        message =
          'You must specify a Qty greater than 0 to create Move Transactions';
        break;

      case 'MaxMove':
        message =
          'You must specify a Qty less than the Available Qty of ' +
          maxMoveQty +
          ' to create Move transactions';
        break;

      case 'Error':
        message =
          'An Error occured while creating move Transactions. Check the Event log for More information';
        break;

      case 'MoveCap':
        message =
          'Cannot Move more than ' +
          maxMoveQty +
          ' because there are currently Picks allocated to this Location. Deallocate these Transactions if you would like to move more than ' +
          maxMoveQty +
          '.';
        break;

      case 'MaxAlloc':
        message =
          'Your Allocations for the Location exceed or match the current qty. To move from this location, de-allocate transactions to free up inventory';
        break;
      default:
        break;
    }

    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      height: 'auto',
      width: '786px',
      data: {
        message: message,
        heading: '',
        disableCancel: true,
      },
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  validateMove() {
    let moveQty: any = this.from_itemQuantity;
    this.dedicateMoveTo = false;
    this.undedicateMoveFrom = false;
    if (moveQty === '' || moveQty <= 0) {
      this.openAlertDialog('ZeroQty');
      return;
    } else if (moveQty > this.maxMoveQty) {
      this.openAlertDialog('MaxMove', this.maxMoveQty);
      return;
    }
  }
}
