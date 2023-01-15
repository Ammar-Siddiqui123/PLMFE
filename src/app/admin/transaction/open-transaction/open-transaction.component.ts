import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';
import { OpenTransactionResponse } from 'src/app/interface/transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-open-transaction',
  templateUrl: './open-transaction.component.html',
  styleUrls: ['./open-transaction.component.scss'],
})
export class OpenTransactionComponent implements OnInit {
  transactions;
  userData: any;
  emp;
  constructor(private transactionService: TransactionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.emp = {
      "lastName": "%",
      "userName": this.userData.userName,
      "wsid": this.userData.wsid
    };
    this.transactionService.getOpenTransactions(this.emp).subscribe(
      (response: OpenTransactionResponse) => {
        debugger;
        this.transactions = response;
        // this.employees_details_data = this.employees_res.data.employees
        // console.log(this.employees_details_data)
        // this.employee_data_source = new MatTableDataSource(this.employees_details_data);
      },
      (error) => {
        debugger;
      }
    );
  }
}
