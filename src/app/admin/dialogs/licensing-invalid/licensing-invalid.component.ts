import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-licensing-invalid',
  templateUrl: './licensing-invalid.component.html',
  styleUrls: ['./licensing-invalid.component.scss']
})
export class LicensingInvalidComponent implements OnInit {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
