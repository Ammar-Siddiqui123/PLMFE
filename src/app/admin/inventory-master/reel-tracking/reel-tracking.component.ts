import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reel-tracking',
  templateUrl: './reel-tracking.component.html',
  styleUrls: ['./reel-tracking.component.scss']
})
export class ReelTrackingComponent implements OnInit {

  @Input() reelTracking: FormGroup;
  public userData: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
