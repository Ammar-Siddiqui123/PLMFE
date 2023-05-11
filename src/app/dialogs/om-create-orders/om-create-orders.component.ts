import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OmAddRecordComponent } from '../om-add-record/om-add-record.component';
import { OmAddTransactionComponent } from '../om-add-transaction/om-add-transaction.component';
import { OmEditTransactionComponent } from '../om-edit-transaction/om-edit-transaction.component';
import { OmUserFieldDataComponent } from '../om-user-field-data/om-user-field-data.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { Router } from '@angular/router';
import { OrderManagerService } from 'src/app/order-manager/order-manager.service';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import labels from '../../labels/labels.json';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatMenuTrigger } from '@angular/material/menu';
import { ContextMenuFiltersService } from 'src/app/init/context-menu-filters.service';
import { InputFilterComponent } from '../input-filter/input-filter.component';

@Component({
  selector: 'app-om-create-orders',
  templateUrl: './om-create-orders.component.html',
  styleUrls: ['./om-create-orders.component.scss']
})
export class OmCreateOrdersComponent implements OnInit {

  displayedColumns: any[] = [
    'transactionType',
    'orderNumber',
    'priority',
    'requiredDate',
    'userField1',
    'userField2',
    'userField3',
    'userField4',
    'userField5',
    'userField6',
    'userField7',
    'userField8',
    'userField9',
    'userField10',
    'itemNumber',
    'description',
    'lineNumber',
    'transactionQuantity',
    'warehouse',
    'lineSequence',
    'inProcess',
    'processingBy',
    'unitOfMeasure',
    'importBy',
    'importDate',
    'importFilename',
    'expirationDate',
    'lotNumber',
    'serialNumber',
    'notes',
    'revision',
    'id',
    'hostTransactionID',
    'emergency',
    'label',
    'batchPickID',
    'toteID',
    'cell',
    'action'
  ];
  filterColumnNames: any = [];
  createOrdersDTSubscribe: any;
  createOrdersDTPayload: any = {
    orderNumber: "",
    filter: "1=1"
  };
  tableData: any = [];
  userData: any;
  AllowInProc: any = 'False';
  otcreatecount: any = 0;
  orderNumberSearchList: any;
  @ViewChild("searchauto", { static: false }) autocompleteOpened: MatAutocomplete;
  @ViewChild('trigger') trigger: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  FilterString: string = "";
  selectedTransaction: any = {};
  selectedFilterColumn: string = "";
  selectedFilterString: string;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<OmCreateOrdersComponent>,
    private orderManagerService: OrderManagerService,
    private filterService: ContextMenuFiltersService
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getColumnSequence();
  }

  openOmAddRecord() {
    let dialogRef = this.dialog.open(OmAddRecordComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data: {
        from: "add-new-order",
        heading: "Adding a New Order Number",
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrdersDTPayload.orderNumber = result.orderNumber;
        this.createOrdersDT();
      }
    });
  }

  openOmEditTransaction(element: any) {
    let dialogRef = this.dialog.open(OmAddRecordComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data: {
        from: "edit-transaction",
        heading: `Updating a transaction for ${this.createOrdersDTPayload.orderNumber}`,
        transaction: element,
        orderNumber: this.createOrdersDTPayload.orderNumber
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrdersDTPayload.orderNumber = result.orderNumber;
        this.createOrdersDT();
      }
    });
  }

  openOmAddTransaction() {
    let dialogRef = this.dialog.open(OmAddRecordComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data: {
        from: "add-transaction",
        heading: `Adding a new transaction for ${this.createOrdersDTPayload.orderNumber}`,
        transaction: this.selectedTransaction,
        orderNumber: this.createOrdersDTPayload.orderNumber
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrdersDTPayload.orderNumber = result.orderNumber;
        this.createOrdersDT();
      }
    });
  }

  openOmUserFieldData() {
    let dialogRef = this.dialog.open(OmUserFieldDataComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {


    })
  }

  createOrdersDT(loader: boolean = false) {
    if (this.createOrdersDTPayload.orderNumber.trim() != '') {
      this.orderManagerService.get(this.createOrdersDTPayload, '/OrderManager/CreateOrdersDT', loader).subscribe((res: any) => {
        if (res.isExecuted && res.data) {
          this.tableData = res.data;
          if (this.tableData.length > 0) {
            this.tableData.forEach(element => {
              element.isSelected = false;
            });
          }
        } else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
    else {
      this.tableData = [];
    }
  }

  goToOrderStatus() {
    // this.router.navigate(['/admin/transaction?tabIndex=0']);
    this.router.navigate(['/admin/transaction']);
    this.dialogRef.close();
  }

  releaseOrders() {
    if (this.AllowInProc == "False" && this.otcreatecount > 0) {
      this.toastr.error('"You may not release an Order that is already in progress', 'Release Transactions', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'release-all-orders',
        ErrorMessage: 'Release all orders for this order number?',
        action: 'delete'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
        let payload = {
          "val": this.createOrdersDTPayload.orderNumber,
          "page": "Create Orders",
          "wsid": this.userData.wsid
        };
        this.orderManagerService.get(payload, '/OrderManager/ReleaseOrders').subscribe((res: any) => {
          if (res.isExecuted && res.data) {
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          } else {
            // this.toastr.error("An Error Occured while releasing orders. Check the Event Log for more info", 'Error!', {
            //   positionClass: 'toast-bottom-right',
            //   timeOut: 2000
            // });
          }
          this.createOrdersDTPayload.orderNumber = '';
          this.createOrdersDT();
          dialogRef.close();
        });
      }
    });
  }

  printViewed() {
    alert('The print service is currently offline');
  }

  deleteViewed() {
    // if (this.tableData.length == 0) {
    //   this.toastr.error('There are currently no records within the table', 'Warning', {
    //     positionClass: 'toast-bottom-right',
    //     timeOut: 2000
    //   });
    // }
    // else {
    //   let ids = [];
    //   const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    //     height: 'auto',
    //     width: '560px',
    //     autoFocus: '__non_existing_element__',
    //     data: {
    //       mode: 'release-all-orders',
    //       ErrorMessage: 'Are you sure you want to delete these records?',
    //       action: 'delete'
    //     },
    //   });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (result === 'Yes') {
    //       let payload = {
    //         "val": this.createOrdersDTPayload.orderNumber,
    //         "page": "Create Orders",
    //         "wsid": this.userData.wsid
    //       };
    //       this.orderManagerService.get(payload, '/OrderManager/ReleaseOrders').subscribe((res: any) => {
    //         if (res.isExecuted && res.data) {
    //           this.toastr.success(labels.alert.delete, 'Success!', {
    //             positionClass: 'toast-bottom-right',
    //             timeOut: 2000
    //           });
    //           this.createOrdersDTPayload.orderNumber = '';
    //           this.createOrdersDT();
    //           dialogRef.close();
    //         } else {
    //           this.toastr.error("An error has occurred while deleting the viewed records", 'Error!', {
    //             positionClass: 'toast-bottom-right',
    //             timeOut: 2000
    //           });
    //         }
    //       });
    //     }
    //   });
    // }
  }

  selectColumnSequence() {

  }

  searchItem(loader: boolean = false) {
    if (this.createOrdersDTPayload.orderNumber.trim() != '') {
      let payload = {
        "orderNumber": this.createOrdersDTPayload.orderNumber,
        "userName": this.userData.userName,
        "wsid": this.userData.wsid
      }
      this.orderManagerService.get(payload, '/OrderManager/CreateOrderTypeahead', loader).subscribe((res: any) => {
        if (res.isExecuted && res.data) {
          this.orderNumberSearchList = res.data;
        }
      });
    }
    else {
      this.orderNumberSearchList = [];
    }
  }

  onSearchSelect(e: any) {
    this.createOrdersDTPayload.orderNumber = e.option.value;
    this.createOrdersDT();
  }

  onContextMenu(event: MouseEvent, SelectedItem: any, FilterColumnName?: any, FilterConditon?: any, FilterItemType?: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.trigger.menuData = { item: { SelectedItem: SelectedItem, FilterColumnName: FilterColumnName, FilterConditon: FilterConditon, FilterItemType: FilterItemType } };
    this.trigger.menu?.focusFirstItem('mouse');
    this.trigger.openMenu();
  }

  onContextMenuCommand(SelectedItem: any, FilterColumnName: any, Condition: any, Type: any) {
    if(SelectedItem != undefined){
      this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, "clear", Type);
      this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, Condition, Type);
    }
    this.createOrdersDTPayload.filter = this.FilterString != "" ? this.FilterString : "1=1";
    this.createOrdersDT(true);
  }

  getType(val): string {
    return this.filterService.getType(val);
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

  selectTransaction(element) {
    if (this.selectedTransaction.id && this.selectedTransaction.id == element.id) {
      this.selectedTransaction = {};
    } else {
      this.selectedTransaction = element;
    }
  }

  getColumnSequence() {
    let payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid,
      tableName: 'Order Manager Create'
    };
    this.orderManagerService.get(payload, '/Admin/GetColumnSequence').subscribe((res: any) => {
      if (res.isExecuted) {
        this.filterColumnNames = res.data;
      }
    });
  }

  autocompleteSearchColumn() {
    if (this.selectedFilterColumn != "") {
      if(this.selectedFilterString != ""){
        this.createOrdersDTPayload.filter = `[${this.selectedFilterColumn}] = '${this.selectedFilterString}'`;
      }
      else{
        this.createOrdersDTPayload.filter = "1=1";
      }
      this.createOrdersDT(true);
    }
  }
}
