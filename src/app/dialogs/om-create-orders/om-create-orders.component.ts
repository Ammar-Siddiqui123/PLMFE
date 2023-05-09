import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-om-create-orders',
  templateUrl: './om-create-orders.component.html',
  styleUrls: ['./om-create-orders.component.scss']
})
export class OmCreateOrdersComponent implements OnInit {

  displayedColumns: any[] = ['transactionType','action'];
// { matColumnDef: 'transactionType', title: 'Transaction Type', bindingKey: 'transactionType' },
// { matColumnDef: 'orderNumber', title: 'Order Number', bindingKey: 'orderNumber' },
// { matColumnDef: 'priority', title: 'Priority', bindingKey: 'priority' },
// { matColumnDef: 'action', title: 'Action', bindingKey: 'action' }



  filterColumnNames: any = [
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
    { value: "Date", title: "Date" },
  ];
  createOrdersDTSubscribe: any;
  createOrdersDTPayload: any = {
    orderNumber: "",
    filter: "1=1"
  };
  tableData: any = [];
  userData: any;
  AllowInProc: any = 'False';
  otcreatecount: any = 0;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<OmCreateOrdersComponent>,
    private orderManagerService: OrderManagerService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  openOmAddRecord() {
    let dialogRef = this.dialog.open(OmAddRecordComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        this.createOrdersDT();
      }
    });
  }

  openOmEditTransaction() {
    let dialogRef = this.dialog.open(OmEditTransactionComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',

    })
    dialogRef.afterClosed().subscribe(result => {


    })
  }

  openOmAddTransaction() {
    let dialogRef = this.dialog.open(OmAddTransactionComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',

    })
    dialogRef.afterClosed().subscribe(result => {


    })
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
    this.createOrdersDTSubscribe = this.orderManagerService.get(this.createOrdersDTPayload, '/OrderManager/CreateOrdersDT', loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data;
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
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
            this.createOrdersDTPayload.orderNumber = '';
            this.createOrdersDT();
            dialogRef.close();
          } else {
            this.toastr.error("An Error Occured while releasing orders. Check the Event Log for more info", 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
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

  selectColumnSequence(){

  }
}
