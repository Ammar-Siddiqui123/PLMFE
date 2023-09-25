import { Component } from '@angular/core';

@Component({
  selector: 'app-list-and-label',
  templateUrl: './list-and-label.component.html',
  styleUrls: ['./list-and-label.component.scss']
})
export class ListAndLabelComponent {
  env:string;
  constructor() {
     
    this.env = location.protocol + '//' + location.host; 
 
   }

}
