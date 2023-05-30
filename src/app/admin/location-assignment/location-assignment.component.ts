import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-assignment',
  templateUrl: './location-assignment.component.html',
  styleUrls: ['./location-assignment.component.scss']
})
export class LocationAssignmentComponent implements OnInit {

  constructor() {
    
   }

  public Tab;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    // this.addItem()
  }

  addItem(newItem: Event) {
    this.Tab = newItem
  }
}
