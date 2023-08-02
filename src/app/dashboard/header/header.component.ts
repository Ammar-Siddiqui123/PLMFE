import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpinnerService } from '../../../app/init/spinner.service'; 
import { Router,NavigationEnd  } from '@angular/router';
import { AuthService } from '../../../app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service'; 
import { Title } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private breakpointSubscription: Subscription
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  loading:boolean = true;
  ConfigUserLogin:boolean = false;
  breadcrumbList: any = [];
  userData: any;
  configUser:any;
isConfigUser
statusTab;
  // public user_data  = JSON.parse(localStorage.getItem('user') || '');
  constructor(
    private router: Router,
    public spinnerService: SpinnerService, 
    private authService: AuthService,
    private api:ApiFuntions,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private titleService: Title,
    private breakpointObserver: BreakpointObserver
    ) {
      let width=0;
      let height =0;
      this.breakpointSubscription = this.breakpointObserver.observe([Breakpoints.Small,Breakpoints.Large])
      .subscribe((state: BreakpointState) => {
        // if (state.matches) {
          // Small viewport dimensions
           width = window.innerWidth;
           height = window.innerHeight;
          
        
        // }
      })
      
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

        splittedArray.forEach((element,i) => {
         if(element==='createCountBatches' || element==='cycleCounts'){
          element='CycleCount'
         }
         if(element==='Flowrack'){
          element='FlowrackReplenishment'
         }
         if(element==='ImToteManager' ){
          element='ToteManager'
         }
         if(element==='ccsif' ||element==='ste'  ){
          element=element.toLocaleUpperCase();
         }

         if(width<=768){
          if(element==='InductionManager'){
        
            element='IM'
           }
           
         }
    
         
         this.titleService.setTitle(`LogixPro  ${element.toLowerCase() !='adminprefrences'? this.capitalizeFirstLetter(element).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2"):'Preferences'}`);
         
        this.breadcrumbList.push({
          name: element.toLowerCase() !='adminprefrences'? this.capitalizeFirstLetter(element).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2"):'Preferences',
          menu: element,
          value:'/'+element
        })
        if(element === 'transaction'){
          this.breadcrumbList.push({
            name:'Open Transaction',
            menu: element,
            value:'/'+element
          })
        }
      });
      
      }  
      // if(this.breadcrumbList[this.breadcrumbList.length-1].name == '/OrderStatus'){
      //   this.breadcrumbList[this.breadcrumbList.length-1].value = this.statusTab
      // } 
     
  });

   }

   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit(): void {
    this.loading = false;
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.configUser = JSON.parse(localStorage.getItem('userConfig') || '{}'); 
    if(this.router.url.indexOf('globalconfig') > -1){
      this.ConfigUserLogin =  true;
    }else this.ConfigUserLogin =  false; 
    this.userData = this.authService.userData();

  }


  ngAfterViewInit() {
      this.sharedService.breadCrumObserver.subscribe((res: any) => { 
      this.statusTab = res.tab.textLabel;
      this.breadcrumbList[this.breadcrumbList.length-1].name = this.statusTab
    } )
 
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
    debugger
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    if(this.authService.isConfigUser()){
      localStorage.clear();
      this.api.configLogout(paylaod).subscribe((res:any) => {
        if (res.isExecuted) 
        {
          window.location.href = "/globalconfig"; 
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
      this.api.Logout(paylaod).subscribe((res:any) => {
        if (res.isExecuted) 
        {
          // this.toastr.success(res.responseMessage, 'Success!', {
          //   positionClass: 'toast-bottom-right',
          //   timeOut: 2000
          // });
          window.location.href = "/#/login";
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
  
  getViewportDimensions(): void {
    this.breakpointObserver.observe([Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // Small viewport dimensions
          const width = window.innerWidth;
          const height = window.innerHeight;

         
          console.log(`Viewport dimensions: ${width} x ${height}`);
        } else {
          // Large viewport dimensions
          // ...
        }
      });
  }
  ngOnDestroy(): void {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
 
}
