import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wp-pod-setup',
  templateUrl: './wp-pod-setup.component.html',
  styleUrls: ['./wp-pod-setup.component.scss']
})
export class WpPodSetupComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  displayedColumns: string[] = ['transType', 'scanSequence','actions'];
  dataSource:any

  ngOnInit(): void {
  }

}
