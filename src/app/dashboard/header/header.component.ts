import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../app/init/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  loading:boolean = true
  public user_data  = JSON.parse(localStorage.getItem('user') || '');
  constructor(private router: Router,public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    console.log(this.user_data.userName);
    
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
