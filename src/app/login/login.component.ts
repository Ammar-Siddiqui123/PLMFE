import { Component, OnInit } from '@angular/core';
import { ILogin, ILoginInfo } from './Ilogin';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import labels from '../labels/labels.json'
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SpinnerService } from '../init/spinner.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: ILogin;

  returnUrl: string;
  public env;
  public toggle_password = true;


  constructor(
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public loader: SpinnerService,
  ) { }

  addLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), this.noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
  });


  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  loginUser() {
    this.loader.show();
    this.login = this.addLoginForm.value;
    this.loginService
      .login(this.login)
      .subscribe((response: any) => {
        const exe = response.isExecuted
        if (exe == true) {
          let data = {
            '_token': response.data.token,
            'userName': response.data.userName,
            'accessLevel': response.data.accessLevel,
            'wsid': response.data.wsid,
            'loginTime': response.data.loginTime,
          }
          let userRights = response.data.userRights;
          userRights = this.addCustomPermission(userRights);
          this.addLoginForm.reset();
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('userRights', JSON.stringify(userRights));
          this.router.navigate(['/dashboard']);
        }
        else {
          const errorMessage = response.responseMessage;
          this.toastr.error(errorMessage?.toString(), 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }


      });
  }

  ngOnInit() {
    this.loginService.getSecurityEnvironment().subscribe((res) => {
      this.env = res.data;
      localStorage.setItem('env', JSON.stringify(res.data));
    });

  }

  changePass() {
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      height: 'auto',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });
  }
  private addCustomPermission(userRights: any) {
    let customPerm = [
      'Home',
      'Import Export',
      'Induction Manager',
      'Work Manager',
      'Consolidation Manager',
      'Order Manager',
      'Admin Menu',
      'FlowRack Replenish',

      //Admin Menus
      'Dashboard',
      // 'Inventory Map',
      // 'Batch Manager',
      // 'Reports',
      // 'Location Assignment',
      // 'Cycle Count Manager',
      // 'Move Items',
      // 'Transaction Journal',
      // 'Dashboard',
      // 'Dashboard',
      // 'Dashboard',
    ];
    return [...userRights, ...customPerm];
  }

}
