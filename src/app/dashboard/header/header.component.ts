import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpinnerService } from '../../../app/init/spinner.service';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  loading:boolean = true;

  breadcrumbList: any = [];

  public user_data  = JSON.parse(localStorage.getItem('user') || '');
  constructor(private router: Router,public spinnerService: SpinnerService) {

    router.events.subscribe((val: any) => {
      this.breadcrumbList = [];
      this.breadcrumbList.push({
        name:'Home',
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
      debugger
      }
      // console.log(val instanceof NavigationEnd) 
  });

   }

   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit(): void {
    // console.log(this.user_data.userName);
    this.loading = false;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){   
    // localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
