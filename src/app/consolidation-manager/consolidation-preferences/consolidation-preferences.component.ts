import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CmCarriersAddDeleteEditComponent } from 'src/app/dialogs/cm-carriers-add-delete-edit/cm-carriers-add-delete-edit.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

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
    private Api: ApiFuntions,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.userData = this.authService.userData();

   
  }
  openCmCarriers() {
    let dialogRef = this.dialog.open(CmCarriersAddDeleteEditComponent, {
      height: 'auto',
      width: '720px',
      autoFocus: '__non_existing_element__',
      disableClose:true,
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
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

    this.Api
      .ConsoleDataSB(payload)
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
