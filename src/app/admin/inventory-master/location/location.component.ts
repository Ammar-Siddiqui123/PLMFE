import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  ngOnChanges(changes: SimpleChanges) {
    if(changes['location']){
      if( changes['location'] && changes['location']['previousValue'] &&  changes['location']['previousValue']['controls'] && changes['location']['previousValue']['controls'].inventoryTable.value?.length ){
        this.location.controls['inventoryTable'].setValue(changes['location']['previousValue']['controls'].inventoryTable.value)

      }else{
        this.location.controls['inventoryTable'].setValue([])
      }
    }
  }
    
  announceSortChange(sortState: any) {
   this.sendNotification({sortingColumn: this.displayedColumns.indexOf(sortState.active) , sortingSeq: sortState.direction})
  }

  refreshGrid(){
  this.sendNotification({refreshLocationGrid: true});
  }

  handlePageEvent(e: PageEvent) {
    this.sendNotification({locationPageSize: e.pageSize, startIndex: e.pageSize*e.pageIndex})
   
  }
  
}
