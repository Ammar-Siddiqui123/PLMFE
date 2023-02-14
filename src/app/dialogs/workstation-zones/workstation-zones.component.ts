import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ProcessPicksService } from '../../../app/induction-manager/process-picks/process-picks.service';
import { DeleteConfirmationComponent } from '../../../app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { VelocityCodeService } from '../../../app/common/services/velocity-code.service';
import { AuthService } from '../../../app/init/auth.service';
import labels from '../../labels/labels.json';

@Component({
  selector: 'app-workstation-zones',
  templateUrl: './workstation-zones.component.html',
  styleUrls: ['./workstation-zones.component.scss']
})
export class WorkstationZonesComponent implements OnInit {

  public velocity_code_list: any[] = [];
  public velocity_code_list_Res: any;
  public currentVelocity = "";
  onDestroy$: Subject<boolean> = new Subject();
  public userData: any;
  public selectedZone: any;
  public allZoneList: any[] = [];
  public zones: any[] = [];
  @ViewChild('btnSave') button;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private velcodeService: VelocityCodeService,
    private proPickService: ProcessPicksService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    // this.currentVelocity = this.data.vc
    this.getVelocity();
    this.getAllZoneList();

  }

  getVelocity() {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.velocity_code_list = [];
    this.proPickService.get(paylaod, '/Induction/WSPickZoneSelect').subscribe((res) => {
      if (res.data) {
        res.data.map(val => {
          this.velocity_code_list.push({ 'zone': val, isSaved: true })
        })
      }
      // console.log(this.velocity_code_list);
    });
  }
  getAllZoneList() {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.velocity_code_list = [];
    this.proPickService.get(paylaod, '/Induction/LocationZonesSelect').subscribe((res) => {
      if (res.data) {
        this.zones = res.data;
      }
    });
  }

  addVLRow(row: any) {
    this.allZoneList.unshift([]);
  }
  dltZone(){
    this.allZoneList = [];
  }
  onSelectZone(val:string){
    this.selectedZone = val
  }
  saveVlCode() {
      let paylaod = {
        "zone": this.selectedZone,
        "wsid": this.userData.wsid,
      }
      this.proPickService.create(paylaod, '/Induction/WSPickZoneInsert').subscribe((res) => {
        if (res.data) {
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.getVelocity();
          this.allZoneList = [];
        }
        else {
          this.toastr.error(res.sresponseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }

      });
  }
  dltVlCode(vlCode: any) {
    if (vlCode) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Yes') {
          let paylaod = {
            "velocity": vlCode,
            "username": this.userData.userName,
            "wsid": this.userData.wsid,
          }
          this.velcodeService.dltVelocityCode(paylaod).subscribe((res) => {
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });

            this.getVelocity();

          });
        }
      })

    } else {
      this.velocity_code_list.shift();
    }
  }

  delete(event: any) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      if (result === 'Yes') {
        let paylaod = {
          "Zone": event,
          "wsid": this.userData.wsid,
        }
        this.proPickService.delete(paylaod, '/Induction/WSPickZoneDelete').subscribe((res) => {
          console.log(res);
          if (res.isExecuted) {
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.getVelocity();
          }
          else{
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }

        });
      }

    })
  }

  valueEntered() {
    alert("TRIGGERED");
    this.button.nativeElement.disabled = true;
  }

  selectVlCode(selectedVL: any) {
    this.dialogRef.close(selectedVL.value);
  }
  clearVlCode() {
    this.dialogRef.close('');
  }

  closeBatchDialog(){
    this.dialogRef.close(this.velocity_code_list);
  }

}
