import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  fromAdmin
  constructor( private dialog: MatDialog,private router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let spliUrl=event.url.split('/');
        // console.log(spliUrl)

        if(spliUrl[1]=='admin'){
          this.fromAdmin = true
        }
    
     }
      });
  }

  ngOnInit(): void {
  }

  
}
