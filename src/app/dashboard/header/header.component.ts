import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  loading:boolean = true
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){
    console.log('ok');   
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
