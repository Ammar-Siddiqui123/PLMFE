import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrNumpadComponent } from '../dialogs/fr-numpad/fr-numpad.component';

@Component({
  selector: 'app-flowrack-replenishment',
  templateUrl: './flowrack-replenishment.component.html',
  styleUrls: ['./flowrack-replenishment.component.scss']
})
export class FlowrackReplenishmentComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCal() {
    const dialogRef = this.dialog.open(FrNumpadComponent, {
      width: '480px',
      minWidth:'480px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
