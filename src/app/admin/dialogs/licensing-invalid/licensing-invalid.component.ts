import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-licensing-invalid',
  templateUrl: './licensing-invalid.component.html',
  styleUrls: ['./licensing-invalid.component.scss']
})
export class LicensingInvalidComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
