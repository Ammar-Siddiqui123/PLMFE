import { Component, OnInit,Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalconfigService } from 'src/app/global-config/globalconfig.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-clear-app-globalconfig',
  templateUrl: './clear-app-globalconfig.component.html',
  styleUrls: ['./clear-app-globalconfig.component.scss']
})
export class ClearAppGlobalconfigComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,  private globalconfigService:GlobalconfigService,private authService:AuthService) { }
  isChecked = true;
  userData;
  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  checkOptions(event: MatCheckboxChange): void {
    if(event.checked){
     this.isChecked = false;
    }
    else{
     this.isChecked = true;
    }
   }

   
  onConfirmdelete() {
    if (this.data) {

    }
  }

}
