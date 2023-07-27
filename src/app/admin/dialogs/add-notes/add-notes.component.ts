import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  @ViewChild('notes_focus') notes_focus: ElementRef;
  notes:string;
  numberOfLines = 8;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { 
    this.notes=data && data.notes;
  }

  ngOnInit(): void {
  }

  submit(){
    this.dialogRef.close(this.notes);
  }
  ngAfterViewInit() {
    this.notes_focus.nativeElement.focus();
  }
}
