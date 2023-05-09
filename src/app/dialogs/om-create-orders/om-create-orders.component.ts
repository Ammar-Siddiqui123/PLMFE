import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmAddRecordComponent } from '../om-add-record/om-add-record.component';
import { OmAddTransactionComponent } from '../om-add-transaction/om-add-transaction.component';
import { OmEditTransactionComponent } from '../om-edit-transaction/om-edit-transaction.component';
import { OmUserFieldDataComponent } from '../om-user-field-data/om-user-field-data.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-om-create-orders',
  templateUrl: './om-create-orders.component.html',
  styleUrls: ['./om-create-orders.component.scss']
})
export class OmCreateOrdersComponent implements OnInit {

  ELEMENT_DATA: any[] = [
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '125874', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '632598', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '30022', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },
  ];
  displayedColumns: string[] = ['date', 'message', 'event_code', 'username', 'event_type', 'event_location', 'notes', 'trans_id', 'actions'];
  dataSourceList: any;
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
    filter: ""
  };
  tableData: any = this.ELEMENT_DATA;
  filteredTableData: any = [];
  userData: any;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private authService: AuthService,
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
      if(result){
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
    // this.createOrdersDTSubscribe = this.systemReplenishmentService.get(this.createOrdersDTPayload, '/OrderManager/CreateOrdersDT',loader).subscribe((res: any) => {
    //   if (res.isExecuted && res.data) {
    //     this.tableData = res.data.sysTable;
    //     this.tableData.forEach(element => {
    //       element.isSelected = false;
    //     });
    //     this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
    //   } else {
    //     this.toastr.error(res.responseMessage, 'Error!', {
    //       positionClass: 'toast-bottom-right',
    //       timeOut: 2000
    //     });
    //   }
    // });
  }
}
