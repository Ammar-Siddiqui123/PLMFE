import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { GlobalconfigService } from '../globalconfig.service';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  userData: any;

  constructor(
    private dialog: MatDialog,
    private globalconfigService : GlobalconfigService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getServiceStatus();
  }

  getServiceStatus(loader: boolean = false){
    let payload: any = {};
    this.globalconfigService.get(payload, '/GlobalConfig/StatusPrintService',loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.running = res.data;
      }
    });
  }

  startService(loader: boolean = false){
    let payload: any = {};
    this.globalconfigService.get(payload, '/GlobalConfig/StartPrintService',loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.running = true;
        this.toastr.success("Service start was successful.", 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
      else{
        this.toastr.error("Service start was unsuccessful. Please try again or contact Scott Tech for support.", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  stopService(loader: boolean = false){
    let payload: any = {};
    this.globalconfigService.get(payload, '/GlobalConfig/StopPrintService',loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.running = false;
        this.toastr.success("Service stop was successful.", 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
      else{
        this.toastr.error("Service stop encountered an error. Please try again or contact Scott Tech for support.", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  restartService(loader: boolean = false){
    let payload: any = {};
    this.globalconfigService.get(payload, '/GlobalConfig/RestartPrintService',loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.running = true;
        this.toastr.success("Service restart was successful.", 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
      else{
        this.toastr.error("Service restart was unsuccessful. Please try again or contact Scott Tech for support.", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
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
        else {
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

  SavePrinter(printer: any) {
    // if (printer == "New") {
    //   config.server.insertNewPrinter($('[name="New_printerinput"]').val(), $('[name="New_addinput"]').val(), $this.parent().siblings().children('.toggles').data('toggles').active).done(function (data) {
    //     if (data == '') {
    //       $('#printer_add').removeAttr('disabled');
    //       $this.attr('disabled', 'disabled');
    //       var newName = $('[name="New_printerinput"]');
    //       newName.attr('name', newName.val() + '_name')
    //       $('[name="New_addinput"]').attr('name', newName.val() + '_add');
    //       $this.parent().siblings().children('.toggles').data('name', newName.val());
    //       $this.parent().siblings().children('.remove-printer').attr('name', newName.val());
    //       $this.attr('name', newName.val());

    //     } else {
    //       alert(data);
    //     };
    //   });
    // } else {
    //   config.server.updateCurrentPrinter(printer, $('[name="' + printer + '_name"]').val(), $('[name="' + printer + '_add"]').val(), $this.parent().siblings().children('.toggles').data('toggles').active).done(function (data) {
    //     if (data != '') {
    //       alert(data);
    //     } else {
    //       $this.attr('disabled', 'disabled');
    //     };
    //   });
    // };
  }
}

