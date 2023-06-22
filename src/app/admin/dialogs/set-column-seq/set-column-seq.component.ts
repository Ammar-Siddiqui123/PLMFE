import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../app/init/auth.service';
import { SetColumnSeqService } from './set-column-seq.service';
import labels from '../../../labels/labels.json'
export interface PeriodicElement {
  name: string;
  position: number;
}
@Component({
  selector: 'app-set-column-seq',
  templateUrl: './set-column-seq.component.html',
  styleUrls: ['./set-column-seq.component.scss']

})
export class SetColumnSeqComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  constructor(
    private seqColumn: SetColumnSeqService, 
    private authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    private toastr: ToastrService
    ) { } 
  dataSource :PeriodicElement[];

  ngOnInit(): void {
    this.dataSource = [];
    this.ELEMENT_DATA = [];
    this.seqColumn.getSetColumnSeq().subscribe((res) => {
          this.formatColumn(res.data.columnSequence);
    });
  }

  @ViewChild('table') table: MatTable<PeriodicElement>;
  displayedColumns: string[] = ['position', 'name'];
  

  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  formatColumn(column: any){
    column.map((val, i) => {
      this.ELEMENT_DATA.push({ position: i, name: val})
    })
    this.dataSource = this.ELEMENT_DATA;
  }
  
  saveColumnSeq(){
    let userData = this.authService.userData();
    let sortedColumn = this.dataSource.map(t=>t.name);
    let payload = {
      "columns": sortedColumn,
      "username": userData.userName,
      "wsid": userData.wsid,
      "viewName": "Inventory Map"
    }
    this.seqColumn.saveColumnSeq(payload).subscribe((res:any) => {
      ;
      if(res.isExecuted){
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
      this.dialogRef.close('');
    });
      
  }

}
