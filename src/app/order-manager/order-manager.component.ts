import { Component, OnInit } from '@angular/core';
import { OmCreateOrdersComponent } from '../dialogs/om-create-orders/om-create-orders.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss']
})
export class OrderManagerComponent implements OnInit {
 

  constructor() { }



  ngOnInit(): void {
  }

}
