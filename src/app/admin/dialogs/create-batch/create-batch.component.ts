import { Component, OnInit, Inject } from '@angular/core';
import { CreateBatchConfirmationComponent } from '../create-batch-confirmation/create-batch-confirmation.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss'],
})
export class CreateBatchComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateBatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   
  ) {}

  ngOnInit(): void {}

  /*
  Open modal for confirmation of creating a batch .
  result returns true to send back data to first dialog to create a batch and
  false to just close the dialog.
  */ 
  openBatchConfirmationDialog() {
    let dialogRef;
    dialogRef = this.dialog.open(CreateBatchConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
  
      if(result){ this.dialogRef.close(true)}
      else{
        this.dialog.closeAll();
      };

    });
  }


  
}
