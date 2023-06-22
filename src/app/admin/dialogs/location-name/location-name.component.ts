import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminPreferencesService } from '../../admin-preferences/admin-preferences.service';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-location-name',
  templateUrl: './location-name.component.html',
  styleUrls: ['./location-name.component.scss']
})
export class LocationNameComponent implements OnInit {
  displayedColumns: string[] = ['check','locationName','actions'];
  userData;
  LocationName;
    locationNames :any = new MatTableDataSource([]);
  save
  constructor(private preferencehub: AdminPreferencesService,
            public authService: AuthService,
            private toastr: ToastrService,
            public dialogRef: MatDialogRef<any>,
            private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getLocation()
  }

  getLocation(){

    let payload = {
      'username': this.userData.userName,
      "wsid": this.userData.wsid
    }

    this.preferencehub.get(payload,'/Admin/LocationNames').subscribe((res=>{
      if(res && res.isExecuted){
        
        let tempLocationNames:any = [];
        res.data.forEach((element:any) => {
          let obj = {
            oldVal:element,
            currentVal:element
          };
          tempLocationNames.push(obj)
        });
        this.locationNames = new MatTableDataSource(tempLocationNames);
        
      }
    }))
  }



 delLocation(ele){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        action: 'delete',
        actionMessage:`location name ${ele.currentVal}`
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Yes'){

        let payload = {
          'username': this.userData.userName,
          "wsid": this.userData.wsid,
          "name": ele.currentVal,
        }
        this.preferencehub.get(payload,'/Admin/DeleteLocationNames').subscribe((res=>{ 
          if(res.isExecuted){
            this.getLocation()
          }
        }))
      }
    })
  }

  selectLocation(ele){
      this.dialogRef.close(ele.currentVal)
  }

  clearLocationName(){
    this.dialogRef.close(null)
  }

  saveLocation(ele){
    let payload = {
      'username': this.userData.userName,
      "wsid": this.userData.wsid,
      "oldName":ele.oldVal,
      "newName":ele.currentVal
    }
    this.preferencehub.get(payload,'/Admin/LocationNamesSave').subscribe((res=>{
      if(res.isExecuted){
        this.toastr.success("Location Name Updated Succesfully", 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
          
        ele.oldVal = ele.currentVal
      }
      else{
        this.toastr.error(`Location Name Not Updated`, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
      }
    }))
  }

  addNewName(){
    
    let newOBj = {
      oldVal:'',
      currentVal:''
    }
    let temL:any = []
    temL.push(newOBj)
    this.locationNames =  new MatTableDataSource(this.locationNames.data.concat(temL));
    
  }

}
