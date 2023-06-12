import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/admin/admin.service';
import { AddNewDeviceComponent } from 'src/app/admin/dialogs/add-new-device/add-new-device.component';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-sp-device-preference',
  templateUrl: './sp-device-preference.component.html',
  styleUrls: ['./sp-device-preference.component.scss'],
})
export class SpDevicePreferenceComponent implements OnInit {
  public dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public userData: any;
  pageEvent: PageEvent;
  sortCol = 0;
  sortDir = 'asc';
  customPagination: any = {
    total: '',
    recordsPerPage: 10,
    startIndex: 0,
    endIndex: 10,
  };
  public displayedColumns: string[] = [
    'zone',
    'deviceType',
    'device',
    'deviceModel',
    'controllerType',
    'controllerTermPort',
    'arrowDirection',
    'lightDirection',
    'userLaserPointer',
    'useLightTree',
    'firstAddress',
    'positions',
    'displayCharacters',
    'actions',
  ];
  constructor(
    private adminService: AdminService,
    public authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getDevicePrefTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDevicePrefTable() {
    let payload = {
      draw: 0,
      start: this.customPagination.startIndex,
      length: this.customPagination.recordsPerPage,
      column: this.sortCol,
      sortDir: this.sortDir,
      zone: '',
      userName: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.adminService
      .get(payload, '/Admin/DevicePreferenceTable')
      .subscribe((res: any) => {
        if (res && res?.data?.totalOrders) {
          this.dataSource = new MatTableDataSource(
            res.data.totalOrders.orderTable
          );
        }
        if (res && res?.data?.totalOrders && res?.data?.totalOrders?.adminValues) {
        }
      });
  }

  addEditNewDevice(item?, isEdit = false) {
    let dialogRef = this.dialog.open(AddNewDeviceComponent, {
      height: 'auto',
      width: '960px',
      autoFocus: '__non_existing_element__',
      data: {
        isEdit: isEdit,
        item: item,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.customPagination.startIndex = e.pageSize * e.pageIndex;
    this.customPagination.endIndex = e.pageSize * e.pageIndex + e.pageSize;
    this.customPagination.recordsPerPage = e.pageSize;
    this.getDevicePrefTable();
  }
  deleteAllOrders(item) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        action: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
      }
    });
  }
}
