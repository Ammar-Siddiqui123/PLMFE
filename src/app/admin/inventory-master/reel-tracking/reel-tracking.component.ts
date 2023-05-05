import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InventoryMasterService } from '../inventory-master.service';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MinReelQtyComponent } from 'src/app/dialogs/min-reel-qty/min-reel-qty.component';


@Component({
  selector: 'app-reel-tracking',
  templateUrl: './reel-tracking.component.html',
  styleUrls: ['./reel-tracking.component.scss']
})
export class ReelTrackingComponent implements OnInit {
  isChecked = false;
  btnDisabled : boolean = false;

  constructor(private dialog: MatDialog,
    private invMasterService: InventoryMasterService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  @ViewChild('addItemAction') addItemTemp: TemplateRef<any>;
  @Input() reelTracking: FormGroup;
  public userData: any;

  ngOnInit(): void {
    this.userData = this.authService.userData();
    console.log(this.userData)
    // console.log(this.reelTracking.controls['minimumRTSReelQuantity'].value)
  }

  onFocusOutEvent(event: any){
    if (event.target.value == null || event.target.value == '')
     this.reelTracking.patchValue({
      'minimumRTSReelQuantity' : 0
    }); 
 }

 onChangeRTSUpdate(event: any){
  this.btnDisabled = true;
  
  let payload = {
    "itemNumber": this.reelTracking.controls['itemNumber'].value,
    "minimumRTS": this.reelTracking.controls['minimumRTSReelQuantity'].value,
    "includeAutoRTS": event.checked,
    "username": this.userData.userName,
    "wsid": this.userData.wsid
 }
  this.invMasterService.update(payload,'/Admin/UpdateReelQuantity').subscribe((res:any)=>{

    // console.log(res)
    if(res.isExecuted){
      // console.log(res)
      // console.log(res.responseMessage)
      if(event.checked){
        this.toastr.success(res.responseMessage, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        
      }
      this.btnDisabled = false;
  }
  else if (res.responseMessage != 'Update Successful'){
    // console.log(res)
    this.toastr.error("Changes not saved!  Please reenter the information.", 'Error!', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    });
  }
  })

  
 }
 updateReelQty(): void {
    const dialogRef = this.dialog.open(MinReelQtyComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        minDollarRTS:0,
        thresholdQty:0
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
        console.log(result.thresholdQty)

        let payload = {
          rtsAmount: result.minDollarRTS,
          rtsQuantity: result.thresholdQty,
          username: this.userData.userName,
          wsid: this.userData.wsid
        }
        this.invMasterService.update(payload,'/Admin/UpdateReelAll').subscribe((res:any)=>{
          console.log(res);

          if(res.isExecuted){

            let payload2 = {
              "itemNumber": this.reelTracking.controls['itemNumber'].value,
              "username": this.userData.userName,
              "wsid": this.userData.wsid
           }

            this.invMasterService.get(payload2,'/Admin/RefreshRTS').subscribe((res:any)=>{
              console.log(res)
              if (res.isExecuted) {
                this.reelTracking.patchValue({
                  'minimumRTSReelQuantity' : res.data[0]
                });
              } else {
                this.toastr.error(res.responseMessage, 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000
                });
              }              
            });            
            
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }

          
        });        
      }
    });
  }
}
