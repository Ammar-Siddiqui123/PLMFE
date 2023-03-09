import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintRangeComponent } from '../print-range/print-range.component';
import { ToastrService } from 'ngx-toastr';
import { UnitOfMeasureService } from 'src/app/common/services/unit-measure.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-unit-measure',
  templateUrl: './unit-measure.component.html',
  styleUrls: ['./unit-measure.component.scss']
})
export class UnitMeasureComponent implements OnInit {

  public unitOfMeasure_list: any;
  public userData: any;
  enableButton=[{index:-1,value:true}];


  constructor(private dialog: MatDialog,
              private umService: UnitOfMeasureService,
              private authService: AuthService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getUOM()
  }
  getUOM(){
    this.enableButton.shift();
    this.umService.getUnitOfMeasure().subscribe((res) => {
      if (res.isExecuted) {
        this.unitOfMeasure_list = res.data;

        for(var i=0;i<this.unitOfMeasure_list.length;i++)
      {
        this.unitOfMeasure_list.fromDB = true;
        this.enableButton.push({index:i,value:true});
      }
      }
    });
  }

  addUMRow(row : any){
    this.unitOfMeasure_list.unshift("");
    console.log(this.unitOfMeasure_list)
  }

  saveUnitMeasure(um : any, oldUM : any) {

    let cond = true;
    if(um){
    this.unitOfMeasure_list.forEach(element => {
      if(element.toLowerCase() == um.toLowerCase() ) {
        cond = false;
       this.toastr.error('Already Exists', 'Error!', {
         positionClass: 'toast-bottom-right',
         timeOut: 2000
       });
       return;
      }   
    });
  }
    if(um && cond){
    let paylaod = {      
      "newValue": um,
      "oldValue": oldUM.toString(),
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    
    this.umService.saveUnitOfMeasure(paylaod).subscribe((res) => {
      if(res.isExecuted){
        this.getUOM();
        this.toastr.success( oldUM.toString()==''?labels.alert.success:labels.alert.update, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
  
    });
  }
  }

  enableDisableButton(i:any)
  {
  this.enableButton[i].value=false;
  }

  dltUnitMeasure(um : any,fromDB:any) {



    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
     if(result === 'Yes'){
      if(um && fromDB==true){
        let paylaod = {
          "newValue": um,
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
        
        this.umService.dltUnitOfMeasure(paylaod).subscribe((res) => {
          if(res.isExecuted){
            this.getUOM();
          this.toastr.success(labels.alert.delete, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
        });
      } else {
        this.unitOfMeasure_list.shift();
      }
     }
    })








  
  }

  selectUnitMeasure(selectedUM: any){
    this.dialogRef.close(selectedUM);
  }

  clearUnitMeasure(){
    this.dialogRef.close('');
  }

}
