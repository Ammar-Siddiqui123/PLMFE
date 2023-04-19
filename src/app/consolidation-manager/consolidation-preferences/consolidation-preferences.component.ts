import { Component, OnInit } from '@angular/core';
import { ConsolidationManagerService } from '../consolidation-manager.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consolidation-preferences',
  templateUrl: './consolidation-preferences.component.html',
  styleUrls: ['./consolidation-preferences.component.scss'],
})
export class ConsolidationPreferencesComponent implements OnInit {
  userData: any;
  preferencesData:any;
  private subscription: Subscription = new Subscription();
  constructor(
    private cmService: ConsolidationManagerService,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.userData = this.authService.userData();

   
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
          this.preferencesData = res.data.cmPreferences;
   
        }
        
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
