import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-la-location-assignment-quantities',
  templateUrl: './la-location-assignment-quantities.component.html',
  styleUrls: ['./la-location-assignment-quantities.component.scss']
})
export class LaLocationAssignmentQuantitiesComponent implements OnInit {

 

  constructor(private dialog: MatDialog, ) { }

  ngOnInit(): void {
  }

}
