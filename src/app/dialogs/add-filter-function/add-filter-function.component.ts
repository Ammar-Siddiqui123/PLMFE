import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProcessPicksService } from '../../../app/induction-manager/process-picks/process-picks.service';
import { ItemNumUpdateConfirmationComponent } from '../../../app/admin/dialogs/item-num-update-confirmation/item-num-update-confirmation.component';
import { AuthService } from '../../../app/init/auth.service';


@Component({
  selector: 'app-item-number',
  templateUrl: './add-filter-function.component.html',
  styleUrls: ['./add-filter-function.component.scss']
})
export class AddFilterFunction implements OnInit {

  // updateItemNumber : boolean = true;
  addItem : boolean = true;
  submit: boolean = false;
  filter_name:any
  userData;

  constructor(
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private confirmationdialog: MatDialog,
              private pPickService: ProcessPicksService,
              private authService: AuthService
              ) { }

  ngOnInit(): void {  
    this.userData = this.authService.userData();
    console.log(this.data)
    if(this.data.savedFilter){
      this.filter_name = this.data.savedFilter;
    }
  }

  onNoClick(onsubmit: any, status : any): void {
    if(this.data){
      let paylaod ={
          "OldFilter": this.data.savedFilter,
          "NewFilter":this.filter_name,
          "wsid": this.userData.wsid,
     
      }
      this.pPickService.update(paylaod, '/Induction/PickBatchFilterRename').subscribe(res => {
        console.log(res);
        if(res.isExecuted){
          this.dialogRef.close({"oldFilter": this.data.savedFilter,"newFilter":this.filter_name,})
        }
      })
    }
    else{
      this.dialogRef.close(this.filter_name);
    }
  }

}
