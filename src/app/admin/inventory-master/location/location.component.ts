import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {


  displayedColumns: string[] = ['location','warehouse','zone','carousal','row','shelf','bin','lotNo','expiration','serialNo','cellSize','shipVia','shipToName',
'qtyAllPick', 'qtyAllPut', 'unitOfMeasure', 'itemQty',  'stockDate', 'velocity'];

  @Input() location: FormGroup;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification(e?) {
    this.notifyParent.emit(e);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

    
  announceSortChange(sortState: any) {

  }

  refreshGrid(){
  this.sendNotification({refreshLocationGrid: true});
  }

  handlePageEvent(e: PageEvent) {
    this.sendNotification({locationPageSize: e.pageSize, startIndex: e.pageSize*e.pageIndex})
   
  }
  
}
