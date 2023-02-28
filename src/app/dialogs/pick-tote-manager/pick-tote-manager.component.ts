import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ProcessPicksService } from '../../../app/induction-manager/process-picks/process-picks.service';
import { AuthService } from '../../../app/init/auth.service';
import { AddFilterFunction } from '../add-filter-function/add-filter-function.component';
import labels from '../../labels/labels.json';
import { DeleteConfirmationComponent } from '../../../app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  // { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-pick-tote-manager',
  templateUrl: './pick-tote-manager.component.html',
  styleUrls: ['./pick-tote-manager.component.scss']
})
export class PickToteManagerComponent implements OnInit {
  isFilter: string = 'filter'
  savedFilterList: any[] = [];
  filteredOptions: Observable<any[]>;
  savedFilter = new FormControl('');
  userData: any;
  FILTER_DATA: any[] = [];
  ORDER_BY_DATA: any[] = [];
  FILTER_BATCH_DATA: any[] = [];
  FILTER_BATCH_DATA_ZONE: any[] = [];
  useDefaultFilter;
  useDefaultZone;
  batchByZoneData: any[] = [];
  F_ORDER_TRANS: any[] = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  dataSource: any;
  orderBydataSource: any;
  pickBatchFilter: any;
  batchByZoneSource: any;
  filterBatchOrders: any;
  filterBatchOrdersZone: any;
  pickBatchOrder: any;
  filterOrderTransactionSource: any;
  zoneOrderTransactionSource: any;
  selectedOrders: any[] = [];
  selectedZoneOrders: any[] = [];
  filterSeq: any = '0';
  orderBySeq: any = '0';
  isFilterAdd: boolean = false;
  isOrderByAdd: boolean = false;
  onDestroy$: Subject<boolean> = new Subject();
  selection = new SelectionModel<PeriodicElement>(true, []);
  disFilterColumns: string[] = ['sequence', 'field', 'criteria', 'value', 'andOr', 'actions'];
  disOrderColumns: string[] = ['sequence', 'field', 'sortOrder', 'actions', 'id'];

  displayedColumns1: string[] = ['position', 'toteid', 'orderno', 'other'];
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);




  displayedColumns2: string[] = ['orderno', 'requireddate', 'priority'];
  filterBatchOrderColums: string[] = ['orderno', 'requireddate', 'priority'];

  displayedColumns3: string[] = ['orderno', 'itemno', 'transaction', 'location'];
  filterBatchTransColumns = [
    { columnDef: 'orderNumber', header: 'orderNumber', cell: (element: any) => `${element.orderNumber}` },
    { columnDef: 'itemNumber', header: 'itemNumber', cell: (element: any) => `${element.itemNumber}` },
    { columnDef: 'transactionQuantity', header: 'transactionQuantity', cell: (element: any) => `${element.transactionQuantity}` },
    { columnDef: 'location', header: 'location', cell: (element: any) => `${element.location}` },
    { columnDef: 'completedQuantity', header: 'completedQuantity', cell: (element: any) => `${element.completedQuantity}` },
    { columnDef: 'description', header: 'description', cell: (element: any) => `${element.description}` },
    { columnDef: 'batchPickID', header: 'batchPickID', cell: (element: any) => `${element.batchPickID}` },
    { columnDef: 'bin', header: 'bin', cell: (element: any) => `${element.bin}` },
    { columnDef: 'carousel', header: 'carousel', cell: (element: any) => `${element.carousel}` },
    { columnDef: 'cell', header: 'cell', cell: (element: any) => `${element.cell}` },
    { columnDef: 'completedBy', header: 'completedBy', cell: (element: any) => `${element.completedBy}` },
    { columnDef: 'completedDate', header: 'completedDate', cell: (element: any) => `${element.completedDate}` },
    { columnDef: 'emergency', header: 'emergency', cell: (element: any) => `${element.emergency}` },
    { columnDef: 'expirationDate', header: 'expirationDate', cell: (element: any) => `${element.expirationDate}` },
    { columnDef: 'exportBatchID', header: 'exportBatchID', cell: (element: any) => `${element.exportBatchID}` },
    { columnDef: 'exportDate', header: 'exportDate', cell: (element: any) => `${element.exportDate}` },
    { columnDef: 'exportedBy', header: 'exportedBy', cell: (element: any) => `${element.exportedBy}` },
    { columnDef: 'hostTransactionID', header: 'hostTransactionID', cell: (element: any) => `${element.hostTransactionID}` },
    { columnDef: 'id', header: 'id', cell: (element: any) => `${element.id}` },
    { columnDef: 'importBy', header: 'importBy', cell: (element: any) => `${element.importBy}` },
    { columnDef: 'importDate', header: 'importDate', cell: (element: any) => `${element.importDate}` },
    { columnDef: 'importFilename', header: 'importFilename', cell: (element: any) => `${element.importFilename}` },
    { columnDef: 'invMapID', header: 'invMapID', cell: (element: any) => `${element.invMapID}` },
    { columnDef: 'lineNumber', header: 'lineNumber', cell: (element: any) => `${element.lineNumber}` },
    { columnDef: 'lineSequence', header: 'lineSequence', cell: (element: any) => `${element.lineSequence}` },
    { columnDef: 'lotNumber', header: 'lotNumber', cell: (element: any) => `${element.lotNumber}` },
    { columnDef: 'masterRecord', header: 'masterRecord', cell: (element: any) => `${element.masterRecord}` },
    { columnDef: 'masterRecordID', header: 'masterRecordID', cell: (element: any) => `${element.masterRecordID}` },
    { columnDef: 'notes', header: 'notes', cell: (element: any) => `${element.notes}` },
    { columnDef: 'priority', header: 'priority', cell: (element: any) => `${element.priority}` },
    { columnDef: 'requiredDate', header: 'requiredDate', cell: (element: any) => `${element.requiredDate}` },
    { columnDef: 'revision', header: 'revision', cell: (element: any) => `${element.revision}` },
    { columnDef: 'row', header: 'row', cell: (element: any) => `${element.row}` },
    { columnDef: 'serialNumber', header: 'serialNumber', cell: (element: any) => `${element.serialNumber}` },
    { columnDef: 'shelf', header: 'shelf', cell: (element: any) => `${element.shelf}` },
    { columnDef: 'statusCode', header: 'statusCode', cell: (element: any) => `${element.statusCode}` },
    { columnDef: 'toteID', header: 'toteID', cell: (element: any) => `${element.toteID}` },
    { columnDef: 'toteNumber', header: 'toteNumber', cell: (element: any) => `${element.toteNumber}` },
    { columnDef: 'unitOfMeasure', header: 'unitOfMeasure', cell: (element: any) => `${element.unitOfMeasure}` },
    { columnDef: 'userField1', header: 'userField1', cell: (element: any) => `${element.userField1}` },
    { columnDef: 'userField2', header: 'userField2', cell: (element: any) => `${element.userField2}` },
    { columnDef: 'userField3', header: 'userField3', cell: (element: any) => `${element.userField3}` },
    { columnDef: 'userField4', header: 'userField4', cell: (element: any) => `${element.userField4}` },
    { columnDef: 'userField5', header: 'userField5', cell: (element: any) => `${element.userField5}` },
    { columnDef: 'userField6', header: 'userField6', cell: (element: any) => `${element.userField6}` },
    { columnDef: 'userField7', header: 'userField7', cell: (element: any) => `${element.userField7}` },
    { columnDef: 'userField8', header: 'userField8', cell: (element: any) => `${element.userField8}` },
    { columnDef: 'userField9', header: 'userField9', cell: (element: any) => `${element.userField9}` },
    { columnDef: 'userField10', header: 'userField10', cell: (element: any) => `${element.userField10}` },
    { columnDef: 'warehouse', header: 'warehouse', cell: (element: any) => `${element.warehouse}` },
    { columnDef: 'zone', header: 'zone', cell: (element: any) => `${element.zone}` },
  ];

  displayedTransColumns = this.filterBatchTransColumns.map(c => c.columnDef);

  displayedColumns4: string[] = ['select', 'zone', 'batchtype', 'totalorders', 'totallocations', 'other'];
  batchByOrderColumns: string[] = ['default', 'zone', 'batchtype', 'totalorders', 'totallocations', 'actions'];
  @ViewChild('filterBatchOrder') filterBatchOrder: MatPaginator;
  @ViewChild('filterBatchTrans') filterBatchTrans: MatPaginator;
  @ViewChild('zoneBatchOrder') zoneBatchOrder: MatPaginator;
  @ViewChild('zoneBatchTrans') zoneBatchTrans: MatPaginator;
  // @ViewChild('batchByZonePaginator', {read: true}) batchByZonePaginator: MatPaginator;
  @ViewChild('batchByZonePaginator', { static: false })
  set paginator(value: MatPaginator) {
    this.batchByZoneSource.paginator = value;
  }
  constructor(
    private dialog: MatDialog,
    private pPickService: ProcessPicksService,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.savedFilterList = [];
    this.userData = this.authService.userData();
    this.getSavedFilters();
    this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
    this.dataSource1 = new MatTableDataSource<any>(this.FILTER_DATA);
    this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
    this.pickBatchZonesSelect();
    if (this.data.useDefaultFilter) {
      this.isFilter = 'filter'
    }
    else {
      this.isFilter = 'zone'
    }
  }

  pickBatchZonesSelect() {
    let paylaod = {
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/PickBatchZonesSelect').subscribe(res => {
      if (res.data) {
        this.batchByZoneData = res.data
        this.batchByZoneSource = new MatTableDataSource<any>(this.batchByZoneData);
        // this.batchByZoneSource.paginator = this.batchByZonePaginator;
      }
    });
  }

  ngAfterViewInit() {
    // this.batchByZoneSource.paginator = this.batchByZonePaginator;
  }

  getSavedFilters() {
    let paylaod = {
      "filter": "",
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/PickBatchFilterTypeAhead').subscribe((res) => {
      if (res.data) {
        console.log(res.data);
        this.savedFilterList = res.data;
        this.filteredOptions = this.savedFilter.valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value)),
          map(name => (name ? this._filter(name) : this.savedFilterList.slice()))
        );
      }
    });
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.savedFilterList.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onAddFilter(filterData?: any) {
    // console.log(filterData);
    if (filterData) {
      filterData.map(obj => {
        this.FILTER_DATA.push({ sequence: obj.sequence, field: obj.field, criteria: obj.criteria, value: obj.value, andOr: obj.andOr });
        this.filterSeq = obj.sequence
      });
      this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
    }
    else {
      this.FILTER_DATA.push({ sequence: this.filterSeq + 1, field: 'Emergency', criteria: 'Equals', value: '', andOr: 'And' });

      this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
      this.isFilterAdd = false;
    }
  }
  onAddOrderBy(filterData?: any) {
    // console.log(filterData);
    if (filterData) {
      filterData.map(obj => {
        this.ORDER_BY_DATA.push({ id: obj.id, sequence: obj.sequence, field: obj.field, sortOrder: obj.order });
        this.orderBySeq = obj.sequence
      });
      this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
    }
    else {
      this.ORDER_BY_DATA.push({ sequence: this.orderBySeq + 1, field: 'Emergency', sortOrder: 'DESC' });
      this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
      this.isOrderByAdd = false;
    }
  }
  onFilterAction(option: any) {
    if (option.value === 'add_new_filter') {
      const dialogRef = this.dialog.open(AddFilterFunction, {
        height: 'auto',
        width: '500px',
        autoFocus: '__non_existing_element__'
      })
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
        this.savedFilterList.push(result);
        this.savedFilter.setValue(result);
        this.isFilterAdd = true;
        this.isOrderByAdd = true;
        this.filterSeq = '0';
        this.orderBySeq = '0';
        this.pickBatchFilterOrderData(result);
      });
    }
    if (option.value === 'rename') {
      const dialogRef = this.dialog.open(AddFilterFunction, {
        height: 'auto',
        width: '500px',
        data: {
          savedFilter: this.savedFilter.value
        },
        autoFocus: '__non_existing_element__'
      });
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
        this.savedFilterList = this.savedFilterList.filter(item => item !== result.oldFilter);
        this.savedFilterList.push(result.newFilter);
        this.savedFilter.setValue(result.newFilter);
        const matSelect: MatSelect = option.source;
        matSelect.writeValue(null);
      });
    }
    if (option.value === 'set_default') {
      let paylaod = {
        "Description": this.savedFilter.value,
        "wsid": this.userData.wsid
      }
      this.pPickService.get(paylaod, '/Induction/PickBatchDefaultFilterMark').subscribe(res => {
        if (res.isExecuted) {
          this.toastr.success(labels.alert.update, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          const matSelect: MatSelect = option.source;
          matSelect.writeValue(null);
        }

      });
    }
    if (option.value === 'clear_default') {
      let paylaod = {
        "wsid": this.userData.wsid
      }
      this.pPickService.get(paylaod, '/Induction/PickBatchDefaultFilterClear').subscribe(res => {
        if (res.isExecuted) {
          this.toastr.success(labels.alert.update, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          const matSelect: MatSelect = option.source;
          matSelect.writeValue(null);
        }
      });
    }
    if (option.value === 'view_default') {
      let paylaod = {
        "wsid": this.userData.wsid
      }
      this.pPickService.get(paylaod, '/Induction/PickBatchDefaultFilterSelect').subscribe(res => {
        if (res.data) {
          console.log(res.data);
          this.savedFilter.setValue(res.data);
          this.isFilterAdd = true;
          this.isOrderByAdd = true;
          this.filterSeq = '0';
          this.orderBySeq = '0';
          this.pickBatchFilterOrderData(res.data);
        }
        else {
          this.toastr.error('No filter is marked as default.', 'Warning!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
        const matSelect: MatSelect = option.source;
        matSelect.writeValue(null);
      });

    }
    if (option.value === 'delete_selected_filter') {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Yes') {
          let paylaod = {
            "Description": this.savedFilter.value,
            "wsid": this.userData.wsid
          }
          this.pPickService.get(paylaod, '/Induction/PickBatchFilterBatchDelete').subscribe(res => {
            if (res.isExecuted) {
              this.toastr.success(labels.alert.delete, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              this.savedFilterList = this.savedFilterList.filter(item => item !== this.savedFilter.value);
              this.savedFilter.setValue('');
              this.savedFilClosed();
              const matSelect: MatSelect = option.source;
              matSelect.writeValue(null);
            }

          });
        }
      })

    }
  }
  onSavedFilterChange(val: any) {
    if (val.option.value) {
      this.isFilterAdd = true;
      this.isOrderByAdd = true;
      this.filterSeq = '0';
      this.orderBySeq = '0';
      this.pickBatchFilterOrderData(val.option.value);
      this.ordersFilterZoneSelect();
    }
  }
  ordersFilterZoneSelect(zone = "", rp = false, type = "") {
    let payload;
    if (zone == "") {
      payload = {
        "Filter": this.savedFilter.value,
        "Zone": "",
        "BatchType": "",
        "UseDefFilter": 0,
        "UseDefZone": 0,
        "RP": false,
        "WSID": "TESTWSID"
      }
      this.pPickService.get(payload, '/Induction/OrdersFilterZoneSelect').subscribe(res => {
        if (res.data) {
          res.data.map(val => {
            this.FILTER_BATCH_DATA.push({ 'orderNumber': val.orderNumber, 'reqDate': val.reqDate, 'priority': val.priority, isSelected: false });
          });
          this.filterBatchOrders = new MatTableDataSource<any>(this.FILTER_BATCH_DATA);
          this.filterBatchOrders.paginator = this.filterBatchOrder;
        }
      });
    }
    else {
      payload = {
        "Filter": "",
        "Zone": zone,
        "BatchType": type,
        "UseDefFilter": 0,
        "UseDefZone": 0,
        "RP": rp,
        "WSID": "TESTWSID"
      }
      this.pPickService.get(payload, '/Induction/OrdersFilterZoneSelect').subscribe(res => {
        if (res.data) {
          console.log(res);
          res.data.map(val => {
            this.FILTER_BATCH_DATA_ZONE.push({ 'orderNumber': val.orderNumber, 'reqDate': val.reqDate, 'priority': val.priority, isSelected: false });
          });
          this.filterBatchOrdersZone = new MatTableDataSource<any>(this.FILTER_BATCH_DATA_ZONE);
          this.filterBatchOrdersZone.paginator = this.zoneBatchOrder;
        }
      });
    }

  }

  viewReplenishZoneRecord(viewReplenish = "", element: any, rp: any) {
    if (viewReplenish == "") {
      this.ordersFilterZoneSelect(element.zone, true, element.type);

    }
    else {
      this.ordersFilterZoneSelect(element.zone, false, element.type);
    }
  }


  onOrderSelect(row: any) {
    if (this.selectedOrders.includes(row.orderNumber)) {
      this.FILTER_BATCH_DATA.filter(val => {
        if (val.orderNumber === row.orderNumber) {
          val.isSelected = false;
          this.filterOrderTransactionSource = []
        }
      });
      this.selectedOrders = this.selectedOrders.filter(item => item !== row.orderNumber)
    }
    else if (this.selectedOrders.length >= this.data.pickBatchQuantity) {
      this.toastr.error('No open totes in batch', 'Batch is Filled.', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else {
      this.selectedOrders.push(row.orderNumber);
      this.FILTER_BATCH_DATA.filter(val => {
        if (val.orderNumber === row.orderNumber) {
          val.isSelected = true;
        }
      });
      let paylaod = {
        "Draw": 0,
        "OrderNumber": row.orderNumber,
        "sRow": 1,
        "eRow": 10,
        "SortColumnNumber": 0,
        "SortOrder": "asc",
        "Filter": "1=1",
        "Username": this.userData.username,
        "wsid": this.userData.wsid,
      }
      this.pPickService.get(paylaod, '/Induction/InZoneTransDT').subscribe((res) => {
        if (res.data) {
          this.filterOrderTransactionSource = new MatTableDataSource<any>(res.data.pickToteManTrans);
          this.filterOrderTransactionSource.paginator = this.filterBatchTrans;
        }
      });
    }
    // console.log(this.selectedOrders);

  }


  onOrderSelectZone(row: any) {
    if (this.selectedOrders.includes(row.orderNumber)) {
      this.FILTER_BATCH_DATA_ZONE.filter(val => {
        if (val.orderNumber === row.orderNumber) {
          val.isSelected = false;
          this.zoneOrderTransactionSource = [];
        }
      });
      this.selectedOrders = this.selectedOrders.filter(item => item !== row.orderNumber)
    }
    else if (this.selectedOrders.length >= this.data.pickBatchQuantity) {
      this.toastr.error('No open totes in batch', 'Batch is Filled.', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else {
      this.selectedOrders.push(row.orderNumber);
      this.FILTER_BATCH_DATA_ZONE.filter(val => {
        if (val.orderNumber === row.orderNumber) {
          val.isSelected = true;
        }
      });
      let paylaod = {
        "Draw": 0,
        "OrderNumber": row.orderNumber,
        "sRow": 1,
        "eRow": 10,
        "SortColumnNumber": 0,
        "SortOrder": "asc",
        "Filter": "1=1",
        "Username": this.userData.username,
        "wsid": this.userData.wsid,
      }
      this.pPickService.get(paylaod, '/Induction/InZoneTransDT').subscribe((res) => {
        if (res.data) {
          this.zoneOrderTransactionSource = new MatTableDataSource<any>(res.data.pickToteManTrans);
          this.zoneOrderTransactionSource.paginator = this.zoneBatchTrans;
        }
      });
    }

  }
  pickBatchFilterOrderData(filter: string | null) {
    let paylaod = {
      "filter": filter,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/PickBatchFilterOrderData').subscribe(res => {
      if (res.data) {
        this.FILTER_DATA = [];
        this.ORDER_BY_DATA = [];
        this.pickBatchFilter = res.data.pickBatchFilter
        this.pickBatchOrder = res.data.pickBatchOrder
        if (!this.pickBatchFilter) {
          this.onAddFilter();
        } else {
          this.onAddFilter(this.pickBatchFilter);
        }

        if (!this.pickBatchOrder) {
          // this.onAddOrderBy();
        } else {
          this.onAddOrderBy(this.pickBatchOrder);
        }
      }
    });
  }
  savedFilClosed() {
    if (!this.savedFilter.value) {
      this.isFilterAdd = false;
      this.isOrderByAdd = false;
      this.FILTER_DATA = [];
      this.ORDER_BY_DATA = [];
      this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
      this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
    }

  }
  onChangeOrderAction(option: any) {
    if (option === 'fill_top_orders') {
      for (let index = 0; index < this.data.pickBatchQuantity; index++) {
        this.FILTER_BATCH_DATA[index].isSelected = true;
        this.selectedOrders.push(this.FILTER_BATCH_DATA[index].orderNumber);
      }
    }
    if (option === 'unselect_all_orders') {
      for (let index = 0; index < this.data.pickBatchQuantity; index++) {
        this.FILTER_BATCH_DATA[index].isSelected = false;
        this.selectedOrders = [];
      }
    }
  }
  onChangeOrderActionZone(option: any) {
    if (option === 'fill_top_orders') {
      for (let index = 0; index < this.data.pickBatchQuantity; index++) {
        this.FILTER_BATCH_DATA_ZONE[index].isSelected = true;
        this.selectedOrders.push(this.FILTER_BATCH_DATA_ZONE[index].orderNumber);
      }
    }
    if (option === 'unselect_all_orders') {
      for (let index = 0; index < this.data.pickBatchQuantity; index++) {
        this.FILTER_BATCH_DATA_ZONE[index].isSelected = false;
        this.selectedOrders = [];
      }
    }
  }

  onSaveSingleFilter(element: any) {
    if (element.value === '') {
      this.toastr.error('Some of the inputs are missing values. Cannot add row to filter.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else {
      let payload = {
        "Sequence": element.sequence,
        "Field": element.field,
        "Criteria": element.criteria,
        "Value": element.value,
        "AndOr": element.andOr,
        "Description": this.savedFilter.value,
        "wsid": this.userData.wsid,
      }
      this.pPickService.create(payload, '/Induction/PickBatchFilterInsert').subscribe(res => {
        if (res.isExecuted) {
          this.isFilterAdd = true;
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
  }
  onSaveSingleOrder(element: any) {
    let payload = {
      "Sequence": element.sequence,
      "Field": element.field,
      "Order": "DESC",
      "Description": this.savedFilter.value,
      "wsid": this.userData.wsid,
    }

    this.pPickService.create(payload, '/Induction/PickBatchOrderInsert').subscribe(res => {
      if (res.isExecuted) {
        this.isOrderByAdd = true;
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }
  onDeleteSingleFilter(element: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        let payload = {
          "Sequence": element.sequence,
          "Description": this.savedFilter.value,
          "wsid": this.userData.wsid,
        }
        this.pPickService.delete(payload, '/Induction/PickBatchFilterDelete').subscribe(res => {
          if (res.isExecuted) {
            this.isFilterAdd = true;
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.pickBatchFilterOrderData(this.savedFilter.value);
          }
        });
      }
    });
  }
  onDeleteSingleOrder(element: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        let payload = {
          "id": element.id,
          "wsid": this.userData.wsid,
        }
        this.pPickService.delete(payload, '/Induction/PickBatchOrderDelete').subscribe(res => {
          if (res.isExecuted) {
            this.isFilterAdd = true;
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.pickBatchFilterOrderData(this.savedFilter.value);
          }
        });
      }
    });
  }

  onClosePickToteManager() {
    this.dialogRef.close(this.selectedOrders);
  }

  onSelectBatchZone(row) {
    let payload = {
      "zone": row.zone,
      "type": row.type,
      "wsid": this.userData.wsid,
    }
    this.pPickService.update(payload, '/Induction/PickBatchZoneDefaultMark').subscribe(res => {
      if(res.isExecuted){
        this.toastr.success(labels.alert.update, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }else{
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

}


