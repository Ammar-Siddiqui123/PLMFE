import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invalid-quantity',
  templateUrl: './invalid-quantity.component.html',
  styleUrls: ['./invalid-quantity.component.scss']
})
export class InvalidQuantityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

}
