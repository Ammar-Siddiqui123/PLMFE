import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import labels from '../../../labels/labels.json';
import { OrderManagerService } from 'src/app/order-manager/order-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.scss']
})
export class PickComponent implements OnInit {

  displayedColumns1: string[] = ['status', 'order_no', 'priority', 'quantity', 'req_date', 'action'];
  displayedColumns2: string[] = ['order_no', 'priority', 'quantity', 'req_date', 'action'];
  tableData1:any = new MatTableDataSource([]);
  tableData2: any = new MatTableDataSource([]);
  userData: any;
  orderNumberSearch: string = '';
  
  @ViewChild('MatSort1') sort1: MatSort;
  sequenceKeyMapping1:any = [
    {sequence: 'order_no',key:'order_no'},
    {sequence: 'priority',key:'priority'},
    {sequence: 'quantity',key:'quantity'},
    {sequence: 'req_date',key:'req_date'},
  ];
  
  @ViewChild('MatSort2') sort2: MatSort;
  sequenceKeyMapping2:any = [
    {sequence: 'order_no',key:'order_no'},
    {sequence: 'quantity',key:'quantity'},
    {sequence: 'priority',key:'priority'},
    {sequence: 'req_date',key:'req_date'},
  ];

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  constructor(
    private toastr: ToastrService,
    private orderManagerService: OrderManagerService,
    private authService: AuthService,
    private dialog: MatDialog,
    private _liveAnnouncer1: LiveAnnouncer,
    private _liveAnnouncer2: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.tableData1 = new MatTableDataSource([
      { order_no: '1', priority: '1', quantity: '1', req_date: '20/May/2023' },
      { order_no: '2', priority: '2', quantity: '320', req_date: '20/May/2023' },
      { order_no: '3', priority: '3', quantity: '66', req_date: '20/May/2023' },
      { order_no: '4', priority: '4', quantity: '320', req_date: '20/May/2023' },
      { order_no: '5', priority: '5', quantity: '43', req_date: '20/May/2023' },
      { order_no: '6', priority: '6', quantity: '320', req_date: '20/May/2023' },
      { order_no: '7', priority: '7', quantity: '320', req_date: '20/May/2023' },
      { order_no: '8', priority: '12', quantity: '320', req_date: '20/May/2023' },
      { order_no: '9', priority: '12', quantity: '33', req_date: '20/May/2023' },
      { order_no: '10', priority: '12', quantity: '343', req_date: '20/May/2023' },
      { order_no: '11', priority: '7', quantity: '3444', req_date: '20/May/2023' },
      { order_no: '12', priority: '12', quantity: '320', req_date: '20/May/2023' },
      { order_no: '13', priority: '12', quantity: '44', req_date: '20/May/2023' },
      { order_no: '14', priority: '3', quantity: '320', req_date: '20/May/2023' },
      { order_no: '15', priority: '12', quantity: '320', req_date: '20/May/2023' },
      { order_no: '16', priority: '8', quantity: '34', req_date: '20/May/2023' },
      { order_no: '17', priority: '12', quantity: '320', req_date: '20/May/2023' },
      { order_no: '18', priority: '12', quantity: '77', req_date: '20/May/2023' },
      { order_no: '19', priority: '12', quantity: '320', req_date: '20/May/2023' },
      { order_no: '20', priority: '2', quantity: '320', req_date: '20/May/2023' },
      { order_no: '21', priority: '12', quantity: '320', req_date: '20/May/2023' },
      { order_no: '22', priority: '12', quantity: '320', req_date: '20/May/2023' },
      { order_no: '23', priority: '2', quantity: '88', req_date: '20/May/2023' },
      { order_no: '24', priority: '3', quantity: '223', req_date: '20/May/2023' },
    ]);
    this.tableData1.paginator = this.paginator1;
    this.tableData2.paginator = this.paginator2;
  }

  add(order: any) {
    this.tableData2 = new MatTableDataSource(this.tableData2.filteredData.concat(order));
    this.tableData1 =  new MatTableDataSource(this.tableData1.filteredData.filter((value, key) => {
      return value.order_no != order.order_no;
    }));
  }

  remove(order: any) {
    this.tableData1 = new MatTableDataSource(this.tableData1.filteredData.concat(order));
    this.tableData2 = new MatTableDataSource(this.tableData2.filteredData.filter((value, key) => {
      return value.order_no != order.order_no;
    }));
  }

  addAll() {
    this.tableData2 = new MatTableDataSource(this.tableData2.filteredData.concat(this.tableData1.filteredData));
    this.tableData1 = new MatTableDataSource([]);
  }

  removeAll() {
    this.tableData1 = new MatTableDataSource(this.tableData1.filteredData.concat(this.tableData2.filteredData));
    this.tableData2 = new MatTableDataSource([]);
  }

  locationAssignment() {
    if (this.tableData2.length == 0) {
      this.toastr.error("There were no orders selected for location assignment marking", 'No Orders Selected', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          heading: 'Mark Selected Orders for PICK Location Assignment?',
          message: 'Do you want to mark these orders for location assignment?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Yes') {
          let payload: any = {
            "transType": 1,
            "orders": this.tableData2.map((item: any) => { return item.order_no }),
            "username": this.userData.userName,
            "wsid": this.userData.wsid
          };
          this.orderManagerService.get(payload, '/Admin/LocationAssignmentOrderInsert').subscribe((res: any) => {
            if (res.isExecuted && res.data) {
              this.toastr.success(labels.alert.success, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
            } else {
              this.toastr.error("There was an error marking these orders for location assignment", 'Error', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
            }
          });
        }
      });
    };
  }

  Search(){
    this.tableData1 = new MatTableDataSource();
    this.tableData2 = new MatTableDataSource();
  }


  //Sorting
  announceSortChange1(sortState: Sort) {
    sortState.active = this.sequenceKeyMapping1.filter((x:any) => x.sequence == sortState.active)[0]?.key;
    if (sortState.direction) {
      this._liveAnnouncer1.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer1.announce('Sorting cleared');
    }
    this.tableData1.sort = this.sort1;
  }

  announceSortChange2(sortState: Sort) {
    debugger;
    sortState.active = this.sequenceKeyMapping2.filter((x:any) => x.sequence == sortState.active)[0]?.key;
    if (sortState.direction) {
      this._liveAnnouncer2.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer2.announce('Sorting cleared');
    }
    this.tableData2.sort = this.sort2;
  }

}
