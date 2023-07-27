import { Component, OnInit } from '@angular/core';
import { OmCreateOrdersComponent } from '../dialogs/om-create-orders/om-create-orders.component';
import { MatDialog } from '@angular/material/dialog'; 
import { AuthService } from '../init/auth.service';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { ApiFuntions } from '../services/ApiFuntions';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss'],
})
export class OrderManagerComponent implements OnInit {
  userData: any;
  openPicks=0;
  compPicks=0;
  openPuts=0;
  compPuts=0;
  openCounts=0;
  compCounts=0;
  compAdjust=0;
  compLocChange=0;
  reprocCount=0;
  constructor(
    private Api:ApiFuntions,
    private authService: AuthService,
    private router: Router,
  ) {

  //   router.events
  //   .pipe(
  //     filter((evt: any) => evt instanceof RoutesRecognized),
  //     pairwise()
  //   )
  //   .subscribe((events: RoutesRecognized[]) => {
  //     const prevRoute= events[0].urlAfterRedirects.split('/');
  //     const nextRoute = events[1].urlAfterRedirects.split('/');

  // console.log(prevRoute[1],nextRoute[1]);
  
  //     // debugger;
  //     // if (events[0].urlAfterRedirects == '/InductionManager' || events[1].urlAfterRedirects == '/InductionManager') {
  
  //     if(prevRoute[1]== 'OrderManager' || nextRoute[1] == 'OrderManager'){
  //       localStorage.setItem('routeFromOrderStatus','true')
  //     }
  //     else{
  //       localStorage.setItem('routeFromOrderStatus','false')
  //       // this.showReprocess=true;
  //       // this.showReprocessed=true;
  //     }
      
  //   });

        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {

            let spliUrl=event.url.split('/');
            if(spliUrl[1]=='OrderManager'){
              localStorage.setItem('routeFromOrderStatus','true')
              localStorage.setItem('routeFromInduction','false')
            }else{
              localStorage.setItem('routeFromOrderStatus','false')
            }
         }
          });
  }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getInvDetailsList();
  }

  getInvDetailsList() {

    this.Api
      .OrderManagerMenuIndex()
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            let item=res.data;
            this.openPicks=item.openPicks;
            this.compPicks=item.compPick;
            this.openPuts=item.openPuts;
            this.compPuts=item.compPuts;
            this.openCounts=item.openCounts;
            this.compCounts=item.compCounts;
            this.compAdjust=item.compAdjust;
            this.compLocChange=item.compLocChange;
            this.reprocCount=item.reprocCount;
          }
        },
        (error) => {}
      );
  }
}
