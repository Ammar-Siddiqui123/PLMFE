import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-description',
  templateUrl: './update-description.component.html',
  styleUrls: ['./update-description.component.scss']
})
export class UpdateDescriptionComponent implements OnInit {

  // updateItemNumber : boolean = true;
  addItem : boolean = true;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
