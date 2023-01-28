import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpinnerService } from '../../../app/init/spinner.service';
import { LoginService } from '../../../app/login.service';
import { Router,NavigationEnd  } from '@angular/router';
import { AuthService } from '../../../app/init/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  // public user_data  = JSON.parse(localStorage.getItem('user') || '');
  constructor(
    private router: Router,
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private toastr: ToastrService
    ) {

    router.events.subscribe((val: any) => {
      this.breadcrumbList = [];
      this.breadcrumbList.push({
        name:'PickPro',
        value:'/dashboard'
      })
      if(val instanceof NavigationEnd){
        let res = val.url.substring(1);
        let splittedArray = res.split('/');
        splittedArray.forEach(element => {
        this.breadcrumbList.push({
          name: this.capitalizeFirstLetter(element),
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
    // console.log(this.user_data.userName);
    this.loading = false;
    this.userData = this.authService.userData();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){   
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
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
    // this.deleteAllCookies();

  }

  // deleteAllCookies() {
  //   document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  // }

}
