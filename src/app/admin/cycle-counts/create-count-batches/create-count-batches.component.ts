import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-count-batches',
  templateUrl: './create-count-batches.component.html',
  styleUrls: ['./create-count-batches.component.scss'],
})
export class CreateCountBatchesComponent implements OnInit {
  countQueValue: any = 0;
  constructor() {}

  ngOnInit(): void {}
  getCount(value) {
    this.countQueValue = value;
  }
}
