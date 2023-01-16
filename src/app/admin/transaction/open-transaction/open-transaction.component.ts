import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';
import { ITransactionModelIndex, OpenTransactionResponse } from 'src/app/interface/transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-open-transaction',
  templateUrl: './open-transaction.component.html',
  styleUrls: ['./open-transaction.component.scss'],
})
export class OpenTransactionComponent implements OnInit {
  transactions;
  userData: any;
  transactionIndex:ITransactionModelIndex;
  // displayOrderCols : string[] = ["orderNumber", "countOfOrderNumber", "minOfPriority", "detail", "action"];
  displayOrderCols: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  constructor(private transactionService: TransactionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getTransactionModelIndex()
    
  }

  getTransactionModelIndex(){
    let paylaod = {
      "viewToShow": 2,
      "location": "",
      "itemNumber": "",
      "holds":false,
      "orderStatusOrder": "",
      "app": "Admin",
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.transactionService.get(paylaod, '/Admin/TransactionModelIndex').subscribe((res: any) => {
      // this.displayOrderCols=res.data.openTransactionColumns;
    },
    (error) => {
      debugger;
    });
  }
}
