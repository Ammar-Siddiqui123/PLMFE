import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'src/app/init/auth.service';
import {
  ITransactionModelIndex,
  OpenTransactionResponse,
} from 'src/app/interface/transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-open-transaction',
  templateUrl: './open-transaction.component.html',
  styleUrls: ['./open-transaction.component.scss'],
})
export class OpenTransactionComponent implements OnInit {
  transactions;
  userData: any;
  transactionIndex: ITransactionModelIndex;
  selectedIndex: number = 0;

  // displayOrderCols : string[] = ["orderNumber", "countOfOrderNumber", "minOfPriority", "detail", "action"];
  displayOrderCols: any = []; //'position', 'name', 'weight', 'symbol'
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    // this.getTransactionModelIndex();
  }
  nexScreen(event) {
    this.previousStep();

  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }
  returnFromComp(event) {
    this.nextStep();
  }

  nextStep() {
    if (this.selectedIndex != 2) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
  }

}
