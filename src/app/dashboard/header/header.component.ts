import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpinnerService } from '../../../app/init/spinner.service';
import { LoginService } from '../../../app/login.service';
import { Router,NavigationEnd  } from '@angular/router';
import { AuthService } from '../../../app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  loading:boolean = true;

  breadcrumbList: any = [];
  userData: any;
isConfigUser
  // public user_data  = JSON.parse(localStorage.getItem('user') || '');
  constructor(
    private router: Router,
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private toastr: ToastrService,
    private sharedService: SharedService
    ) {
   this.isConfigUser=  this.authService.isConfigUser()
    router.events.subscribe((val: any) => {
      this.breadcrumbList = [];
      if(this.authService.isConfigUser()){
        // this.breadcrumbList.push({
        //   name:'',
        //   value:'/globalconfig/dashboard'
        // })
      }else{
        this.breadcrumbList.push({
          name:'LogixPro',
          menu: '',
          value:'/dashboard'
        })
      }
  
      if(val instanceof NavigationEnd){
        let res = val.url.substring(1);
        let withoutParam = res.split('?')[0]
        let splittedArray = withoutParam.split('/'); 
        splittedArray.forEach(element => {
        this.breadcrumbList.push({
          name: element.toLowerCase() !='adminprefrences'? this.capitalizeFirstLetter(element).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2"):'Prefrences',
          menu: element,
          value:'/'+element
        })
      });
      
      }
      // console.log(this.breadcrumbList) 
  });

   }

   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit(): void {
    this.loading = false;
    this.userData = this.authService.userData();

  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  routeToLogin(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  breadCrumbClick(menu,index:any = null) { 
     if(index != null){ 
      var Url = "";  
      for (let i = 0; i <= index; i++) {
        if(this.breadcrumbList[i].menu!='') Url += this.breadcrumbList[i].value; 
      }   
       this.router.navigate([Url]);
        
       this.sharedService.BroadCastMenuUpdate(Url.toString());
    }  
    if (!menu) {
      // Reverts side bar to it's orignal state 
      this.router.navigate(['/dashboard']);
      this.sharedService.resetSidebar();

      let filter = this.breadcrumbList.filter(e => e.name == "Dashboard");

      if (filter.length == 0) {
        this.breadcrumbList.push({
          name:'Dashboard',
          menu: '',
          value:'/dashboard'
        });
      }
    }    
  }
  // RouterLinkSet(index){
  //   var Url = "";
  //   for (let i = 0; i <= index; i++) {
  //         if(this.breadcrumbList[i].menu!='') Url += this.breadcrumbList[i].value; 
  //       }   
  //       return Url;
  // }

  logout(){   
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    if(this.authService.isConfigUser()){
      localStorage.clear();
      this.authService.configLogout(paylaod).subscribe((res:any) => {
        if (res.isExecuted) 
        {
     
          this.router.navigate(['/globalconfig']);
        }
        else 
        {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      })
      // this.router.navigate(['/globalconfig']);
     
    }else{
      localStorage.clear();
      this.authService.logout(paylaod).subscribe((res:any) => {
        if (res.isExecuted) 
        {
          // this.toastr.success(res.responseMessage, 'Success!', {
          //   positionClass: 'toast-bottom-right',
          //   timeOut: 2000
          // });
     
          this.router.navigate(['/login']);
        }
        else 
        {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      })
    }
  
    // this.deleteAllCookies();

  }

  // deleteAllCookies() {
  //   document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  // }
  

}
