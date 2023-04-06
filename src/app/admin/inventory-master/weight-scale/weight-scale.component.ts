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

  changeavgPieceWeight(event:any){
    if(event.target.value > 99999999999){
      console.log(event.target.value);
      this.weighScale.patchValue({
        'avgPieceWeight' : Math.floor(event.target.value / 10)
      });
    }
  }

  changesampleQuantity(event:any){
    if(event.target.value > 999999999){
      console.log(event.target.value);
      this.weighScale.patchValue({
        'sampleQuantity' : Math.floor(event.target.value / 10)
      });
    }
  }

  changeminimumUseScaleQuantity(event:any){
    if(event.target.value > 999999999){
      console.log(event.target.value);
      this.weighScale.patchValue({
        'minimumUseScaleQuantity' : Math.floor(event.target.value / 10)
      });
    }
  }
}
