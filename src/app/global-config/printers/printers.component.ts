import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss']
})
export class PrintersComponent implements OnInit {
  sideBarOpen: boolean = true;
  displayedColumns: string[] = ['printerName', 'printerAddress', 'labelPrinter', 'actions'];
  toteTable: any[] = ['10', '10', '10', '10', '10', '10'];

  running: boolean = false;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ServiceToggle(text: any) {
    if (text == "Start Print Service") {
      this.running = true;
      this.WaitForService();
      // config.server.startService().done(function (success) {
      this.ServiceStatus('start', true);
      // });
    }
    else {
      this.running = false;
      this.WaitForService();
      // config.server.stopService().done(function (success) {
      this.ServiceStatus('stop', true);
      // });
    }
  }

  RestartService() {
    this.WaitForService();
    // config.server.restartService().done(function (success) {
    this.ServiceStatus('restart', true);
    // });
  }

  ServiceStatus(changeType: any, success: any) {
    if (changeType == 'start' || changeType == 'restart') {
      if (success) {
        this.setOnline();
        // alert('Service ' + changeType + ' was successful.');
      } else {
        this.setOffline();
        // alert('Service ' + changeType + ' was unsuccessful.  Please try again or contact Scott Tech for support.');
      };
    } else {
      this.setOffline();
      if (success) {
        // alert('Service stop was successful.');
      } else {
        // alert('Service stop encountered an error.  Please try again or contact Scott Tech for support.');
      };
    };
  }

  WaitForService() {

  }

  setOnline() {

  }

  setOffline() {

  }

  RemovePrinter(printer: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'remove-printer',
        ErrorMessage: `Are you sure you wish to delete this printer: ${printer.name}?`,
        action: 'delete'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
        if (printer == "New") {
          // $this.parent().parent().remove();
          // $('#printer_add').removeAttr('disabled');
        }
        else{
          // let payload = {
          //   "ids": ids,
          //   "user": this.userData.userName,
          //   "wsid": this.userData.wsid
          // };
          // this.orderManagerService.get(payload, '/globalconfig/deletePrinter').subscribe((res: any) => {
          //   if (res.isExecuted && res.data) {
          //     this.toastr.success(labels.alert.delete, 'Success!', {
          //       positionClass: 'toast-bottom-right',
          //       timeOut: 2000
          //     });
          //     $this.parent().parent().remove();
          //   } else {
          //     this.toastr.error("Delete Failed", 'Error!', {
          //       positionClass: 'toast-bottom-right',
          //       timeOut: 2000
          //     });
          //   }
          // });
        }
      }
    });
  }
}

