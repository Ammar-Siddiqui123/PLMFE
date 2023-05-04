import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmAddRecordComponent } from 'src/app/dialogs/om-add-record/om-add-record.component';
import { OmCreateOrdersComponent } from 'src/app/dialogs/om-create-orders/om-create-orders.component';
import { OmUpdateRecordComponent } from 'src/app/dialogs/om-update-record/om-update-record.component';

@Component({
  selector: 'app-om-order-manager',
  templateUrl: './om-order-manager.component.html',
  styleUrls: ['./om-order-manager.component.scss']
})
export class OmOrderManagerComponent implements OnInit {
  toteTable:any[]=['10','10','10','10','10','10'];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = [
  'transType',
  'orderNo',
  'priority',
  'requiredDate',
  'uf1',
  'uf2',
  'uf3',
  'actions']; 

  openOmUpdateRecord() {
    let dialogRef = this.dialog.open(OmUpdateRecordComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }


   openOmCreateOrders() { 
    let dialogRef = this.dialog.open(OmCreateOrdersComponent, { 
      height: 'auto',
      width: '1424px',
      autoFocus: '__non_existing_element__', 
    })
    }

}
