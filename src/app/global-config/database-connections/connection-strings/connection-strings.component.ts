import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { IConnectionString } from 'src/app/interface/transaction';
import { GlobalconfigService } from '../../globalconfig.service';
import { Output, EventEmitter } from '@angular/core';
import { GlobalConfigSetSqlComponent } from 'src/app/admin/dialogs/global-config-set-sql/global-config-set-sql.component';

@Component({
  selector: 'app-connection-strings',
  templateUrl: './connection-strings.component.html',
  styleUrls: ['./connection-strings.component.scss'],
})
export class ConnectionStringsComponent implements OnInit {
  @Input() connectionStringData: IConnectionString[] = [];
  @Output() connectionUpdateEvent = new EventEmitter<string>();
  isAddedNewRow = false;
  isDuplicateAllow=false;
  constructor(
    private globalConfService: GlobalconfigService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['connectionStringData'] &&
      changes['connectionStringData']['currentValue'] &&
      changes['connectionStringData']['currentValue']['connectionString']
    )
      this.connectionStringData =
        changes['connectionStringData']['currentValue']['connectionString'];
    console.log('asdsadsda', this.connectionStringData);
  }

  createObjectNewConn() {
    const newConnString = {} as IConnectionString;
    newConnString.connectionName = '';
    newConnString.databaseName = '';
    newConnString.serverName = '';
    newConnString.isButtonDisable = true;
    newConnString.isSqlButtonDisable = true;
    newConnString.isNewConn = true;
    newConnString.isDuplicate = false;

    return newConnString;
  }
  addConnString() {
    this.isAddedNewRow = true;
    this.connectionStringData.push(this.createObjectNewConn());
  }

  onInputValueChange(event, item, index) {
    if (item.isNewConn) {
      if (
        item.connectionName == '' ||
        item.databaseName == '' ||
        item.serverName == ''
      ) {
        this.connectionStringData[index].isButtonDisable = true;
      } else {
        this.connectionStringData[index].isButtonDisable = false;
        // this.connectionStringData[index].isSqlButtonDisable = false;
      }
    } else if(   item.connectionName == '' ||
    item.databaseName == '' ||
    item.serverName == '')  {
      this.connectionStringData[index].isButtonDisable = true;
      // this.connectionStringData[index].isSqlButtonDisable = false;
    }else{
      this.connectionStringData[index].isButtonDisable = false;

    }
  }
  saveString(item,index?) {
  
    // this.connectionStringData.map((el,i)=>{
    //   if(i!=index){
    //     if(el.connectionName===item.connectionName){
    //       this.connectionStringData[index].isDuplicate=true
    //     }
    //   }
    // })


    // this.connectionStringData.filter((el,i)=>{
      
    //   if(i!=index){
    //     if(el.connectionName===item.connectionName){
    //       this.connectionStringData[index].isDuplicate=true
    //       console.log(this.connectionStringData[index].isDuplicate);
    //     }else if(el.connectionName!=item.connectionName){
    //       this.connectionStringData[i].isDuplicate=false;
    //   console.log(this.connectionStringData[i].isDuplicate);
      
    //     }
    //   }

      
    // })
    if (item.isNewConn) {
      this.isAddedNewRow = false;
   
    }

    let payload = {
      OldConnection: item.isNewConn ? 'New' : item.connectionName,
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
        this.connectionStringData[index].isSqlButtonDisable = false;
        this.connectionStringData[index].isButtonDisable = true;

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
  deleteString(item) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-connection-string',
        connectionName: item.connectionName,
        message: `Connection Name .${item.connectionName}`,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (item.isNewConn) {
        this.isAddedNewRow = false;
      }
      if (res.isExecuted) {
        this.connectionUpdateEvent.emit(res.isExecuted);
      }
    });
  }
  openSqlAuth(item) {

    let payload = {
      ConnectionName: item.connectionName,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/ConnectionUserPassword')
      .subscribe(
        (res: any) => {
   
          
          if (res.isExecuted) {
         
            const dialogRef = this.dialog.open(GlobalConfigSetSqlComponent, {
              height: 'auto',
              width: '480px',
              data: {
                mode: 'sql-auth-string',
                userName: res.data?.user,
                password: res.data?.password,
                ConnectionName: item.connectionName,
              },
            });
            dialogRef.afterClosed().subscribe((res) => {
              if (res && res.isExecuted) {
                this.connectionUpdateEvent.emit(res.isExecuted);
              }
            });
          }
       
  }
)}
   
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
