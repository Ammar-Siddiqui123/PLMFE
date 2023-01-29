import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GlobalconfigService } from '../../globalconfig.service';

@Component({
  selector: 'app-config-database',
  templateUrl: './config-database.component.html',
  styleUrls: ['./config-database.component.scss'],
})
export class ConfigDatabaseComponent implements OnInit {
  @Input() connectionStringData;

  connectionNameSelect: any = 'Connection not set';
  constructor(private globalConfService: GlobalconfigService) {}

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

  onSelectionChange(event) {
    this.getConnectionStringSet(event.value);
    // this.connectionNameSelect=event.value
  }

  getConnectionStringSet(item) {
    let payload = {
      ConnectionName: item,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/LAConnectionStringSet')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.connectionNameSelect=res.data.connectionName
          }
        },
        (error) => {}
      );
  }
}
