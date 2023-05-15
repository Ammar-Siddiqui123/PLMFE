import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcessPutAwayService } from '../processPutAway.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mark-empty-reels',
  templateUrl: './mark-empty-reels.component.html',
  styleUrls: ['./mark-empty-reels.component.scss'],
})
export class MarkEmptyReelsComponent implements OnInit {
  scanSerial;
  lastScanned;
  lastScannedList: any = [];
  notifyMessage = '';
  itemInvalid = false;
  itemEmpty = false;
  @ViewChild('autoFocusField') searchBoxField: ElementRef;
  scannedSerialList: MatTableDataSource<any>;
  displayedColumns_1: string[] = ['scannedserialnumbers', 'actions'];
  userData;

  constructor(
    private dialog: MatDialog,
    public imService: ProcessPutAwayService,
    public toastService: ToastrService,
    private authService: AuthService
  ) {
    this.scannedSerialList = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }
  scanSerialEvent(event) {
    if (this.scanSerial == '') {
      this.itemEmpty = true;
      this.notifyMessage = 'Please enter a serial number';
      this.lastScanned = this.lastScannedList[this.lastScannedList.length - 1];
    } else if (this.lastScannedList.includes(this.scanSerial)) {
      this.itemInvalid = true;
      this.notifyMessage = 'Serial Number already scanned';
      this.lastScanned = this.scanSerial;
    } else {
      // validate serial
      let payload = {
        serialNumber: this.scanSerial,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
      this.imService
        .get(payload, '/Induction/ValidateSerialNumber') //validate tote
        .subscribe((response: any) => {
          if (response.isExecuted) {
            switch (response.data) {
              case 'Error':
                this.itemInvalid = true;
                this.notifyMessage =
                  'There was an error validating serial number';
                this.scanSerial = '';
                break;

              case 'InValid':
                this.itemInvalid = true;

                this.notifyMessage = 'Serial Number Does Not Exist';
                this.scanSerial = '';

                break;

              case 'Valid':
                this.itemInvalid = false;
                this.itemEmpty = false;
                // append in row
                const newRow = { scannedserialnumbers: this.scanSerial };
                this.scannedSerialList.data.push(newRow);
                this.scannedSerialList._updateChangeSubscription();
                this.scanSerial = '';
                break;
              default:
                break;
            }
          }
        });
      this.itemInvalid = false;
      this.lastScannedList.push(this.scanSerial);
      this.lastScanned = this.scanSerial;
    }
  }
  removeRow(index: number, el) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-create-count',
        action: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
        // Remove item from last scanned list
        const indexToRemove = this.lastScannedList.findIndex(
          (item) => item === el.scannedserialnumbers
        );
        console.log(indexToRemove);

        if (indexToRemove !== -1) {
          this.lastScannedList.splice(indexToRemove, 1);
        }
        console.log(this.lastScannedList);

        //  remove row from datasource
        this.scannedSerialList.data.splice(index, 1);
        this.scannedSerialList._updateChangeSubscription();
        this.itemInvalid = false;
        this.itemEmpty = false;
      }
    });
  }
  markReelAsEmpty() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-create-count',
        action: 'delete',
        ErrorMessage:
          'You are about to mark the scanned reels as empty. This will delete ALL current open transactions associated with the scanned reels.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
        let serialNumbersArr: any = [];
        this.scannedSerialList.data.forEach((item) => {
          serialNumbersArr.push(item.scannedserialnumbers);
        });

        //  Renmoves all serial numbers from list 

        let payload = {
          serialNumbers: serialNumbersArr,
          username: this.userData.userName,
          wsid: this.userData.wsid,
        };
        this.imService
        .get(payload, '/Induction/DeleteSerialNumber') //validate tote
        .subscribe((response: any) => {
          if (response.isExecuted) {
            this.toastService.success(response.responseMessage, 'Success!',{
              positionClass: 'toast-bottom-right',
              timeOut:2000
           });
          }else{
            this.toastService.error(response.responseMessage, 'Error!',{
              positionClass: 'toast-bottom-right',
              timeOut:2000
           });
          }
        });
      }
    });
  }
  ngAfterViewInit() {
    this.searchBoxField.nativeElement.focus();
  }
}
