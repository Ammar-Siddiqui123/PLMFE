import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { AlertConfirmationComponent } from '../alert-confirmation/alert-confirmation.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-blossom-tote',
  templateUrl: './blossom-tote.component.html',
  styleUrls: ['./blossom-tote.component.scss']
})
export class BlossomToteComponent implements OnInit {
  @ViewChild('tote_focus') tote_focus: ElementRef;
  public userData: any;
  TOTE_SETUP: any = [];
  nxtToteID: any;
  oldToteID: any;

  constructor(private dialog: MatDialog,
    private toastr: ToastrService,
    private Api: ApiFuntions,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }
  ngAfterViewChecked(): void {
    this.tote_focus.nativeElement.focus();
  }
  updateNxtTote() { 
    
    let updatePayload = {
      "tote": this.nxtToteID,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.Api.NextToteUpdate(updatePayload).subscribe(res => {
      if (!res.isExecuted) {
        this.toastr.error('Something is wrong.', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }

    });
  }

  getNextToteId() {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.Api.NextTote().subscribe(res => {
      if(res.data){
        this.nxtToteID = res.data;
        this.nxtToteID = this.nxtToteID + 1
        this.updateNxtTote();
      }
      
    });
  }

  submitBlosom() {
    if(!this.oldToteID || !this.nxtToteID){
      this.toastr.error('Either the Old or New Tote ID was not supplied.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else{
      const dialogRef = this.dialog.open(AlertConfirmationComponent, {
        height: 'auto',
        width: '786px',
        data: {
          message: "Perform the blossom? This will move all open transaction lines from the old tote to the new tote.",
          heading: 'Perform Blossom'
        },
        autoFocus: '__non_existing_element__'
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          let paylaod = {
            "OldTote": this.oldToteID?.toString(),
            "NewTote": this.nxtToteID?.toString()
          }
          this.Api.ProcessBlossom(paylaod).subscribe(res => {
            // console.log(res.data);
            if (res.data) {
              this.toastr.success('Updated Successfully', 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              this.dialog.closeAll();
            } else {
              this.toastr.error('Old tote ID does not exist', 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
            }
          });
        }
      });
    }

   
  }

}
