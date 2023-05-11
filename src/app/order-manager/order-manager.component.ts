import { Component, OnInit } from '@angular/core';
import { OmCreateOrdersComponent } from '../dialogs/om-create-orders/om-create-orders.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderManagerService } from './order-manager.service';
import { AuthService } from '../init/auth.service';

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
    private omService: OrderManagerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getInvDetailsList();
  }

  getInvDetailsList() {
    let payload = {
      userName: this.userData.userName,
      wsid: this.userData.wsid,
      appName: '',
    };
    this.omService
      .get(payload, '/OrderManager/OrderManagerMenuIndex')
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
