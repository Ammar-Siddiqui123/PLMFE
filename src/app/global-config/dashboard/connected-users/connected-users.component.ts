import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalconfigService } from '../../globalconfig.service';

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.scss'],
})
export class ConnectedUsersComponent implements OnInit {
  displayedColumns: string[] = ['user', 'pcname', 'appname'];
  user_connected_datasource: any = [];
  constructor(
    private globalConfService: GlobalconfigService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getConnectedUsers();
  }
  getConnectedUsers() {
    let dummy_data = [
      { user: 'a', pcname: 'test pc', appname: 'Appname test' },
    ];
    this.globalConfService.get(null, '/GlobalConfig/ConnectedUser').subscribe(
      (res: any) => {
        if (res.isExecuted) {
          this.user_connected_datasource = new MatTableDataSource(
            res.data && res.data.length > 0 ? res.data : dummy_data
          );
        } 
      },
      (error) => {}
    );
  }
  handlePageEvent(e: PageEvent) {
   
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.user_connected_datasource.sort = this.sort;
  }
}
