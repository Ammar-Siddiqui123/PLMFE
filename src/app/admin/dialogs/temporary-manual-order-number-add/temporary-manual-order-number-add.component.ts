import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  selector: 'app-temporary-manual-order-number-add',
  templateUrl: './temporary-manual-order-number-add.component.html',
  styleUrls: ['./temporary-manual-order-number-add.component.scss'],
})
export class TemporaryManualOrderNumberAddComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {}
}
