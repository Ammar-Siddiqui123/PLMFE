import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.scss']
})
export class ChooseLocationComponent implements OnInit {

  public userData: any;
  searchByItem: any = new Subject<string>();
  searchAutocompleteItemNum: any = [];
  location : any;
  selectedLocation : any;

  constructor(private toastr: ToastrService,
              private service: ProcessPutAwayService,
              private authService: AuthService,
              public dialogRef                  : MatDialogRef<ChooseLocationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog                    : MatDialog,) { }

  ngOnInit(): void {    
    this.userData = this.authService.userData();
    this.searchByItem
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumnItem();
      });
  }

  selectLoc(val : any) {
    this.location = val.locNum;
    this.selectedLocation = val;
  }

  async autocompleteSearchColumnItem() {
    try {
      let searchPayload = {
        "location": this.location,
        "warehouse": this.data.warehouse,
        "serial": this.data.serialNumber,
        "lot": this.data.lotNumber,
        "cCell": this.data.carouselCellSize,
        "cVel": this.data.carouselVelocity,
        "bCell": this.data.bulkCellSize,
        "bVel": this.data.bulkVelocity,
        "cfCell": this.data.cfCellSize,
        "cfVel": this.data.cfVelocity,
        "item": this.data.itemNumber,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };

      this.service.get(searchPayload, '/Induction/BatchLocationTypeAhead', true).subscribe(
        (res: any) => {
          if (res.data) {
            this.searchAutocompleteItemNum = res.data;
          } else {
            this.toastr.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => {}
      );      
    } catch (error) {
      console.log(error);
    }    
  }

  submit() {
    try {
      var payLoad = {
        "invMapID": this.selectedLocation.invMapID,
        "previousZone": this.data.zones.replace("Zones:",""),
        "dedicated": this.data.dedicated,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
      this.service.create(payLoad, '/Induction/ReserveLocation').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            this.dialogRef.close({responseMessage : res.responseMessage, ...this.selectedLocation});
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => {}
      );      
    } catch (error) {
      console.log(error)
    }
  }

}
