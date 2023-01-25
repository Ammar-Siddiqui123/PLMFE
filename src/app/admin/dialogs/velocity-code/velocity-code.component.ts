import { Component, OnInit , Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VelocityCodeService } from '../../../../app/common/services/velocity-code.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-velocity-code',
  templateUrl: './velocity-code.component.html',
  styleUrls: ['./velocity-code.component.scss']
})

export class VelocityCodeComponent implements OnInit {
  
  public velocity_code_list: any;
  public velocity_code_list_Res: any;
  public currentVelocity="";
  public userData: any;
  @ViewChild('btnSave') button;
  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private velcodeService: VelocityCodeService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.currentVelocity = this.data.vc
    this.getVelocity();
    
  }

  getVelocity(){
    this.velcodeService.getVelocityCode().subscribe((res) => {
      this.velocity_code_list_Res = [...res.data];
      this.velocity_code_list = res.data;
     });
  }

  addVLRow(row:any){
    this.velocity_code_list.unshift([]);
  }
  saveVlCode(vlcode:any, oldVC:any){ 
    if(vlcode){
    let cond = true;
    this.velocity_code_list_Res.forEach(element => {
      if(element == vlcode ) { 
        cond = false;
       this.toastr.error('Velocity cannot be saved! Another velocity code matches the current. Please save any pending changes before attempting to save this entry.', 'Error!', {
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
      this.getVelocity()
    });
    } 
  }
  }
  dltVlCode(vlCode:any){
    if(vlCode){
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
      })
      dialogRef.afterClosed().subscribe(result => {
          if(result === 'Yes'){
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
    
  }  else {
    this.velocity_code_list.shift();
  }
  }

  valueEntered()
  {
    alert("TRIGGERED");
    this.button.nativeElement.disabled = true;
  }

  selectVlCode(selectedVL: any){
    this.dialogRef.close(selectedVL.value);
  }
  clearVlCode(){
    this.dialogRef.close('');
  }

}
