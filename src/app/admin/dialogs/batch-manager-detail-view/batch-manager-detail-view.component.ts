import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-batch-manager-detail-view',
  templateUrl: './batch-manager-detail-view.component.html',
  styleUrls: ['./batch-manager-detail-view.component.scss']
})
export class BatchManagerDetailViewComponent implements OnInit {

  ELEMENT_DATA: any[] = [
    {item_no: '1005', description: 'tinted glass sticker', location_qty: '1205', uom: 'Each', warehouse: 'Loc 213321', location: 'Main Location'},
    {item_no: '1008965', description: 'tinted glass sticker', location_qty: '1205', uom: 'Each', warehouse: 'Loc 213321', location: 'Main Location'},
    {item_no: '1008965', description: 'tinted glass sticker', location_qty: '120', uom: 'Each', warehouse: 'Loc321', location: 'Main Location'},
    {item_no: '1008965', description: 'tinted glass sticker', location_qty: '1205', uom: 'Each', warehouse: 'Loc 213321', location: 'Main Location'},
    {item_no: '1008965', description: 'tinted glass sticker', location_qty: '1205', uom: 'Each', warehouse: 'Loc 213321', location: 'Main Location'},
    {item_no: '1008965', description: 'tinted glass sticker', location_qty: '1205', uom: 'Each', warehouse: 'Loc 213321', location: 'Main Location'},
    {item_no: '1008965', description: 'tinted glass sticker', location_qty: '1205', uom: 'Each', warehouse: 'Loc 213321', location: 'Main Location'},
    {item_no: '1008965', description: 'tinted glass sticker', location_qty: '1205', uom: 'Each', warehouse: 'Loc 213321', location: 'Main Location'},
  ];
  displayedColumns: string[] = ['item_no', 'description', 'location_qty', 'uom', 'warehouse', 'location'];
  dataSource:any = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    // this.dataSource.sort = this.sort
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
