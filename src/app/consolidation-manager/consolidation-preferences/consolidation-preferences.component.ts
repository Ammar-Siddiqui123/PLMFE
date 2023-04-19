import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmCarriersAddDeleteEditComponent } from 'src/app/dialogs/cm-carriers-add-delete-edit/cm-carriers-add-delete-edit.component';

@Component({
  selector: 'app-consolidation-preferences',
  templateUrl: './consolidation-preferences.component.html',
  styleUrls: ['./consolidation-preferences.component.scss']
})
export class ConsolidationPreferencesComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  openCmCarriers() {
    let dialogRef = this.dialog.open(CmCarriersAddDeleteEditComponent, {
      height: 'auto',
      width: '720px',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }

}
