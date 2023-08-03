import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cr-edit-design-test-data',
  templateUrl: './cr-edit-design-test-data.component.html',
  styleUrls: ['./cr-edit-design-test-data.component.scss']
})
export class CrEditDesignTestDataComponent implements OnInit {

  @ViewChild('desc_focus') desc_focus: ElementRef;

  constructor(  
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.desc_focus.nativeElement.value = this.data;
    this.desc_focus.nativeElement.focus();
  }
  getDesignTestData(){
    this.dialogRef.close(this.desc_focus.nativeElement.value);
    // console.log(this.desc_focus.nativeElement.value)
  }

  
}
