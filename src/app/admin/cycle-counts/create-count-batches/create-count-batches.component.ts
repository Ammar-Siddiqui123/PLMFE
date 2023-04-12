import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-count-batches',
  templateUrl: './create-count-batches.component.html',
  styleUrls: ['./create-count-batches.component.scss'],
})
export class CreateCountBatchesComponent implements OnInit {
  countQueValue: any = 0;
  constructor() {}
  selectedIndex: number = 0;
  updateQueue: any;

  ngOnInit(): void {}
  getCount(value) {
    this.countQueValue = value;
  }
  public nextStep(e) {
    this.selectedIndex += 1;
      this.updateQueue=e
}

  tabChanged({ index }) {
    this.selectedIndex = index;
  }
}
