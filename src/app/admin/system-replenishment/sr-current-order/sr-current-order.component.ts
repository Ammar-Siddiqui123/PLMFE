import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-sr-current-order',
  templateUrl: './sr-current-order.component.html',
  styleUrls: ['./sr-current-order.component.scss']
})
export class SrCurrentOrderComponent implements OnInit {

  displayedColumns2: string[] = ['itemNumber', 'transactionType', 'warehouse', 'zone', 'carousel', 'row', 'shelf', 'bin', 'cell', 'lotNumber', 'transactionQuantity', 'description', 'orderNumber', 'unitOfMeasure', 'batchPickID', 'serialNumber', 'completedDate', 'printDate'];
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
    { value: 'Item Number', viewValue: 'Item Number', sortColumn: '0' },
    { value: 'Transaction Type', viewValue: 'Trans Type', sortColumn: '1' },
    { value: 'Warehouse', viewValue: 'Warehouse', sortColumn: '2' },
    { value: 'Zone', viewValue: 'Zone', sortColumn: '3' },
    { value: 'Carsl', viewValue: 'Carsl', sortColumn: '4' },
    { value: 'Row', viewValue: 'Row', sortColumn: '5' },
    { value: 'Shelf', viewValue: 'Shelf', sortColumn: '6' },
    { value: 'Bin', viewValue: 'Bin', sortColumn: '7' },
    { value: 'Cell', viewValue: 'Cell', sortColumn: '8' },
    { value: 'Lot Number', viewValue: 'Lot Number', sortColumn: '9' },
    { value: 'Trans Qty', viewValue: 'Trans Qty', sortColumn: '10' },
    { value: 'Description', viewValue: 'Description', sortColumn: '11' },
    { value: 'Order Number', viewValue: 'Order Number', sortColumn: '12' },
    { value: 'UofM', viewValue: 'UofM', sortColumn: '13' },
    { value: 'Batch Pick ID', viewValue: 'Batch Pick ID', sortColumn: '14' },
    { value: 'Serial Number', viewValue: 'Serial Number', sortColumn: '15' },
    { value: 'Comp Date', viewValue: 'Comp Date', sortColumn: '16' },
    { value: 'Print Date', viewValue: 'Print Date', sortColumn: '17' },
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
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.tablePayloadObj.username = this.userData.userName;
    this.tablePayloadObj.wsid = this.userData.wsid;
    this.repByDeletePayload.username = this.userData.userName;
    this.repByDeletePayload.wsid = this.userData.wsid;
    this.newReplenishmentOrders();
  }

  newReplenishmentOrders() {
    this.systemReplenishmentService.get(this.tablePayloadObj, '/Admin/SystemReplenishmentTable').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data.sysTable;
        this.tableData.forEach(element => {
          element.isSelected = false;
        });
        this.tableDataTotalCount = res.data.recordsTotal;
        this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
        this.updateCounts();
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  updateCounts() {
    this.noOfPutAways = this.filteredTableData.filter((item: any) => item.transactionType == 'Put Away').length;
    this.noOfPicks = this.filteredTableData.filter((item: any) => item.transactionType == 'PICK').length;
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
    if (confirm("Are you sure you want to delete all records")) {
      this.repByDeletePayload.identity = "ALL";
      this.repByDeletePayload.filter1 = "";
      this.repByDeletePayload.filter2 = "";
      this.repByDeletePayload.searchString = "";
      this.repByDeletePayload.searchColumn = "";
      this.repByDeletePayload.status = "";
      this.ReplenishmentsByDelete();
    }
  }

  deleteShownOrders() {
    if (confirm("Are you sure you want to delete all records that are currently dipslayed")) {
      this.repByDeletePayload.identity = "Shown";
      this.repByDeletePayload.filter1 = "";
      this.repByDeletePayload.filter2 = "";
      this.repByDeletePayload.searchString = this.tablePayloadObj.searchString;
      this.repByDeletePayload.searchColumn = this.tablePayloadObj.searchColumn;
      this.repByDeletePayload.status = this.tablePayloadObj.status;
      this.ReplenishmentsByDelete();
    }
  }

  deleteRange() {
    const dialogRef = this.dialog.open(DeleteRangeComponent, {
      width: '900px',
      autoFocus: '__non_existing_element__',
      data: {},
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
      const dialogRef2 = this.dialog.open(SrDeleteOrderComponent, {
        height: 'auto',
        width: '600px',
        autoFocus: '__non_existing_element__',
        data: {
          orderNumber: this.selectedOrder.orderNumber,
        },
      });
      dialogRef2.afterClosed().subscribe((res) => {
        if (res) {
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
    // this.tablePayloadObj.sortColumn = this.searchColumnOptions.filter((item: any) => item.value == event)[0].sortColumn;
  }

  search() {
    if (this.tablePayloadObj.searchColumn != "" && this.tablePayloadObj.searchString != "") {
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