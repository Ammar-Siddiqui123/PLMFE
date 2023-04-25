import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from '../consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { CmOrderToteConflictComponent } from 'src/app/dialogs/cm-order-tote-conflict/cm-order-tote-conflict.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
};

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
];

@Component({
  selector: 'app-cm-staging-location',
  templateUrl: './cm-staging-location.component.html',
  styleUrls: ['./cm-staging-location.component.scss']
})
export class CmStagingLocationComponent implements OnInit {
  userData: any = {};
  displayedColumns: string[] = ['select', 'position', 'action'];
  tableData = ELEMENT_DATA;
  stagetables: any[] = [];
  IsLoading: any = false;
  OrderNumberTote: any = null;
  constructor(private toast: ToastrService,
    private http: ConsolidationManagerService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
    this.userData = this.authService.userData();
  }

  ngOnInit(): void {
  }

  async StagingLocsOrderNum($event: any) {
    debugger
    if ($event.key == "Enter") {
      this.IsLoading = true;
      var obj: any = {
        type: "",
        value: $event.target.value,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
      var inputVal = $event.target.value;
      this.http.get(obj, '/Consolidation/ConsoleDataSB').subscribe((res: any) => {
        if (typeof res?.data == 'string') {
          switch (res?.data) {
            case "DNE":
              this.toast.error("The Order/Tote that you entered is invalid or no longer exists in the system.", 'Consolidation!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
              this.OrderNumberTote = null;
              break;
            case "DNENP":
              $('#StagingLocsOrderNum').val('')
              var promptResponse = prompt("Order/Tote was not found in the system, enter an order number to correspond to the Tote value scanned")
              if (promptResponse != null) {
                $('#StagingLocsOrderNum').val(promptResponse)
                this.stagetables.push({ toteID: inputVal });
              }
              break;
            case "Conflict":
              //MessageModal("Staging Locations","You have a conflicting Tote ID and Order Number")
              // ShowOrderToteConflictModal(inputVal, function getStagingInfo(Type, OrderToteConflictVal) {
              //     consolidationHub.server.getConsolidationData(Type, OrderToteConflictVal).done(function (data) {
              //         console.log(data);
              //         if (typeof data == 'string') {
              //             switch (data) {
              //                 case "DNE":
              //                     MessageModal("Consolidation", "The Order/Tote that you entered is invalid or no longer exists in the system.", function () {
              //                         $('#StagingLocsOrderNum').val('').focus();
              //                     })
              //                     break;
              //                 case "Conflict":
              //                     ShowOrderToteConflictModal(value, getTableData)
              //                     //MessageModal("Consolidation", "The Value you Entered matched a Tote and Order Number, select one to Continue")
              //                     break;
              //                 case "Error":
              //                     MessageModal("Consolidation Error", "An Error occured while retrieving data")
              //                     break;
              //             }
              //         }
              //         else {
              //             $('#StagingLocsOrderNum').val(data.OrderNumber)
              //             for (var x = 0; x < data.toteTable.length; x++) {
              //                 appendStagingRow(data.toteTable[x], data.OrderNumber, OrderToteConflictVal);
              //             }
              //             //If Tote ID was scanned, automatically select that tote, otherwise focus Tote Scan input
              //             if (data.OrderNumber != OrderToteConflictVal) {
              //                 $('#StagingContainer').find('input[value="' + OrderToteConflictVal + '"]').parent().siblings('[name="location"]').children().focus();
              //             } else {
              //                 $('#stagingToteID').focus();
              //             }
              //         }
              //     })
              // })
              break;
            case "Error":
              this.toast.error("An Error occured while retrieving data", "Consolidation Error", { positionClass: 'toast-bottom-right', timeOut: 2000 });
              break;
          }
        }
        else {
          $('#StagingLocsOrderNum').val(res.data.OrderNumber)
          this.stagetables = res.data.consoleDataSB.stageTable;
        }
        this.IsLoading = false;
      });
    }
  }
  async saveToteStagingLocation($event:any,toteID: any, location: any,index:any=null) {
    if ($event.key == "Enter" || $event == 'click') {

    var obj: any = {
      "orderNumber": this.OrderNumberTote,
      "toteID": toteID,
      "location": location,
      "clear": 0,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.http.get(obj, '/Consolidation/StagingLocationsUpdate').subscribe((res: any) => {
      if (res.responseMessage == "Fail") {
        this.toast.error("Error Has Occured", "Consolidation", { positionClass: 'toast-bottom-right', timeOut: 2000 });
      } else if (res.responseMessage == 'INVALID') {
        this.toast.error("The Location entered was not valid", "Staging", { positionClass: 'toast-bottom-right', timeOut: 2000 });

      } else if (res.responseMessage == "Redirect") {
        window.location.href = "/Logon/";
      } else {
        if (typeof this.stagetables != 'undefined') {
          for (var x = 0; x < this.stagetables.length; x++) {
            var tote = this.stagetables[x].toteID;
            if (tote == toteID) {
              this.stagetables[x].location = location; //location
              this.stagetables[x].by = res.data; //by
              this.stagetables[x].date = res.data; //date
              break;
            }
          }
        }
      }
      if(res.isExecuted && index!=null){
        debugger 
        this.stagetables[index].stagingLocation = location;
        this.stagetables[index].location = location; 

      }
    })
  } 
  }
  async UnstageAll(){
    for (var x = 0; x < this.stagetables.length; x++) {
      this.saveToteStagingLocation('click',this.stagetables[x].toteID,'',x);
    } 
  }
  async clearAll(){
    this.stagetables = [];
    this.OrderNumberTote = null;
  }
  
  openCmOrderToteConflict() {
 
    let dialogRef = this.dialog.open(CmOrderToteConflictComponent, {
      height: 'auto',
      width: '620px',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }
}

