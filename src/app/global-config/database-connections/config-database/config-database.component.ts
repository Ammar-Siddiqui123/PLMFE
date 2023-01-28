import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-config-database',
  templateUrl: './config-database.component.html',
  styleUrls: ['./config-database.component.scss'],
})
export class ConfigDatabaseComponent implements OnInit {
  @Input() connectionStringData;

  connectionNameSelect: any = 'Connection not set';
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges');
    if (
      changes['connectionStringData'] &&
      changes['connectionStringData']['currentValue'] &&
      changes['connectionStringData']['currentValue']['connectionString']
    )
      this.connectionStringData =
        changes['connectionStringData']['currentValue']['connectionString'];
  }

  onSelectionChange(event){
    this.connectionNameSelect=event.value
  }
}
