import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { ItemCategoryComponent } from '../dialogs/item-category/item-category.component';
import { ItemNumberComponent } from '../dialogs/item-number/item-number.component';
import { UnitMeasureComponent } from '../dialogs/unit-measure/unit-measure.component';

@Component({
  selector: 'app-inventory-master',
  templateUrl: './inventory-master.component.html',
  styleUrls: ['./inventory-master.component.scss']
})
export class InventoryMasterComponent implements OnInit {
  @ViewChild('quarantineAction') quarantineTemp: TemplateRef<any>;


  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  public openItemNumDialog() {
    let dialogRef = this.dialog.open(ItemNumberComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  public opencategoryDialog() {
    let dialogRef = this.dialog.open(ItemCategoryComponent, {
      height: 'auto',
      width: '750px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  public openUmDialog() {
    let dialogRef = this.dialog.open(UnitMeasureComponent, {
      height: 'auto',
      width: '750px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  quarantineDialog(): void {
    const dialogRef = this.dialog.open(this.quarantineTemp, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  deleteItem($event) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
