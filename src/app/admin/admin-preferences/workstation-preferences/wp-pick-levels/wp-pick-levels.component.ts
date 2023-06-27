import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wp-pick-levels',
  templateUrl: './wp-pick-levels.component.html',
  styleUrls: ['./wp-pick-levels.component.scss']
})
export class WpPickLevelsComponent implements OnInit {

  displayedColumns: string[] = ['pickLevel','startShelf','endShelf','actions'];
  dataSource:any = [ {},{},{},{},{},{},]
  constructor() { }

  ngOnInit(): void {
  }

}
