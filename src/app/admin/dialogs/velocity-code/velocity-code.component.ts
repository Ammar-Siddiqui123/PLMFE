import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VelocityCodeService } from '../../../../app/common/services/velocity-code.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'

@Component({
  selector: 'app-velocity-code',
  templateUrl: './velocity-code.component.html',
  styleUrls: ['./velocity-code.component.scss']
})
export class VelocityCodeComponent implements OnInit {
  public velocity_code_list: any;
  public userData: any;
  constructor(
    private velcodeService: VelocityCodeService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.velcodeService.getVelocityCode().subscribe((res) => {
     this.velocity_code_list = res.data;
    });
  }
  addVLRow(row:any){
    this.velocity_code_list.unshift([]);
  }
  saveVlCode(vlcode:any, oldVC:any){ 

    let cond = true;
    this.velocity_code_list.forEach(element => {
      if(element == vlcode ) { 
        cond = false;
       this.toastr.error('Already Exists', 'Error!', {
         positionClass: 'toast-bottom-right',
         timeOut: 2000
       });
       return;
      }   
    });

    if(cond){

    let paylaod = {
      "oldVelocity": oldVC.toString(),
      "velocity": vlcode,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    } 
    this.velcodeService.saveVelocityCode(paylaod).subscribe((res) => {
      this.toastr.success(labels.alert.success, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    });
    }
  }
  dltVlCode(vlCode:any){
    let paylaod = {
      "velocity": vlCode,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.velocity_code_list.shift(vlCode);
    this.velcodeService.dltVelocityCode(paylaod).subscribe((res) => {
      this.toastr.success(labels.alert.delete, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    });
  }

  selectVlCode(selectedVL: any){
    this.dialogRef.close(selectedVL.value);
  }
  clearVlCode(){
    this.dialogRef.close('');
  }

}
