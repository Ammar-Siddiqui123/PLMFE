import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-move-items',
  templateUrl: './move-items.component.html',
  styleUrls: ['./move-items.component.scss']
})
export class MoveItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['toteID', 'complete', 'stagingLocation', 'stagedBy', 'stagedDate'];
  stageTable : any=[];
}
