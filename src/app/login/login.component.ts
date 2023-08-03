import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ILogin, ILoginInfo } from './Ilogin'; 
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import labels from '../labels/labels.json'
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SpinnerService } from '../init/spinner.service';
import { AuthService } from '../init/auth.service'; 
import packJSON from '../../../package.json'
import { SharedService } from '../services/shared.service';
import { ApiFuntions } from '../services/ApiFuntions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: ILogin;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  returnUrl: string;
  public env;
  public toggle_password = true;
  url = '';
  isReadOnly: boolean = true;
  version : string;
  applicationData: any = [];
  isAppAccess=false;
  info:any=  {};
  constructor(
    public api: ApiFuntions,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public loader: SpinnerService,
    private auth: AuthService, 
    private sharedService: SharedService,
  ) { 
    this.url = this.router.url;
  }

  removeReadOnly(){  
    this.isReadOnly = !this.isReadOnly;
  }

  addLoginForm:any = {};

enterUserName(){
  this.passwordInput.nativeElement.focus();
}
  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  loginUser() {
    this.loader.show();
    this.addLoginForm.username = this.addLoginForm.username?.replace(/\s/g, "")||null;
    this.addLoginForm.password = this.addLoginForm.password?.replace(/\s/g, "")||null;
    this.login = this.addLoginForm;
    // const workStation:any = JSON?.parse(localStorage?.getItem('workStation') || '');
    this.login.wsid = "TESTWSID";
    this.api
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
          this.getAppLicense(response.data.wsid);
          if(localStorage.getItem('LastRoute')){
            this.router.navigateByUrl(localStorage.getItem('LastRoute') || "");
          }
          
          // ----default app redirection ----
          // this.getDefaultApp(response.data.wsid);
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
  CompanyInfo(){
    var obj:any = { 
    }
    this.api
    .CompanyInfo()
    .subscribe((response: any) => {
      this.info = response.data;
    });
  }
  ngAfterContentInit(): void {
    // setTimeout(() => {
    //   this.addLoginForm.get("username")?.setValue('');
    //   this.addLoginForm.get("password")?.setValue('');
    // }, 2000);
    
  }


  ngOnInit() {

    this.version = packJSON.version;
    let lastRoute: any = localStorage.getItem('LastRoute') ? localStorage.getItem('LastRoute') : "";
    localStorage.clear();
    if(lastRoute != ""){
      localStorage.setItem('LastRoute', lastRoute);
    }
    if(this.auth.IsloggedIn()){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.api.getSecurityEnvironment().subscribe((res:any) => {
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
   this.CompanyInfo();
    

  }


    
  // moved getAppLicense,convertToObj ,sortAppsData,appNameDictionary & setMenuData from Menu Component to handle access to the Apps on login
  getAppLicense(wsid) {
    let userData=JSON.parse(localStorage.getItem('user') || '{}');
    let payload = {
      workstationid: userData.wsid,
    };
    this.api.AppNameByWorkstation(payload)
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.convertToObj(res.data);
            localStorage.setItem('availableApps',JSON.stringify(this.applicationData))
            this.sharedService.setMenuData(this.applicationData)
            this.getDefaultApp(wsid);
          }
        },
        (error) => {}
      );
  }
  convertToObj(data) {
    data.wsAllAppPermission.forEach((item,i) => {
      for (const key of Object.keys(data.appLicenses)) {
        // arrayOfObjects.push({ key, value: this.licAppData[key] });
        if (item.includes(key)  && data.appLicenses[key].isLicenseValid) {
          this.applicationData.push({
            appname: data.appLicenses[key].info.name,
            displayname: data.appLicenses[key].info.displayName,
            license: data.appLicenses[key].info.licenseString,
            numlicense: data.appLicenses[key].numLicenses,
            info: this.appNameDictionary(item),
            // status: data[key].isLicenseValid ? 'Valid' : 'Invalid',
            appurl: data.appLicenses[key].info.url,
            isButtonDisable: true,
          });
        }
      }
    });
    this.sortAppsData();
    
  }
  sortAppsData() {
    this.applicationData.sort(function (a, b) {
      var nameA = a.info?.name?.toLowerCase(),
        nameB = b.info?.name?.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
  }
  appNameDictionary(appName) {
    let routes = [
      {
        appName: 'ICSAdmin',
        route: '/admin',
        iconName: 'manage_accounts',
        name: 'Admin',
        updateMenu: 'admin',
        permission: 'Admin Menu',
      },
      {
        appName: 'FlowRackReplenish',
        route: '/FlowrackReplenishment',
        iconName: 'schema',
        name: 'FlowRack Replenishment',
        updateMenu: '',
        permission: 'FlowRack Replenish',
      },
      {
        appName: 'Consolidation Manager',
        route: '/ConsolidationManager',
        iconName: 'insert_chart',
        name: 'Consolidation Manager',
        updateMenu: '',
        permission: 'Consolidation Manager',
      },
      {
        appName: 'Induction',
        route: '/InductionManager',
        iconName: 'checklist',
        name: 'Induction Manager',
        updateMenu: 'induction',
        permission: 'Induction Manager',
      },
      {
        appName: 'ImportExport',
        route: '/ImportExport',
        iconName: 'electric_bolt',
        name: 'Import Export',
        updateMenu: '',
        permission: 'Import Export',
      },
      {
        appName: 'Markout',
        route: '#',
        iconName: 'manage_accounts',
        name: 'Markout',
        updateMenu: '',
        permission: 'Markout',
      },
      {
        appName: 'OrderManager',
        route: '/OrderManager',
        iconName: 'pending_actions',
        name: 'Order Manager',
        updateMenu: '',
        permission: 'Order Manager',
      },
      {
        appName: 'WorkManager',
        route: '#',
        iconName: 'fact_check',
        name: 'Work Manager',
        updateMenu: '',
        permission: 'Work Manager',
      },
    ];

    let obj: any = routes.find((o) => o.appName === appName);
    return obj;
  }

  getDefaultApp(wsid){
    let paylaod={
      workstationid: wsid
    }
     this.api.workstationdefaultapp(paylaod).subscribe(
  (res: any) => {
  
    if (res && res.data) {
     this.checkAppAcess(res.data)

     }
    else{
      localStorage.setItem('isAppVerified',JSON.stringify({appName:'',isVerified:true}))
      // this.addLoginForm.reset();
      if(localStorage.getItem('LastRoute')){
        localStorage.removeItem('LastRoute');
      }
      else{
        this.router.navigate(['/dashboard']);
      }	
    }
  },
  (error) => {}
);

  }

  // checkAppAcess(appName){
  //   this.applicationData.find(el=>{
  //     if(el.appname===appName || this.isAppAccess){
  //       this.isAppAccess=true
  //     }else{
  //       this.isAppAccess=false;
  //     }

   
  //   })
       
  //   if(this.isAppAccess){
  //     localStorage.setItem('isAppVerified',JSON.stringify({appName:appName,isVerified:true}))
  //     this.redirection(appName)
  //     // this.addLoginForm.reset();
      
      
  //   }else{
  //   //  this.sharedService.updateAppVerification({appName:appName,isVerified:false})
  //   localStorage.setItem('isAppVerified',JSON.stringify({appName:appName,isVerified:false}))
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

  checkAppAcess(appName){
    this.applicationData.find(el=>{
      if(el.appname===appName || this.isAppAccess){
        this.isAppAccess=true
      }else{
        this.isAppAccess=false;
      }

   
    })
       
    if(this.isAppAccess){
      localStorage.setItem('isAppVerified',JSON.stringify({appName:appName,isVerified:true}))
      let lastRoute = localStorage.getItem('LastRoute')
      console.log(lastRoute)
      lastRoute?this.router.navigate([lastRoute]):this.redirection(appName)
        
      // this.addLoginForm.reset();
      
      
    }else{
    //  this.sharedService.updateAppVerification({appName:appName,isVerified:false})
    localStorage.setItem('isAppVerified',JSON.stringify({appName:appName,isVerified:false}))
      this.router.navigate(['/dashboard']);
    }
  }
  redirection(appName){

    switch (appName) {
      case 'Consolidation Manager':
        this.router.navigate(['/#']);
        break;
      case 'FlowRackReplenish':
        this.router.navigate(['/FlowrackReplenishment']);
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
      ;

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
    localStorage.setItem('customPerm', JSON.stringify(customPerm));
    return [...userRights, ...customPerm];
  }

}
