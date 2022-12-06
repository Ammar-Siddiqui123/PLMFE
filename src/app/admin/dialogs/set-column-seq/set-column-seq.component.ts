import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AuthService } from '../../../../app/init/auth.service';
import { SetColumnSeqService } from './set-column-seq.service';

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-set-column-seq',
  templateUrl: './set-column-seq.component.html',
  styleUrls: ['./set-column-seq.component.scss']

})
export class SetColumnSeqComponent implements OnInit {

  constructor(private seqColumn: SetColumnSeqService) { } 
  dataSource :PeriodicElement[];
  ngOnInit(): void {
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
      ELEMENT_DATA.push({ position: i, name: val})
    })
    this.dataSource = ELEMENT_DATA;
  }
  
  saveColumnSeq($event:any){
      console.log($event);
  }

}
