import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/init/auth.service';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-lookup-user-two-setup',
  templateUrl: './lookup-user-two-setup.component.html',
  styleUrls: ['./lookup-user-two-setup.component.scss']
})
export class LookupUserTwoSetupComponent implements OnInit {

  userF2List :any = new MatTableDataSource([]);
  AddBtn

  constructor(private Api:ApiFuntions,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public authService: AuthService,) { }
    
  ngOnInit(): void {
    this.getUserFeild2()
  }
  

  getUserFeild2(){
    let payload = {
      "userField":2
    }
    this.Api.userfieldlookup(payload).subscribe(res=>{
      
      if(res.isExecuted){
        this.userF2List = res.data
        let tempuserF2:any = [];
        res.data.forEach((element:any) => {
          let obj = {
            oldVal:element,
            currentVal:element
          };
          tempuserF2.push(obj)
        });
        this.userF2List = new MatTableDataSource(tempuserF2);
    
      }
    })
  }





  saveUserF2(ele){
    let payload = {
      "oldValue": ele.oldVal,
      "newValue": ele.currentVal,
      "userField": 1
    }
    this.Api.updateuserfieldlookup(payload).pipe(
    
      catchError((error) => {
        return of({ isExecuted: false });

      })

    ).subscribe((res=>{
      if(res.isExecuted){
        this.AddBtn = false
        ele.oldVal = ele.currentVal
      }
      else{
        this.toastr.error(`Field is a duplicate. Save other edited fields and ensure it is not a duplicate before saving.`, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
      }
    }))
  }





  deleteUserF2(ele){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        action: 'delete',
        actionMessage:` ${ele.currentVal} from the Adjustment Reason lookup list. `
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Yes'){

        let payload = {
          "value":  ele.currentVal,
          "userField": 2
        }
        this.Api.deleteUserfieldLookUp(payload).subscribe((res=>{ 
          if(res.isExecuted){
            this.getUserFeild2()
          }
        }))
      }
    })
  }


  addNewUserField2(){
    this.AddBtn = true
    
    let newOBj = {
      oldVal:'',
      currentVal:''
    }
    let temA:any = []
    temA.push(newOBj)
    this.userF2List  =  new MatTableDataSource(this.userF2List.data.concat(temA));
    
  }

}
