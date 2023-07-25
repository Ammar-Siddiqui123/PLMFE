import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-and-label',
  templateUrl: './list-and-label.component.html',
  styleUrls: ['./list-and-label.component.scss']
})
export class ListAndLabelComponent implements OnInit {
  env:string;
  constructor() {
     
    this.env = location.protocol + '//' + location.host; 
 
   }

  ngOnInit(): void {
  }

}
