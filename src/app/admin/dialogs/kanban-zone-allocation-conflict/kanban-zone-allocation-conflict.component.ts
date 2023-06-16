import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-kanban-zone-allocation-conflict',
  templateUrl: './kanban-zone-allocation-conflict.component.html',
  styleUrls: ['./kanban-zone-allocation-conflict.component.scss']
})
export class KanbanZoneAllocationConflictComponent implements OnInit {
allocation;
kanban;
both;

  constructor( public dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
  }
  changeValue(val,type){
    // console.log(val,type)
    if(type == 'allocation'){
      this.allocation = true;
      this.kanban = false;
    }
    else if(type == 'kanban'){
      this.allocation = false;
      this.kanban = true;
    }
    else if(type == 'both'){
      this.allocation = false;
      this.kanban = false;
    }

let data = {
  allocation :this.allocation,
  kanban:this.kanban
}

    this.dialogRef.close(data)
  }


}
