import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { TransactionQtyEditComponent } from 'src/app/dialogs/transaction-qty-edit/transaction-qty-edit.component';
import { SystemReplenishmentService } from '../system-replenishment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import labels from '../../../labels/labels.json'
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FilterItemNumbersComponent } from '../../dialogs/filter-item-numbers/filter-item-numbers.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ContextMenuFiltersService } from 'src/app/init/context-menu-filters.service';
import { InputFilterComponent } from 'src/app/dialogs/input-filter/input-filter.component';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FloatLabelType } from '@angular/material/form-field';


@Component({
  selector: 'app-sr-new-order',
  templateUrl: './sr-new-order.component.html',
  styleUrls: ['./sr-new-order.component.scss']
})
export class SrNewOrderComponent implements OnInit {

  displayedColumns: string[] = ['Item Number', 'Description', 'Warehouse', 'Stock Qty', 'Replenishment Point', 'Replenishment Level', 'Available Qty', 'Replenishment Qty', 'Case Qty', 'Transaction Qty', 'Replenish', 'Replenish Exists', 'Alloc Pick', 'Alloc Put', 'action'];
  tableData: any = [];
  filteredTableData: any = [];
  public userData: any;
  kanban: boolean = false;
  numberSelectedRep: number = 0;
  tablePayloadObj: any = {
    draw: 0,
    start: 0,
    length: 10,
    searchString: "",
    sortColumn: 0,
    searchColumn: "",
    sortDir: "asc",
    reOrder: false,
    filter: "1=1",
    username: "",
    wsid: ""
  };
  tableDataTotalCount: number = 0;
  filterItemNumbersText: string = "";

  searchColumnOptions: any = [
    { value: 'Item Number', viewValue: 'Item Number', sortValue: '0', key: 'itemNumber' },
    { value: 'Description', viewValue: 'Description', sortValue: '1', key: 'description' },
    { value: 'Warehouse', viewValue: 'Warehouse', sortValue: '2', key: 'warehouse' },
    { value: 'Stock Qty', viewValue: 'Stock Qty', sortValue: '3', key: 'stockQuantity' },
    { value: 'Replenishment Point', viewValue: 'Replenishment Point', sortValue: '4', key: 'replenishmentPoint' },
    { value: 'Replenishment Level', viewValue: 'Replenishment Level', sortValue: '5', key: 'replenishmentLevel' },
    { value: 'Available Qty', viewValue: 'Available Qty', sortValue: '6', key: 'availableQuantity' },
    { value: 'Replenishment Qty', viewValue: 'Replenishment Qty', sortValue: '7', key: 'replenishmentQuantity' },
    { value: 'Case Qty', viewValue: 'Case Qty', sortValue: '8', key: 'caseQuantity' },
    { value: 'Transaction Qty', viewValue: 'Transaction Qty', sortValue: '9', key: 'transactionQuantity' },
    { value: 'Replenish', viewValue: 'Replenish', sortValue: '10', key: 'replenish' },
    { value: 'Replenish Exists', viewValue: 'Replenish Exists', sortValue: '11', key: 'replenishExists' },
    { value: 'Alloc Pick', viewValue: 'Alloc Pick', sortValue: '12', key: 'allocPick' },
    { value: 'Alloc Put', viewValue: 'Alloc Put', sortValue: '13', key: 'allocPut' },
  ];

  searchAutocompleteList: any;

  constructor(
    private dialog: MatDialog,
    private systemReplenishmentService: SystemReplenishmentService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private filterService: ContextMenuFiltersService
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.tablePayloadObj.username = this.userData.userName;
    this.tablePayloadObj.wsid = this.userData.wsid;
  }

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
    this.trigger.closeMenu();
  }

  getType(val): string {
    return this.filterService.getType(val);
  }

  FilterString: string = "";
  onContextMenuCommand(SelectedItem: any, FilterColumnName: any, Condition: any, Type: any) {
    this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, "clear", Type);
    this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, Condition, Type);
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

  editTransDialog(element: any): void {
    const dialogRef = this.dialog.open(TransactionQtyEditComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        rP_ID: element.rP_ID,
        transactionQuantity: element.transactionQuantity,
        availableQuantity: element.availableQuantity,
        replenishmentQuantity: element.replenishmentQuantity
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filteredTableData.filter((item: any) => {
          if (item.rP_ID == result.rP_ID) {
            item.transactionQuantity = result.transactionQuantity;
          }
        });
      }
    });
  }

  newReplenishmentOrdersSubscribe:any;
  newReplenishmentOrders() {
    this.tablePayloadObj.searchString = this.tablePayloadObj.searchString.toString();
    this.newReplenishmentOrdersSubscribe = this.systemReplenishmentService.get(this.tablePayloadObj, '/Admin/SystemReplenishmentNewTable').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data.sysTable;
        this.tableDataTotalCount = res.data.recordsFiltered;
        this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
        this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity > 0).length;
        this.changeSearchOptions();
        this.tablePayloadObj.filter = "1=1";
      } else {
        console.log(res.responseMessage);
        // this.toastr.error(res.responseMessage, 'Error!', {
        //   positionClass: 'toast-bottom-right',
        //   timeOut: 2000
        // });
        this.tablePayloadObj.filter = "1=1";
      }
    });
  }

  onChangeKanban(ob: MatCheckboxChange) {
    // if (confirm("Click OK to create a new replenishment list.")) {
    this.createNewReplenishments(ob.checked);
    // } else {
    //   ob.checked = !ob.checked;
    //   this.kanban = !ob.checked;
    // }
  }

  createNewOrdersList() {
    if (confirm("Click OK to create a new replenishment list.")) {
      this.createNewReplenishments(this.kanban);
    }
  }

  createNewReplenishments(kanban: boolean) {
    let paylaod = {
      "kanban": kanban,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.systemReplenishmentService.create(paylaod, '/Admin/ReplenishmentInsert').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        // this.toastr.success(labels.alert.success, 'Success!', {
        //   positionClass: 'toast-bottom-right',
        //   timeOut: 2000
        // });
      } else {
        // if (!kanban) {
        //   this.toastr.error(res.responseMessage, 'Error!', {
        //     positionClass: 'toast-bottom-right',
        //     timeOut: 2000
        //   });
        // }
        console.log(res.responseMessage);
      }
      this.newReplenishmentOrders();
    });
  }

  actionChange(event: any) {
    if (event == '1') {
      this.filterItemNo();
    }
    else if (event == '2') {
      this.print();
    }
    else if (event == '3') {
      this.viewAllItems();
    }
    else if (event == '4') {
      this.viewSelectedItems();
    }
    else if (event == '5') {
      this.selectAll();
    }
    else if (event == '6') {
      this.unSelectAll();
    }
  }

  showChange(event: any) {
    if (event == '1') {
      this.tablePayloadObj.reOrder = false;
      this.newReplenishmentOrders();
    }
    else if (event == '2') {
      this.tablePayloadObj.reOrder = true;
      this.newReplenishmentOrders();
    }
  }

  searchChange(event: any) {
    this.tablePayloadObj.searchColumn = event;
    this.changeSearchOptions();
  }

  changeSearchOptions() {
    if (this.tablePayloadObj.searchColumn != "") {
      let key = this.searchColumnOptions.filter((item: any) => item.value == this.tablePayloadObj.searchColumn)[0].key;
      this.searchAutocompleteList = [];
      let duplicates = this.filteredTableData.map((item: any) => item[key]);
      this.searchAutocompleteList = duplicates.filter((item: any, index: any) => duplicates.indexOf(item) === index);
      // this.searchAutocompleteList = this.filteredTableData.map((item: any) => item[key]);
    }
  }

  paginatorChange(event: PageEvent) {
    if (event.previousPageIndex != undefined && event.pageIndex > event.previousPageIndex) {
      this.tablePayloadObj.start = this.tablePayloadObj.start + event.pageSize;
    }
    else {
      this.tablePayloadObj.start = this.tablePayloadObj.start - event.pageSize;
    }
    this.tablePayloadObj.length = event.pageSize;
    this.newReplenishmentOrders();
  }

  viewItemInInventoryMaster(element: any) {
    window.open(`/#/admin/inventoryMaster?itemNumber=${element.itemNumber}`, '_blank', "location=yes");
  }

  print() {
    if (confirm('Click OK to print a replenishment report.')) {
      alert('Print Service not availabe.');
    }
  }

  selectAll() {
    if (confirm(`Click OK to mark ${(this.tablePayloadObj.reOrder ? 'Re-Order' : 'all')} entries.`)) {
      this.ReplenishmentsIncludeAllUpdate(true);
    }

    // this.filteredTableData.forEach((element: any) => {
    //   if (element.transactionQuantity > 0) {
    //     element.replenish = true;
    //   }
    // });
    // this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity > 0).length;
    // this.ReplenishmentsIncludeAllUpdate(true);
  }

  unSelectAll() {
    if (confirm(`Click OK to unmark ${((this.tablePayloadObj.reOrder == '' || this.tablePayloadObj.reOrder == 'all') ? 'all' : 'Re-Order')} entries.`)) {
      this.ReplenishmentsIncludeAllUpdate(false);
    }
    // this.filteredTableData.forEach((element: any) => {
    //   if (element.transactionQuantity > 0) {
    //     element.replenish = false;
    //   }
    // });
    // this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity > 0).length;
    // this.ReplenishmentsIncludeAllUpdate(false);
  }

  viewAllItems() {
    this.tableData.forEach((element: any) => {
      let index: any = this.filteredTableData.findIndex((item: any) => item.rP_ID == element.rP_ID);
      if (index != -1) {
        element.replenish = this.filteredTableData[index].replenish;
        element.transactionQuantity = this.filteredTableData[index].transactionQuantity;
      }
    });
    this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
  }

  viewSelectedItems() {
    this.tableData = JSON.parse(JSON.stringify(this.filteredTableData));
    this.filteredTableData = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity > 0);
  }

  filterItemNo() {
    const dialogRef = this.dialog.open(FilterItemNumbersComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: this.filterItemNumbersText,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filterItemNumbersText = result.filterItemNumbersText;
        if (result.filterItemNumbersArray && result.filterItemNumbersArray.length > 0) {
          this.newReplenishmentOrders();
        }
      }
    });
  }

  changeReplenish(element: any, $event: any) {
    this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity > 0).length;
    this.ReplenishmentsIncludeUpdate($event.checked, element.rP_ID);
  }

  processReplenishments() {
    if (confirm('Click OK to create replenishment orders for all selected items.')) {
      let paylaod = {
        "kanban": this.kanban,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
      }
      this.systemReplenishmentService.create(paylaod, '/Admin/ProcessReplenishments').subscribe((res: any) => {
        if (res.isExecuted && res.data) {
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.newReplenishmentOrders()
        } else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
  }

  search() {
    if (this.tablePayloadObj.searchColumn != "" && this.tablePayloadObj.searchString != "") {
      this.newReplenishmentOrders();
    }
  }

  announceSortChange(e: any) {
    debugger;
    this.tablePayloadObj.sortColumn = this.searchColumnOptions.filter((item: any) => item.value == e.active)[0].sortValue;
    // this.tablePayloadObj.sortColumn = e.active;
    this.tablePayloadObj.sortDir = e.direction;
    this.newReplenishmentOrders();
  }

  ReplenishmentsIncludeUpdate(replenish: boolean, rfid: number) {
    let paylaod = {
      "rfid": rfid,
      "replenish": replenish,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.systemReplenishmentService.create(paylaod, '/Admin/ReplenishmentsIncludeUpdate').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        // this.toastr.success(labels.alert.success, 'Success!', {
        //   positionClass: 'toast-bottom-right',
        //   timeOut: 2000
        // });
        this.newReplenishmentOrders();
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  ReplenishmentsIncludeAllUpdate(replenish: boolean) {
    let paylaod = {
      "replenish": replenish,
      "reorder": this.tablePayloadObj.reOrder,
      "searchString": this.tablePayloadObj.searchString,
      "searchColumn": this.tablePayloadObj.searchColumn,
      "filter": "1=1",
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.systemReplenishmentService.create(paylaod, '/Admin/ReplenishmentsIncludeAllUpdate').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.newReplenishmentOrders();
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }
}
