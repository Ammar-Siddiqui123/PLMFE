import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarehouseComponent } from '../warehouse/warehouse.component';

@Component({
  selector: 'app-add-inv-map-location',
  templateUrl: './add-inv-map-location.component.html',
  styleUrls: ['./add-inv-map-location.component.scss']
})
export class AddInvMapLocationComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onSend(location: any) { }

  loadWarehouse() {
    let dialogRef = this.dialog.open(WarehouseComponent, {
      height: '400px',
      width: '600px',
      data: {
        mode: 'addlocation',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
