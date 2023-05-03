import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SystemReplenishmentService } from '../system-replenishment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { PrintReplenLabelsComponent } from 'src/app/dialogs/print-replen-labels/print-replen-labels.component';
import { DeleteRangeComponent } from 'src/app/dialogs/delete-range/delete-range.component';
import labels from '../../../labels/labels.json';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { SrDeleteOrderComponent } from 'src/app/dialogs/sr-delete-order/sr-delete-order.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ContextMenuFiltersService } from 'src/app/init/context-menu-filters.service';
import { InputFilterComponent } from 'src/app/dialogs/input-filter/input-filter.component';
import { FloatLabelType } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sr-current-order',
  templateUrl: './sr-current-order.component.html',
  styleUrls: ['./sr-current-order.component.scss']
})
export class SrCurrentOrderComponent implements OnInit {

  displayedColumns2: string[] = ['Item Number', 'Trans Type', 'warehouse', 'zone', 'carousel', 'row', 'shelf', 'bin', 'cell', 'lotNumber', 'Trans Qty', 'description', 'Order Number', 'UofM', 'Batch Pick ID', 'Serial Number', 'Completed Date', 'Print Date'];
  noOfPicks: number = 0;
  noOfPutAways: number = 0;
  public userData: any;
  tablePayloadObj: any = {
    draw: 0,
    start: 0,
    length: 10,
    searchString: "",
    searchColumn: "",
    sortColumn: "",
    sortDir: "asc",
    status: "All",
    filter: "1=1",
    username: "",
    wsid: ""
  };
  tableData: any = [];
  filteredTableData: any = [];
  tableDataTotalCount: number = 0;
  searchColumnOptions: any = [
    { value: 'Item Number', viewValue: 'Item Number', sortColumn: '0', key: 'itemNumber' },
    { value: 'Transaction Type', viewValue: 'Trans Type', sortColumn: '1', key: 'transactionType' },
    { value: 'Warehouse', viewValue: 'Warehouse', sortColumn: '2', key: 'warehouse' },
    { value: 'Zone', viewValue: 'Zone', sortColumn: '3', key: 'zone' },
    { value: 'Carsl', viewValue: 'Carsl', sortColumn: '4', key: 'carousel' },
    { value: 'Row', viewValue: 'Row', sortColumn: '5', key: 'row' },
    { value: 'Shelf', viewValue: 'Shelf', sortColumn: '6', key: 'shelf' },
    { value: 'Bin', viewValue: 'Bin', sortColumn: '7', key: 'bin' },
    { value: 'Cell', viewValue: 'Cell', sortColumn: '8', key: 'cell' },
    { value: 'Lot Number', viewValue: 'Lot Number', sortColumn: '9', key: 'lotNumber' },
    { value: 'Trans Qty', viewValue: 'Trans Qty', sortColumn: '10', key: 'transactionQuantity' },
    { value: 'Description', viewValue: 'Description', sortColumn: '11', key: 'description' },
    { value: 'Order Number', viewValue: 'Order Number', sortColumn: '12', key: 'orderNumber' },
    { value: 'UofM', viewValue: 'UofM', sortColumn: '13', key: 'unitOfMeasure' },
    { value: 'Batch Pick ID', viewValue: 'Batch Pick ID', sortColumn: '14', key: 'batchPickID' },
    { value: 'Serial Number', viewValue: 'Serial Number', sortColumn: '15', key: 'serialNumber' },
    { value: 'Comp Date', viewValue: 'Comp Date', sortColumn: '16', key: 'completedDate' },
    { value: 'Print Date', viewValue: 'Print Date', sortColumn: '17', key: 'printDate' },
  ];
  repByDeletePayload: any = {
    identity: "",
    filter1: "",
    filter2: "",
    searchString: "",
    searchColumn: "",
    status: "",
    username: "",
    wsid: ""
  };
  selectedOrder: any = {};

  constructor(
    private dialog: MatDialog,
    private systemReplenishmentService: SystemReplenishmentService,
    private toastr: ToastrService,
    private authService: AuthService,
    private filterService: ContextMenuFiltersService
  ) { }



  @ViewChild('trigger') trigger: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  onContextMenu(event: MouseEvent, SelectedItem: any, FilterColumnName?: any, FilterConditon?: any, FilterItemType?: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.trigger.menuData = { item: { SelectedItem: SelectedItem, FilterColumnName: FilterColumnName, FilterConditon: FilterConditon, FilterItemType: FilterItemType } };
    this.trigger.menu?.focusFirstItem('mouse');
    this.trigger.openMenu();
  }

  onClick() {
    debugger
    this.trigger.closeMenu();
  }

  getType(val): string {
    return this.filterService.getType(val);
  }

  FilterString: string = "";
  onContextMenuCommand(SelectedItem: any, FilterColumnName: any, Condition: any, Type: any) {
    this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, "clear", Type);
    this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, Condition, Type);
    console.log(this.FilterString);
    this.tablePayloadObj.filter = this.FilterString;
    this.newReplenishmentOrders();
    this.tablePayloadObj.filter = "1=1";
  }

  InputFilterSearch(FilterColumnName: any, Condition: any, TypeOfElement: any) {
    const dialogRef = this.dialog.open(InputFilterComponent, {
      height: 'auto',
      width: '480px',
      data: {
        FilterColumnName: FilterColumnName,
        Condition: Condition,
        TypeOfElement: TypeOfElement
      },
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.onContextMenuCommand(result.SelectedItem, result.SelectedColumn, result.Condition, result.Type)
    }
    );
  }

  ClearFilters()
  {
    this.tablePayloadObj.filter = "1=1";
    this.newReplenishmentOrders();
  }

  hideRequiredControl = new FormControl(false);
  @ViewChild(MatAutocompleteTrigger) autocompleteInventory: MatAutocompleteTrigger;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  autocompleteSearchColumn(){
    if (this.tablePayloadObj.searchColumn != "" && this.tablePayloadObj.searchString != "") {
      this.newReplenishmentOrdersSubscribe.unsubscribe();
      this.newReplenishmentOrders();
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  closeautoMenu()
  {
    this.autocompleteInventory.closePanel(); 
  }

  announceSortChange(e: any) {
    this.tablePayloadObj.sortColumn = e.active;
    this.tablePayloadObj.sortDir = e.direction;
    this.newReplenishmentOrders();
  }

  @Input('refreshCurrentOrders') refreshCurrentOrders:Subject<any>;
  @Output() replenishmentsDeleted: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.tablePayloadObj.username = this.userData.userName;
    this.tablePayloadObj.wsid = this.userData.wsid;
    this.repByDeletePayload.username = this.userData.userName;
    this.repByDeletePayload.wsid = this.userData.wsid;
    this.newReplenishmentOrders();
    this.refreshCurrentOrders.subscribe(e => {
      this.newReplenishmentOrders();
    });
  }

  ngOnDestroy() {
    this.refreshCurrentOrders.unsubscribe();
  }

  newReplenishmentOrdersSubscribe:any;
  
  newReplenishmentOrders() {
    this.newReplenishmentOrdersSubscribe = this.systemReplenishmentService.get(this.tablePayloadObj, '/Admin/SystemReplenishmentTable').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data.sysTable;
        this.tableData.forEach(element => {
          element.isSelected = false;
        });
        this.tableDataTotalCount = res.data.recordsTotal;
        this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
		    this.changeSearchOptions();
        this.updateCounts();
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  searchAutocompleteList: any;
  changeSearchOptions() {
    if (this.tablePayloadObj.searchColumn != "") {
      let key = this.searchColumnOptions.filter((item: any) => item.value == this.tablePayloadObj.searchColumn)[0].key;
      this.searchAutocompleteList = [];
      let duplicates = this.filteredTableData.map((item: any) => item[key]);
      this.searchAutocompleteList = duplicates.filter((item: any, index: any) => duplicates.indexOf(item) === index);
      this.searchAutocompleteList = this.searchAutocompleteList.filter((item: any) => item != "");
    }
  }

  updateCounts() {
    this.noOfPutAways = this.filteredTableData.filter((item: any) => item.transactionType == 'Put Away').length;
    this.noOfPicks = this.filteredTableData.filter((item: any) => item.transactionType == 'Pick').length;
  }

  paginatorChange(event: PageEvent) {
    this.tablePayloadObj.start = event.pageSize * event.pageIndex;
    this.tablePayloadObj.length = event.pageSize;
    this.newReplenishmentOrders();
  }

  actionChange(event: any) {
    if (event == 'Print Orders') {
      this.printOrders();
    }
    else if (event == 'Print Labels') {
      this.printLabels();
    }
    else if (event == 'Delete All Orders') {
      this.deleteAllOrders();
    }
    else if (event == 'Delete Shown Orders') {
      this.deleteShownOrders();
    }
    else if (event == 'Delete Range') {
      this.deleteRange();
    }
    else if (event == 'Delete Selected Order') {
      this.deleteSelectedOrder();
    }
    else if (event == 'View All Orders') {
      this.viewAllOrders();
    }
    else if (event == 'View Unprinted Orders') {
      this.viewUnprintedOrders();
    }
  }

  printOrders() {
    alert("The print service is currently offline");
  }

  printLabels() {
    const dialogRef = this.dialog.open(PrintReplenLabelsComponent, {
      width: '1100px',
      autoFocus: '__non_existing_element__',
      data: {
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  deleteAllOrders() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-all-current-orders',
        ErrorMessage: 'Are you sure you want to delete all records',
        action: 'delete'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
        this.repByDeletePayload.identity = "ALL";
        this.repByDeletePayload.filter1 = "";
        this.repByDeletePayload.filter2 = "";
        this.repByDeletePayload.searchString = "";
        this.repByDeletePayload.searchColumn = "";
        this.repByDeletePayload.status = "";
        this.ReplenishmentsByDelete();
      }
    });
  }

  deleteShownOrders() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-shown-current-orders',
        ErrorMessage: 'Are you sure you want to delete all records that are currently dipslayed',
        action: 'delete'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
        this.repByDeletePayload.identity = "Shown";
        this.repByDeletePayload.filter1 = "";
        this.repByDeletePayload.filter2 = "";
        this.repByDeletePayload.searchString = this.tablePayloadObj.searchString;
        this.repByDeletePayload.searchColumn = this.tablePayloadObj.searchColumn;
        this.repByDeletePayload.status = this.tablePayloadObj.status;
        this.ReplenishmentsByDelete();
      }
    });
  }

  deleteRange() {

    let batchPickIdOptions:any = [];
    this.filteredTableData.forEach((x:any) => {
      if(x.batchPickID && !batchPickIdOptions.includes(x.batchPickID)){
        batchPickIdOptions.push(x.batchPickID);
      }
    });

    let pickLocationOptions:any = [];
    this.filteredTableData.forEach((x:any) => {
      if(x.transactionType == "Pick" && !pickLocationOptions.includes(x.zone.trim()+x.carousel.trim()+x.row.trim()+x.shelf.trim()+x.bin.trim())){
        pickLocationOptions.push(x.zone.trim()+x.carousel.trim()+x.row.trim()+x.shelf.trim()+x.bin.trim());
      }
    });

    let putAwayLocationOptions:any = [];
    this.filteredTableData.forEach((x:any) => {
      if(!putAwayLocationOptions.includes(x.zone.trim()+x.carousel.trim()+x.row.trim()+x.shelf.trim()+x.bin.trim())){
        putAwayLocationOptions.push(x.zone.trim()+x.carousel.trim()+x.row.trim()+x.shelf.trim()+x.bin.trim());
      }
    });

    const dialogRef = this.dialog.open(DeleteRangeComponent, {
      width: '900px',
      autoFocus: '__non_existing_element__',
      data: 
      { pickLocationOptions : pickLocationOptions,
        putAwayLocationOptions : putAwayLocationOptions,
        batchPickIdOptions : batchPickIdOptions
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newReplenishmentOrders();
      }
    });
  }

  deleteSelectedOrder() {
    if (this.selectedOrder.rowNumber == undefined) {
      const dialogRef = this.dialog.open(SrDeleteOrderComponent, {
        height: 'auto',
        width: '600px',
        autoFocus: '__non_existing_element__',
        data: {
          orderNumber: null,
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
        }
      });
    }
    else {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'delete-selected-current-orders',
          ErrorMessage: `Delete All transactions for Order: ${this.selectedOrder.orderNumber}. This will delete all transactions, not just selected one.`,
          action: 'delete'
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Yes') {
          this.repByDeletePayload.identity = "Shown";
          this.repByDeletePayload.filter1 = "";
          this.repByDeletePayload.filter2 = "";
          this.repByDeletePayload.searchString = this.selectedOrder.orderNumber;
          this.repByDeletePayload.searchColumn = "Order Number";
          this.repByDeletePayload.status = "All";
          this.ReplenishmentsByDelete();
          this.selectedOrder = {};
        }
      });
    }
  }

  viewAllOrders() {
    this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
    this.updateCounts();
  }

  viewUnprintedOrders() {
    this.tableData = JSON.parse(JSON.stringify(this.filteredTableData));
    this.filteredTableData = this.filteredTableData.filter((item: any) => item.printDate == '');
    this.updateCounts();
  }

  showChange(event: any) {
    if (event == 'All') {
      this.tablePayloadObj.status = event;
      this.newReplenishmentOrders();
    }
    else if (event == 'Open') {
      this.tablePayloadObj.status = event;
      this.newReplenishmentOrders();
    }
    else if (event == 'Completed') {
      this.tablePayloadObj.status = event;
      this.newReplenishmentOrders();
    }
  }

  searchChange(event: any) {
    this.tablePayloadObj.searchColumn = event;
    this.changeSearchOptions();
  }

  resetPagination() {
    this.tablePayloadObj.start = 0;
    this.tablePayloadObj.length = 10;
  }

  search() {
    if (this.tablePayloadObj.searchColumn != "" && this.tablePayloadObj.searchString != "") {
      this.resetPagination();
      this.newReplenishmentOrders();
    }
  }

  ReplenishmentsByDelete() {
    this.systemReplenishmentService.get(this.repByDeletePayload, '/Admin/ReplenishmentsByDelete').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.newReplenishmentOrders();
        this.replenishmentsDeleted.emit();
      } else {
        this.toastr.error("Deleting by range has failed", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialog.closeAll();
      }
    });
  }

  selectOrder(element) {
    this.selectedOrder = element;
  }
}
