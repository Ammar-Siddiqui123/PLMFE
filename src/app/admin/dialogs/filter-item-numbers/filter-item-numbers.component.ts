import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import labels from '../../../labels/labels.json';
import { AuthService } from 'src/app/init/auth.service';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-filter-item-numbers',
  templateUrl: './filter-item-numbers.component.html',
  styleUrls: ['./filter-item-numbers.component.scss']
})
export class FilterItemNumbersComponent implements OnInit {

  public userData: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private Api: ApiFuntions,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filterItemNumbers() {
    // if (this.data.trim() != "") {
      let itemsStr = this.data.trim().replace(/[\n\r]/g, ',');
      let itemsArray = itemsStr.split(',');
      itemsArray = itemsArray.filter((item: any) => item != "");
      let commaSeparatedItems = itemsArray.join(',');
      let payload: any = {
        "items": commaSeparatedItems,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
      }
      this.Api.FiltersItemNumInsert(payload).subscribe((res: any) => {
        if (res.isExecuted && res.data) {
          // this.toastr.success(labels.alert.success, 'Success!', {
          //   positionClass: 'toast-bottom-right',
          //   timeOut: 2000
          // });
          this.dialog.closeAll();
          this.dialogRef.close({ filterItemNumbersText: this.data, filterItemNumbersArray: itemsArray });
        } else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.dialog.closeAll();
        }
      });
    // }
    // else{
    //   this.dialog.closeAll();
    // }
  }

}
