import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmChangesConfirmationComponent } from '../om-changes-confirmation/om-changes-confirmation.component';

@Component({
  selector: 'app-om-update-record',
  templateUrl: './om-update-record.component.html',
  styleUrls: ['./om-update-record.component.scss']
})
export class OmUpdateRecordComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openOmChangesConfirm() {
    let dialogRef = this.dialog.open(OmChangesConfirmationComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }
}
