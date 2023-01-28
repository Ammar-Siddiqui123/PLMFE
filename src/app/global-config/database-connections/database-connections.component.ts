import { Component, OnInit } from '@angular/core';
import { GlobalconfigService } from '../globalconfig.service';

@Component({
  selector: 'app-database-connections',
  templateUrl: './database-connections.component.html',
  styleUrls: ['./database-connections.component.scss'],
})
export class DatabaseConnectionsComponent implements OnInit {
  constructor(private globalConfService: GlobalconfigService) {}
  dbConnectionData = [];
  ngOnInit(): void {
    this.getMenuData();
  }

  getMenuData() {
    let payload = {
      LicenseString:
        'qdljjBp3O3llQvKEW01qlvO4dTIFf6VMuJvYMgXgEc8U8q+dVlMKt0mKG6qtD9DO',
      AppUrl: 'CM1',
      DisplayName: 'Consolidation Manager',
      AppName: 'Consolidation Manager',
    };
    this.globalConfService.get(payload, '/GlobalConfig/Menu').subscribe(
      (res: any) => {
        this.dbConnectionData = res && res.data;
      },
      (error) => {}
    );
  }
  updateListEventRec(event) {
    if (event) {
      this.ngOnInit();
    }
  }
}
