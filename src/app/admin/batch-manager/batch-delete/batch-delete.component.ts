import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  Optional,
  Inject,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
 
import { AuthService } from '../../../../app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-batch-delete',
  templateUrl: './batch-delete.component.html',
  styleUrls: ['./batch-delete.component.scss'],
})
export class BatchDeleteComponent implements OnInit {
  transList: any = [
    {
      id: 'Pick',
      name: 'Pick',
    },
    {
      id: 'Put Away',
      name: 'Put Away',
    },
    {
      id: 'Count',
      name: 'Count',
    },
  ];
  batchList: any = [];
  transType: string = 'Pick';
  batchID: string | undefined = '';
  isChecked = true;

  public userData: any;
  public dltType: any;
  @ViewChild('deleteAction') dltActionTemplate: TemplateRef<any>;
  @ViewChild('deleteByTransaction') dltByTransactionTemplate: TemplateRef<any>;

  @Output() transTypeEmitter = new EventEmitter<any>();
  @Output() deleteEmitter = new EventEmitter<any>();
  @Input()
  set batchUpdater(batchUpdater: Event) {
    if (batchUpdater) {
      this.getBatch(this.transType);
    }
  }

  constructor(
    private dialog: MatDialog,
    private api: ApiFuntions,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getBatch(this.transType);
  }
  checkOptions(event: MatCheckboxChange): void {
    if (event.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }
  getBatch(type: any) {
    try {
      let paylaod = {
        transType: type,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
      this.api
        .SelectBatchesDeleteDrop(paylaod)
        .subscribe((res: any) => {
          this.batchList = [];
          if (res.isExecuted && res.data.length > 0) {
            this.batchList.push('All Transaction');
            res.data.forEach((i: any) => {
              i ? this.batchList.push(i) : '';
            });
          }
        });
    } catch (error) { 
    }
  }

  changeTranType(value: any) {
    this.getBatch(value);
    this.transTypeEmitter.emit(value);
  }

  deleteBatch(type: any, id: any) {
    if(id == '') return;
    let payload = {
      batchID: id,
      identity: 2,
      transType: type,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    if (this.batchID !== 'All Transaction') {
      let dialogRef = this.dialog.open(this.dltActionTemplate, {
        width: '550px',
        autoFocus: '__non_existing_element__',
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (this.dltType) {
          if (this.dltType == 'batch_tote') {
            payload.identity = 0;
          } else {
            payload.identity = 1;
          }
          this.api
            .BatchDeleteAll(payload)
            .subscribe((res: any) => {
              if (res.isExecuted) {
                this.ngOnInit();
                this.toastr.success(res.responseMessage, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.deleteEmitter.emit(res);
                this.batchID = "";
                this.dltType = "";
              }
            });
        }
      });
    } else {
      payload.identity = 2;
      const dialogRef = this.dialog.open(this.dltByTransactionTemplate, {
        width: '550px',
        autoFocus: '__non_existing_element__',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (this.dltType === 'batch_tote_trans') {
          this.api
            .BatchDeleteAll(payload)
            .subscribe((res: any) => {
              if (res.isExecuted) {
                this.ngOnInit();
                this.toastr.success(res.responseMessage, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.deleteEmitter.emit(res.data);
                this.batchID = "";
                this.dltType = "";
              }
            });
        }
      });
    }
    this.isChecked = false;
  }
  onDltOptions(dltType: any) {
    this.dltType = dltType;
    this.dialog.closeAll();
  }
}
