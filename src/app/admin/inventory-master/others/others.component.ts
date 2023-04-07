import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  @Input() others: FormGroup;
  public userData: any;

  constructor() { }

  ngOnInit(): void {
  }

  changeunitCost(event:any){
    if(event.target.value > 99999999999){
      console.log(event.target.value);
      this.others.patchValue({
        'unitCost' : Math.floor(event.target.value / 10)
      });
    }
  }

}
