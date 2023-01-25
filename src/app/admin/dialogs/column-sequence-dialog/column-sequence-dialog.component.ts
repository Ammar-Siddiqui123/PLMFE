import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { ColumnSequenceService } from './column-sequence.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-column-sequence-dialog',
  templateUrl: './column-sequence-dialog.component.html',
  styleUrls: ['./column-sequence-dialog.component.scss'],
})
export class ColumnSequenceDialogComponent implements OnInit {
  dialogData;
  payload;
  unorderedCol: any = [];
  defaultCol: any = [];
  constructor(
    private columnseqService: ColumnSequenceService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogData = data;
  }
  @ViewChild('table') table: MatTable<any>;

  ngOnInit(): void {
    this.initializePayload(this.dialogData.tableName);
    this.getColumnsSeqDetail();
  }
  addArr(col, index) {
    this.defaultCol.push(...this.unorderedCol.splice(index, 1));
  }

  remove(col, index) {
    this.unorderedCol.push(...this.defaultCol.splice(index, 1));
  }

  save() {
    console.log('undercol', this.unorderedCol);
    console.log('defaultCol', this.defaultCol);

    this.payload.columns = this.defaultCol;
    this.dialogRef.close({ isExecuted: true });
  }

  initializePayload(tableName) {
    let userData = this.authService.userData();
    this.payload = {
      username: userData.userName,
      wsid: userData.wsid,
      viewName: tableName,
    };
  }

  saveColumnsSeq() {
    this.columnseqService.get(this.payload, '/Admin/SaveColumns').subscribe(
      (res: any) => {
        if (res.isExecuted) {
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          this.dialogRef.close({ isExecuted: true });
        }
        this.dialogRef.close('');
      },
      (error) => {
        this.toastr.error(labels.alert.went_worng, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
        this.dialogRef.close({ isExecuted: false });
      }
    );
  }

  getColumnsSeqDetail() {
    this.columnseqService
      .get(this.payload, '/Admin/GetColumnSequenceDetail')
      .subscribe((res: any) => {
        this.unorderedCol = res.data?.allColumnSequence;
      });
    // this.seqColumn
    //   .getSetColumnSeq()
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((res) => {
    //     this.displayedColumns = TRNSC_DATA;

    //     if (res?.data?.columnSequence) {
    //       this.columnValues = res.data?.columnSequence;
    //       this.columnValues.push('actions');
    //       this.getContentData();
    //     } else {
    //       this.toastr.error('Something went wrong', 'Error!', {
    //         positionClass: 'toast-bottom-right',
    //         timeOut: 2000,
    //       });
    // }
    // });
  }
}
