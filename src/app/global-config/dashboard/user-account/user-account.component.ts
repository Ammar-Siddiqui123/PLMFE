import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalconfigService } from '../../globalconfig.service';
import labels from '../../../labels/labels.json';
import { Router,NavigationEnd  } from '@angular/router';
import { FormControl, FormGroup, Validators, } from '@angular/forms';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private globalConfService: GlobalconfigService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  username: any;
  password: any;
  constUser:any;
  ngOnInit(): void {
    let sharedData = this.sharedService.getData();
    if (sharedData && sharedData.loginInfo) {
      this.username = sharedData.loginInfo[0].user;
      this.password = sharedData.loginInfo[0].password;
    } else {
      this.getMenuData();
    }
  }
  addLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required]),
  });
  getMenuData() {
    let payload = {
      LicenseString:
        'qdljjBp3O3llQvKEW01qlvO4dTIFf6VMuJvYMgXgEc8U8q+dVlMKt0mKG6qtD9DO',
      AppUrl: 'CM1',
      DisplayName: 'Consolidation Manager',
      AppName: 'Consolidation Manager',
    };
    this.globalConfService.get(payload, '/GlobalConfig/Menu').subscribe(
      (res: any) => {
        res && res.data;
        if (res && res.data) {
          this.sharedService.setData(res.data);
          this.username = res.data.loginInfo[0].user;
          this.password = res.data.loginInfo[0].password;
          this.constUser=res.data.loginInfo[0].user;
        }
      },
      (error) => {}
    );
  }
  changeGlobalAcc() {
    let payload = {
      userName: this.constUser,
      password: this.password,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/ChangeGlobalAccount')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
          localStorage.clear();
          this.router.navigate(['/globalconfig']);
        },
        (error) => {
          this.toastr.error(labels.alert.went_worng, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      );
  }
}
