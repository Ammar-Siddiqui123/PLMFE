import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
  public displayedColumns: string[] = [
    'zone',
    'warehouse',
    'locationName',
    'totalPicks',
    'transactionType',
    'actions',
  ];
  constructor(
    private adminService: AdminService,
    public authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getAdminMenu();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getAdminMenu() {
    let payload = {
      userName: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.adminService
      .get(payload, '/Admin/GetAdminMenu')
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
