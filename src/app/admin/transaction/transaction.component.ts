import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, AfterViewInit {
  public TabIndex = 1;
  public userData: any;
  public showReprocess
  public showReprocessed;
  public setval;
  orderStatus$: Observable<any>;
  tabIndex$: Observable<any>;
  constructor(router: Router, private route: ActivatedRoute, private sharedService: SharedService
  ) {

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


    this.setval = localStorage.getItem('routeFromInduction')
    this.showReprocess = JSON.parse(this.setval)
    this.showReprocessed = JSON.parse(this.setval)


    this.orderStatus$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('orderStatus')),
    );
    this.tabIndex$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('tabIndex')),
    );

    this.tabIndex$.subscribe((param) => {
      console.log(param)
      if (param) {
        this.TabIndex = 0;
        // this.sharedService.updateOrderStatus(param)
      }
    });

    this.orderStatus$.subscribe((param) => {
      console.log(param)
      if (param) {
        this.TabIndex = 0;
        this.sharedService.updateOrderStatus(param)
      }
    });
  }
  ngOnInit(): void {
  }

  public demo1BtnClick() {
    const tabCount = 3;
    this.TabIndex = (this.TabIndex + 1) % tabCount;
  }

  switchToOrder(event) {
    this.TabIndex = 0;
  }
}
