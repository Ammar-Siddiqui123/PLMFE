import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GlobalconfigService } from '../../globalconfig.service';

@Component({
  selector: 'app-config-database',
  templateUrl: './config-database.component.html',
  styleUrls: ['./config-database.component.scss'],
})
export class ConfigDatabaseComponent implements OnInit {
  @Input() connectionStringData;
  @Output() configdbUpdateEvent = new EventEmitter<string>();

  connectionNameSelect: any = '';
  constructor(private globalConfService: GlobalconfigService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['connectionStringData'] &&
      changes['connectionStringData']['currentValue'] &&
      changes['connectionStringData']['currentValue']['connectionString']
    )
      this.connectionStringData =
        changes['connectionStringData']['currentValue'];

    if (
      this.connectionStringData &&
      this.connectionStringData.laConnectionString &&
      this.connectionStringData.laConnectionString.length > 0
    ) {
      this.connectionNameSelect =
        this.connectionStringData?.laConnectionString[0]?.connectionName;
    }
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
            this.connectionNameSelect = res.data.connectionName;
            this.configdbUpdateEvent.emit(res.isExecuted);
          }
        },
        (error) => {}
      );
  }
}
