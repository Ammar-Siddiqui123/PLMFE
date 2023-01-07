import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { PrintRangeComponent } from '../../dialogs/print-range/print-range.component';

@Component({
  selector: 'app-kit-items',
  templateUrl: './kit-items.component.html',
  styleUrls: ['./kit-items.component.scss']
})
export class KitItemsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }


  @ViewChild('addItemAction') addItemTemp: TemplateRef<any>;

  @ViewChild('addDescriptionAction') addDescriptionTemp: TemplateRef<any>;

  ngOnInit(): void {
  }
  quarantineDialog(): void {

  }

  addItemDialog(): void {
    const dialogRef = this.dialog.open(this.addItemTemp, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  addDescriptionDialog(): void {
    const dialogRef = this.dialog.open(this.addDescriptionTemp, {
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

  printRangeDialog() {
    const dialogRef = this.dialog.open(PrintRangeComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
