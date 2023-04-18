import { Component, OnInit } from '@angular/core';
import { ConsolidationManagerService } from '../consolidation-manager.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CmShippingCarrierComponent } from 'src/app/dialogs/cm-shipping-carrier/cm-shipping-carrier.component';

@Component({
  selector: 'app-consolidation-preferences',
  templateUrl: './consolidation-preferences.component.html',
  styleUrls: ['./consolidation-preferences.component.scss'],
})
export class ConsolidationPreferencesComponent implements OnInit {
  userData: any;
  filtersForm: FormGroup;
  shippingForm: FormGroup;
  selectionShipping: boolean = false;
  selectionPacking: boolean = false;
  selectionConfirmPacking: boolean = false;
  private subscription: Subscription = new Subscription();
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

    this.shippingForm = new FormGroup({
      allowShip: new FormControl(''),
      freight: new FormControl(''),
      freight1: new FormControl(''),
      freight2: new FormControl(''),
      weight: new FormControl(''),
      length: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      cube: new FormControl(''),

      allowPack: new FormControl(''),
      confirmPack: new FormControl(''),
      printCont: new FormControl(''),
      printOrd: new FormControl(''),
      printContLabel: new FormControl(''),
      contID: new FormControl(''),
      confirmQTY: new FormControl(''),
      contIDText: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // this.subscription.add(
    //   this.shippingForm.valueChanges
    //     .pipe(startWith(this.shippingForm.getRawValue()))
    //     .subscribe((value) => {
    //       console.log(value);
    //       this.saveShippingPreferences();
    //       // whatever you want to do here
    //     })
    // );
    this.getPreferences();
  }

  ngAfterViewInit() {
    // this.updatePreferencesValues();
  }
  changePreferences() {
    this.updatePreferencesValues();
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
      nonPickpro: this.filtersForm.controls['nonPickpro'].value,
      validateStaingLocs: this.filtersForm.controls['validateStaingLocs'].value,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.cmService
      .get(payload, `/Consolidation/ConsolidationPreferenceUpdate`)
      .subscribe(
        (response: any) => {
          if (response.isExecuted) {
            this.filtersForm.controls['defPackList'].setValue(
              response.data.defPackList
            );
            this.filtersForm.controls['blindVerify'].setValue(
              response.data.blindVerify
            );
            this.filtersForm.controls['verifyEach'].setValue(
              response.data.verifyItems
            );
            this.filtersForm.controls['packingList'].setValue(
              response.data.packingListSort
            );
            this.filtersForm.controls['printUnVerified'].setValue(
              response.data.printUnVerified
            );
            this.filtersForm.controls['printVerified'].setValue(
              response.data.printVerified
            );
            this.filtersForm.controls['defLookType'].setValue(
              response.data.deffLookType
            );
            this.filtersForm.controls['backOrders'].setValue(
              response.data.autoCompleteShip
            );
            this.filtersForm.controls['nonPickpro'].setValue(
              response.data.nonPickpro
            );
            this.filtersForm.controls['validateStaingLocs'].setValue(
              response.data.validateStaingLocs
            );

            this.toastr.success(response.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });

            this.ngOnInit();
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

  saveEmailSlip() {
    let payload = {
      emailPickSlip: this.filtersForm.controls['emailPackSlip'].value
        ? this.filtersForm.controls['emailPackSlip'].value
        : false,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.cmService
      .get(payload, `/Consolidation/SystemPreferenceEmailSlip`)
      .subscribe(
        (response: any) => {
          if (response.isExecuted) {
            this.toastr.success(response.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });

            this.ngOnInit();
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

  changeShipping() {}
  toggleAllowPackage() {
    this.selectionPacking = !this.selectionPacking;
  }
  toggleAllowShip() {
    this.selectionShipping = !this.selectionShipping;
  }
  toggleConfirmPackage() {
    this.selectionConfirmPacking = !this.selectionConfirmPacking;
  }

  openCarrier() {
    const dialogRef = this.dialog.open(CmShippingCarrierComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-create-count',
        actionMessage: ``,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  saveShippingPreferences() {
    let payload = {
      packing: this.shippingForm.controls['allowPack'].value,
      confirmPack: this.shippingForm.controls['confirmPack'].value,
      printContPL: this.shippingForm.controls['printCont'].value,
      printOrderPL: this.shippingForm.controls['printOrd'].value,
      printContLabel: this.shippingForm.controls['printContLabel'].value,
      entContainerID: this.shippingForm.controls['contID'].value,
      containerIDDEF: this.shippingForm.controls['contIDDEF'].value,
      confPackQuant: this.shippingForm.controls['confirmQTY'].value,
      freight: this.shippingForm.controls['freight'].value,
      freight1: this.shippingForm.controls['freight1'].value,
      freight2: this.shippingForm.controls['freight2'].value,
      weight: this.shippingForm.controls['weight'].value,
      length: this.shippingForm.controls['length'].value,
      width: this.shippingForm.controls['width'].value,
      height: this.shippingForm.controls['height'].value,
      cube: this.shippingForm.controls['cube'].value,
      shipping: this.shippingForm.controls['allowShip'].value,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.cmService
      .get(payload, `/Consolidation/ConsolidationPreferenceShipUpdate`)
      .subscribe((response: any) => {
        if (response.isExecuted) {
          this.toastr.success(response.responseMessage, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });

          this.ngOnInit();
        } else {
          this.toastr.error('Error', 'An Error Occured while trying to save', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      });
  }
  getPreferences() {
    let payload = {
      type: '',
      value: '',
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.cmService
      .get(payload, `/Consolidation/ConsoleDataSB`)
      .subscribe((res) => {
        if (res.isExecuted) {
          let item = res.data.cmPreferences;
          this.filtersForm.controls['defPackList'].setValue(item.defaultPackingList);
          this.filtersForm.controls['blindVerify'].setValue(item.blindVerifyItems);
          this.filtersForm.controls['verifyEach'].setValue(item.verifyItems);
          this.filtersForm.controls['packingList'].setValue(item.packingListSort);
          this.filtersForm.controls['printUnVerified'].setValue(item.printUnVerified);
          this.filtersForm.controls['printVerified'].setValue(item.printVerified);
          this.filtersForm.controls['defLookType'].setValue(item.deffLookType);
        }
        
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
