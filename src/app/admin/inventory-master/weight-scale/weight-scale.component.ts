import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weight-scale',
  templateUrl: './weight-scale.component.html',
  styleUrls: ['./weight-scale.component.scss']
})
export class WeightScaleComponent implements OnInit {

  @Input() weighScale:  FormGroup;
  public userData: any;

  constructor() { }

  ngOnInit(): void {
  }
}
