import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-batch-manager-detail-view',
  templateUrl: './batch-manager-detail-view.component.html',
  styleUrls: ['./batch-manager-detail-view.component.scss']
})
export class BatchManagerDetailViewComponent implements OnInit {

  fieldNames:any;
  displayedColumns: string[] = ['item_no', 'description','transaction_qty','lotNo', 'expiration_date', 'uom', 'serial_no', 'notes','location','warehouse','userField1','userField2','toteID'];
  dataSource:any = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private Api:ApiFuntions, private _liveAnnouncer: LiveAnnouncer,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { 


    
  }

  ngOnInit(): void {
    this.OSFieldFilterNames();
    this.dataSource = new MatTableDataSource(this.data);
    // this.dataSource.sort = this.sort
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public OSFieldFilterNames() { 
    this.Api.ColumnAlias().subscribe((res: any) => {
      this.fieldNames = res.data;
   
    })
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
