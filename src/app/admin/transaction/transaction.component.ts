import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  public demo1TabIndex = 1;

  constructor() {}

  ngOnInit(): void {}

  public demo1BtnClick() {
    const tabCount = 3;
    this.demo1TabIndex = (this.demo1TabIndex + 1) % tabCount;
  }
}
