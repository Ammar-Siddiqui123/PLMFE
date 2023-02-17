import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProcessPicksService } from 'src/app/induction-manager/process-picks/process-picks.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-blossom-tote',
  templateUrl: './blossom-tote.component.html',
  styleUrls: ['./blossom-tote.component.scss']
})
export class BlossomToteComponent implements OnInit {

  public userData: any;
  TOTE_SETUP: any = [];
  nxtToteID: any;
  oldToteID: any;

  constructor(private dialog: MatDialog,
              private toastr: ToastrService,
              private pPickService: ProcessPicksService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  updateNxtTote() {
    let updatePayload = {
      "tote": this.nxtToteID,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.update(updatePayload, '/Induction/NextToteUpdate').subscribe(res => {
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
    this.pPickService.get(paylaod, '/Induction/NextTote').subscribe(res => {
      this.nxtToteID = res.data;
      for (let element of this.TOTE_SETUP) {
        if (element.toteID === '') {
          element.toteID = this.nxtToteID;
          this.nxtToteID = this.nxtToteID + 1;
          break;
        }
      }
      this.updateNxtTote();
    });
  }

  submitBlosom() {
    let paylaod = {
      "OldTote": this.nxtToteID,
      "NewTote": this.oldToteID
    }
    this.pPickService.get(paylaod, '/Induction/ProcessBlossom').subscribe(res => {
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

}
