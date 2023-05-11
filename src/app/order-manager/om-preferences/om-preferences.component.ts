import { Component, OnInit } from '@angular/core';
import { OrderManagerService } from '../order-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-om-preferences',
  templateUrl: './om-preferences.component.html',
  styleUrls: ['./om-preferences.component.scss'],
})
export class OmPreferencesComponent implements OnInit {
  userData: any;
  filtersForm: FormGroup;
 
  constructor(
    private omService: OrderManagerService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.userData = this.authService.userData();

    this.filtersForm = new FormGroup({
      maxOrder: new FormControl(0),
      custReportsApp: new FormControl(""),
      custReportsMenuApp: new FormControl(""),
      custReportsMenuText: new FormControl(""),
      allowInProcOrders: new FormControl(false),
      allowIndivdOrders: new FormControl(false),
      defUserFields: new FormControl(false),
      printDirect: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.getPreferences();
    this.filtersForm.valueChanges.pipe(debounceTime(500),
      distinctUntilChanged()
    ).subscribe((newValues) => {
      this.setPreferences();
    }, (oldValues) => {
     return 
    });
  
    // this.filtersForm.valueChanges
    //   .pipe(debounceTime(500))
    //   .subscribe((newValues) => {
   
      
    //       this.setPreferences();
        
   
        
    //   });
  }

  getPreferences() {
    let payload = {
      appName: '',
      userName: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.omService
      .get(payload, `/OrderManager/OrderManagerPreferenceIndex`)
      .subscribe((response: any) => {
        if (response.isExecuted) {
          let pref = response.data.preferences[0];
          this.filtersForm.controls['maxOrder'].setValue(pref.maxOrders?pref.maxOrders:"");
          this.filtersForm.controls['allowInProcOrders'].setValue(
            pref.allowInProc?pref.allowInProc:false
          );
          this.filtersForm.controls['allowIndivdOrders'].setValue(
            pref.allowPartRel?pref.allowPartRel:false
          );
          this.filtersForm.controls['defUserFields'].setValue(
            pref.defUserFields?pref.defUserFields:false
          );
          this.filtersForm.controls['printDirect'].setValue(pref.printDirectly?pref.printDirectly:false);
          this.filtersForm.controls['custReportsApp'].setValue(
            response.data.customReport?response.data.customReport:""
          );
          this.filtersForm.controls['custReportsMenuApp'].setValue(
            response.data.customAdmin?response.data.customAdmin:""
          );
          this.filtersForm.controls['custReportsMenuText'].setValue(
            response.customAdminText?response.data.customAdminText:""
          );
        }else{
        }
       
      });
  }
  setPreferences() {
    let payload = {
      maxOrders: this.filtersForm.controls['maxOrder'].value,
      allowInProc: this.filtersForm.controls['allowInProcOrders'].value,
      allowPartRel: this.filtersForm.controls['allowIndivdOrders'].value,
      defUserFields: this.filtersForm.controls['defUserFields'].value,
      customReport: this.filtersForm.controls['custReportsApp'].value,
      customAdmin: this.filtersForm.controls['custReportsMenuApp']?.value,
      customAdminText: this.filtersForm.controls['custReportsMenuText'].value,
      printDirectly: this.filtersForm.controls['printDirect'].value,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.omService
      .get(payload, `/OrderManager/OrderManagerPreferenceUpdate`)
      .subscribe((response: any) => {
        if (response.isExecuted) {
        } else {
          this.toastr.error(
            'Error',
            'An Error Occured while trying to update',
            {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            }
          );
        }
      });
  }
}
