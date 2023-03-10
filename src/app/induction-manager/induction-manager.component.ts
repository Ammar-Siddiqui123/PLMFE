import { Component, OnInit } from '@angular/core';
import { Router,RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { AuthService } from '../init/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-induction-manager',
  templateUrl: './induction-manager.component.html',
  styleUrls: ['./induction-manager.component.scss']
})
export class InductionManagerComponent implements OnInit {
  tab_hover_color:string = '#cf9bff3d';
  constructor(
    private router: Router, 
    private sharedService: SharedService,
    private authService: AuthService,
    ) { 
    router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        
    
        if (events[0].urlAfterRedirects == '/InductionManager/Admin' || events[1].urlAfterRedirects == '/InductionManager/Admin') {
          localStorage.setItem('routeFromInduction','true')
            // this.showReprocess=false;
            // this.showReprocessed=false;
         
        }else{
          localStorage.setItem('routeFromInduction','false')
          // this.showReprocess=true;
          // this.showReprocessed=true;
        }
      });
  }

  ngOnInit(): void {
  }
  updateMenu(menu = '', route = ''){
    // if (menu == 'transaction-admin') {
    //   this.sharedService.updateInductionAdminMenu(menu);
    // }    
    this.sharedService.updateInductionAdminMenu({menu , route});

  }
  isAuthorized(controlName:any) {
    return !this.authService.isAuthorized(controlName);
 }
}
