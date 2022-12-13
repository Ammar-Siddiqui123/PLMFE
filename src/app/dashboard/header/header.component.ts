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
  constructor(private router: Router,public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.loading = false;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){   
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
