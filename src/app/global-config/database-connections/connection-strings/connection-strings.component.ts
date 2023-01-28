import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IConnectionString } from 'src/app/interface/transaction';
const newConnString = {} as IConnectionString;

@Component({
  selector: 'app-connection-strings',
  templateUrl: './connection-strings.component.html',
  styleUrls: ['./connection-strings.component.scss']
})
export class ConnectionStringsComponent implements OnInit {
  @Input() connectionStringData:IConnectionString[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges');
    if (
      changes['connectionStringData'] &&
      changes['connectionStringData']['currentValue'] &&
      changes['connectionStringData']['currentValue']['connectionString']
    )
      this.connectionStringData =
        changes['connectionStringData']['currentValue']['connectionString'];
        console.log('asdsadsad',this.connectionStringData )
  }
  addConnString(){
  this.connectionStringData.push(newConnString)
   
   
  }
}
