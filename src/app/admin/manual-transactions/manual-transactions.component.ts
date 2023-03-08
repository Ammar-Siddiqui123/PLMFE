import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-transactions',
  templateUrl: './manual-transactions.component.html',
  styleUrls: ['./manual-transactions.component.scss']
})
export class ManualTransactionsComponent implements OnInit {

  selectedIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
