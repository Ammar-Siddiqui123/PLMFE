import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  public TabIndex = 1;
  public userData: any;
  
  constructor() {}

  ngOnInit(): void {
 

  }



  public demo1BtnClick() {
    const tabCount = 3;
    this.TabIndex = (this.TabIndex + 1) % tabCount;
  }

  switchToOrder(event){
    this.TabIndex=0;
  }
}
