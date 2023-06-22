import { Component, OnInit , Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs'; 
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-velocity-code',
  templateUrl: './velocity-code.component.html',
  styleUrls: ['./velocity-code.component.scss']
})

export class VelocityCodeComponent implements OnInit {
  
  public velocity_code_list: any;
  public velocity_code_list_Res: any;
  public currentVelocity="";
  onDestroy$: Subject<boolean> = new Subject();
  public userData: any;
  @ViewChild('btnSave') button;
  disableEnable=[{index:-1,value:false}];
  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Api: ApiFuntions,
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
    this.Api.getVelocityCode().subscribe((res) => {
      this.velocity_code_list_Res = [...res.data];
      this.velocity_code_list = res.data;
      this.disableEnable.shift();
      for(var i=0;i<this.velocity_code_list.length;i++)
      {
      this.disableEnable.push({index:i,value:true});
      }
     });

  }

  changeDisable(index:any)
  {
    this.disableEnable[index].value=false;
  }

  addVLRow(row:any){
    this.velocity_code_list.unshift([]);
    //this.disableEnable.unshift({index:0,value:false});
  }
  saveVlCode(vlcode:any, oldVC:any){ 
    if(vlcode){
    let cond = true;
    this.velocity_code_list_Res.forEach(element => {
      if(element == vlcode) { 
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
    this.Api.saveVelocityCode(paylaod).subscribe((res) => {
      this.toastr.success(labels.alert.success, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.getVelocity()
    });
    } 
  } else {
    this.toastr.error('Velocity cannot be empty!.', 'Error!', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    });
    return;
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
            this.Api.dltVelocityCode(paylaod).subscribe((res) => {
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

  deleteVC(event: any){
    
    
    if(event != ''){
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'delete-velocity',
          velocity: event
        //  grp_data: grp_data
        }
      })
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      this.getVelocity();
      })
    }
    else{
      this.velocity_code_list.shift();
      this.getVelocity();
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
