import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit ,AfterViewInit {
  public TabIndex = 1;
  public userData: any;
  public showReprocess
  public showReprocessed;
  public setval;
  constructor(router: Router) {
    // router.events
    //   .pipe(
    //     filter((evt: any) => evt instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((events: RoutesRecognized[]) => {
      
    //     if (events[0].urlAfterRedirects == '/InductionManager/Admin') {
    //       localStorage.setItem('routeFromInduction','true')
    //         // this.showReprocess=false;
    //         // this.showReprocessed=false;
         
    //     }else{
    //       localStorage.setItem('routeFromInduction','false')
    //       // this.showReprocess=true;
    //       // this.showReprocessed=true;
    //     }
    //   });
  }
  ngAfterViewInit() {
  
    
    this.setval =localStorage.getItem('routeFromInduction')
   this.showReprocess=JSON.parse(this.setval)
   this.showReprocessed=JSON.parse(this.setval)
    }
  ngOnInit(): void {}

  public demo1BtnClick() {
    const tabCount = 3;
    this.TabIndex = (this.TabIndex + 1) % tabCount;
  }

  switchToOrder(event) {
    this.TabIndex = 0;
  }
}
