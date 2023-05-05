import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from '../../consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-preferences-consolidation',
  templateUrl: './preferences-consolidation.component.html',
  styleUrls: ['./preferences-consolidation.component.scss'],
})
export class PreferencesConsolidationComponent implements OnInit {
  filtersForm: FormGroup;
  @Input() pref: any;
  userData: any;
  @Output() consolidationEvnt= new EventEmitter<void>();

  constructor(
    private cmService: ConsolidationManagerService,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.userData = this.authService.userData();
    this.filtersForm = new FormGroup({
      defPackList: new FormControl(''),
      blindVerify: new FormControl(''),
      verifyEach: new FormControl(''),
      packingList: new FormControl(''),
      printUnVerified: new FormControl(''),
      printVerified: new FormControl(''),
      defLookType: new FormControl(''),
      backOrders: new FormControl(''),
      nonPickpro: new FormControl(''),
      emailPackSlip: new FormControl(''),
      validateStaingLocs: new FormControl(''),
    });
  }

  ngOnInit(): void {
    
  }
  setPreferences(item) { 
           this.filtersForm.controls['defPackList'].setValue(item.defaultPackingList);
          this.filtersForm.controls['blindVerify'].setValue(item.blindVerifyItems);
          this.filtersForm.controls['verifyEach'].setValue(item.verifyItems);
          this.filtersForm.controls['packingList'].setValue(item.packingListSort);
          this.filtersForm.controls['printUnVerified'].setValue(item.printUnVerified);
          this.filtersForm.controls['printVerified'].setValue(item.printVerified);
          this.filtersForm.controls['defLookType'].setValue(item.defaultLookupType);
          this.filtersForm.controls['backOrders'].setValue(item.autoCompBOShipComplete);
          this.filtersForm.controls['nonPickpro'].setValue(item.stageNonPickProOrders);
          this.filtersForm.controls['emailPackSlip'].setValue(item.emailPickingSlip);
          this.filtersForm.controls['validateStaingLocs'].setValue(item.validateStagingLocations);
         
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['pref']);
    if (changes['pref']['currentValue']) {
      this.setPreferences(changes['pref']['currentValue'])
    }
    // if (changes['orderListData']) {
    //   this.tableData['_data']['_value'] =
    //     changes['orderListData']['currentValue'];
    // }
    // if (changes['extraField']) {
    //   this.extraField = changes['extraField']['currentValue'];
    // }
  }
  changePreferences() {
    this.updatePreferencesValues();
  }

  saveEmailSlip() {
    let payload = {
      emailPickSlip: this.filtersForm.controls['emailPackSlip'].value
        ? this.filtersForm.controls['emailPackSlip'].value
        : false,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    // Get the email slip data from the server
this.cmService
  .get(payload, `/Consolidation/SystemPreferenceEmailSlip`)
  .subscribe(
    // When the request has completed
    (response: any) => {
      // If the request was successful
      if (response.isExecuted) {
        // Show a success message
        this.toastr.success(response.responseMessage, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });

        // Refresh the data on the page
        this.ngOnInit();
      } else {
        // Show an error message
        this.toastr.error(
          'Error',
          'An Error Occured while trying to remove all data, check the event log for more information',
          {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          }
        );
      }
    },
        (error) => {}
      );
  }
  updatePreferencesValues() {
    let payload = {
      autoCompleteShip: this.filtersForm.controls['backOrders'].value,
      defPackList: this.filtersForm.controls['defPackList'].value,
      deffLookType: this.filtersForm.controls['defLookType'].value,
      verifyItems: this.filtersForm.controls['verifyEach'].value,
      blindVerify: this.filtersForm.controls['blindVerify'].value,
      printVerified: this.filtersForm.controls['printVerified'].value,
      printUnVerified: this.filtersForm.controls['printUnVerified'].value,
      packingListSort: this.filtersForm.controls['packingList'].value,
      nonPickpro: this.filtersForm.controls['nonPickpro'].value.toString(),
      validateStaingLocs: this.filtersForm.controls['validateStaingLocs'].value.toString(),
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.cmService
      .get(payload, `/Consolidation/ConsolidationPreferenceUpdate`)
      .subscribe(
        (response: any) => {
          if (response.isExecuted) {
            this.consolidationEvnt.emit();
            // this.filtersForm.controls['defPackList'].setValue(
            //   response.data.defPackList
            // );
            // this.filtersForm.controls['blindVerify'].setValue(
            //   response.data.blindVerify
            // );
            // this.filtersForm.controls['verifyEach'].setValue(
            //   response.data.verifyItems
            // );
            // this.filtersForm.controls['packingList'].setValue(
            //   response.data.packingListSort
            // );
            // this.filtersForm.controls['printUnVerified'].setValue(
            //   response.data.printUnVerified
            // );
            // this.filtersForm.controls['printVerified'].setValue(
            //   response.data.printVerified
            // );
            // this.filtersForm.controls['defLookType'].setValue(
            //   response.data.deffLookType
            // );
            // this.filtersForm.controls['backOrders'].setValue(
            //   response.data.autoCompleteShip
            // );
            // this.filtersForm.controls['nonPickpro'].setValue(
            //   response.data.nonPickpro
            // );
            // this.filtersForm.controls['validateStaingLocs'].setValue(
            //   response.data.validateStaingLocs
            // );

            // this.toastr.success(response.responseMessage, 'Success!', {
            //   positionClass: 'toast-bottom-right',
            //   timeOut: 2000,
            // });

            // this.ngOnInit();
          } else {
            this.toastr.error(
              'Error',
              'An Error Occured while trying to remove all data, check the event log for more information',
              {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              }
            );
          }
        },
        (error) => {}
      );
  }
}
