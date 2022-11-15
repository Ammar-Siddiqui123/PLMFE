import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  loading:boolean = true
  constructor() { }

  ngOnInit(): void {
    this.loading = false;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
