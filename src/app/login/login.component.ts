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
import { AuthService } from '../init/auth.service';
import { GlobalconfigService } from '../global-config/globalconfig.service';
import packJSON from '../../../package.json'

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
  url = '';
  version : string;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public loader: SpinnerService,
    private auth: AuthService,
    private globalService: GlobalconfigService,
  ) { 
    this.url = this.router.url;
  }

  addLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required]),
  });


  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  loginUser() {
    this.loader.show();
    this.addLoginForm.get("username")?.setValue(this.addLoginForm.value.username?.replace(/\s/g, "")||null);
    this.login = this.addLoginForm.value;
    const workStation:any = JSON.parse(localStorage.getItem('workStation') || '');
    this.login.wsid = workStation.workStationID;
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
          // this.addLoginForm.reset(); // replaced to api response 
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('userRights', JSON.stringify(userRights));

          // ----default app redirection ----
          this.getDefaultApp(response.data.wsid);
          // ----end default app redirection ----



          // this.router.navigate(['/dashboard']);
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
    this.version = packJSON.version;
    localStorage.clear();
    if(this.auth.IsloggedIn()){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.loginService.getSecurityEnvironment().subscribe((res:any) => {
        this.env = res.data.securityEnvironment;
        if(this.env){
          const { workStation } = res.data;
          localStorage.setItem('env', JSON.stringify(this.env));
          localStorage.setItem('workStation', JSON.stringify(workStation));
        }
        else{
          this.toastr.error('Kindly contact to administrator', 'Workstation is not set!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
    

  }

  getDefaultApp(wsid){
    let paylaod={
      WSID: wsid
    }
     this.globalService
.get(paylaod, '/GlobalConfig/WorkStationDefaultAppSelect')
.subscribe(
  (res: any) => {
  
    if (res && res.data) {
      this.redirection(res.data) 
      this.addLoginForm.reset();
     }
    else{
      this.addLoginForm.reset();
      this.router.navigate(['/dashboard']);
    }
  },
  (error) => {}
);

  }
  redirection(appName){

    switch (appName) {
      case 'Consolidation Manager':
        this.router.navigate(['/#']);
        break;
      case 'FlowRackReplenish':
        this.router.navigate(['/#']);
        break;
        case 'ICSAdmin':
        this.router.navigate(['/admin']);
        break;
        case 'ImportExport':
        this.router.navigate(['/#']);
        break;
        case 'Induction':
          this.router.navigate(['/InductionManager']);
          break;
        case 'Markout':
          this.router.navigate(['/#']);
            break;
         case 'OrderManager':
          this.router.navigate(['/#']);
            break;
             case 'WorkManager':
          this.router.navigate(['/#']);
            break;
         
      default:
        this.router.navigate(['/dashboard']);
        break;
    }
  }

  changePass() {
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      height: 'auto',
      width: '500px',
      autoFocus: '__non_existing_element__',
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
      'Markout',

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
