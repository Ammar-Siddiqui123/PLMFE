import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { ColumnSequenceService } from './column-sequence.service';
import labels from '../../../labels/labels.json';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-column-sequence-dialog',
  templateUrl: './column-sequence-dialog.component.html',
  styleUrls: ['./column-sequence-dialog.component.scss'],
})
export class ColumnSequenceDialogComponent implements OnInit {
  dialogData;
  payload;
  userData;
  unorderedCol: any = [];
  defaultCol: any = [];
  constructor(
    private columnseqService: ColumnSequenceService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialog: MatDialog,
    
  ) {
    this.dialogData = data;
   
  }
  @ViewChild('table') table: MatTable<any>;

  ngOnInit(): void {
    this.userData=this.authService.userData()
    this.initializePayload(this.dialogData.tableName);
    this.getColumnsSeqDetail();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  addArr(index) {
    this.defaultCol.push(...this.unorderedCol.splice(index, 1));
  }

  remove(index) {
    this.unorderedCol.push(...this.defaultCol.splice(index, 1));
  }

  autofill() {
    const autoArray = [...this.unorderedCol, ...this.defaultCol];
    this.defaultCol = autoArray;
    this.unorderedCol.length = 0;
  }
  restoreCol() {
    const autoArray = [...this.defaultCol, ...this.unorderedCol];
    this.unorderedCol = autoArray;
    this.defaultCol.length = 0;
  }
  save() {
    this.payload.columns = this.defaultCol;
    this.saveColumnsSeq();
    // this.dialogRef.close({ isExecuted: true });
  }
  deleteColSeq() {

    this.restoreCol();
    let payload = {
      username: this.userData.userName,
      wsid: this.userData.wsid,
      viewName:this.dialogData.tableName,
    };
    
    this.columnseqService
      .get(this.payload, '/Admin/DeleteColumns')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
           
          } 
        },
        (error) => {
          this.toastr.error(labels.alert.went_worng, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
       
        }
      );

      
    // const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    //   height: 'auto',
    //   width: '480px',
    //   autoFocus: '__non_existing_element__',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 'Yes') {
    //     let payload = {
    //       username: this.userData.userName,
    //       wsid: this.userData.wsid,
    //       viewName:this.dialogData.tableName,
    //     };
    //     this.columnseqService
    //       .get(this.payload, '/Admin/DeleteColumns')
    //       .subscribe(
    //         (res: any) => {
    //           if (res.isExecuted) {
    //             this.toastr.success(labels.alert.success, 'Success!', {
    //               positionClass: 'toast-bottom-right',
    //               timeOut: 2000,
    //             });
    //             this.dialogRef.close({ isExecuted: false });
    //           } else {
    //             this.dialogRef.close('');
    //           }
    //         },
    //         (error) => {
    //           this.toastr.error(labels.alert.went_worng, 'Error!', {
    //             positionClass: 'toast-bottom-right',
    //             timeOut: 2000,
    //           });
    //           this.dialogRef.close({ isExecuted: false });
    //         }
    //       );
    //   }
    // });
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
        } else {
          this.dialogRef.close('');
        }
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
        if (res.data?.columnSequence.length) {
          this.defaultCol = res.data.columnSequence;

          const namesToDeleteSet = new Set(this.defaultCol);
          const newArr = this.unorderedCol.filter((name) => {
            return !namesToDeleteSet.has(name);
          });
          this.unorderedCol = newArr;
        }
      });
  }
}
