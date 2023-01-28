import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { IConnectionString } from 'src/app/interface/transaction';
import { GlobalconfigService } from '../../globalconfig.service';
import { Output, EventEmitter } from '@angular/core';

const newConnString = {} as IConnectionString;
newConnString.connectionName = '';
newConnString.databaseName = '';
newConnString.serverName = '';
@Component({
  selector: 'app-connection-strings',
  templateUrl: './connection-strings.component.html',
  styleUrls: ['./connection-strings.component.scss'],
})
export class ConnectionStringsComponent implements OnInit {
  @Input() connectionStringData: IConnectionString[] = [];
  @Output() connectionUpdateEvent = new EventEmitter<string>();
  constructor(
    private globalConfService: GlobalconfigService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

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
    console.log('asdsadsad', this.connectionStringData);
  }
  addConnString() {
    this.connectionStringData.push(newConnString);
  }
  saveString(item) {
    let payload = {
      OldConnection: item.connectionName,
      ConnectionName: item.connectionName,
      DatabaseName: item.databaseName,
      ServerName: item.serverName,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/ConnectionSave')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.toastr.success(res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => {
          this.toastr.error('something went wrong!', 'Error!!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      );
  }
  deleteString(item){
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-connection-string',
        connectionName: item.connectionName,
        message:`Connection Name .${item.connectionName}`
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isExecuted) {
        this.connectionUpdateEvent.emit(res.isExecuted);
      }
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
