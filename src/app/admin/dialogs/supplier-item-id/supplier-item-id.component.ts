import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  selector: 'app-supplier-item-id',
  templateUrl: './supplier-item-id.component.html',
  styleUrls: ['./supplier-item-id.component.scss'],
})
export class SupplierItemIdComponent implements OnInit {
  supplierID;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private transactionService: TransactionService
  ) {
    this.supplierID=data.supplierID
  }

  ngOnInit(): void {}
}
