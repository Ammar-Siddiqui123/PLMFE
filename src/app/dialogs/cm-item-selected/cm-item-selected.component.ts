import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog"; 
import { ToastrService } from "ngx-toastr";


import { AuthService } from "src/app/init/auth.service";
import { Component, Inject, OnInit } from "@angular/core";
import { ConsolidationManagerService } from "src/app/consolidation-manager/consolidation-manager.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-cm-item-selected',
  templateUrl: './cm-item-selected.component.html',
  styleUrls: ['./cm-item-selected.component.scss']
})
export class CmItemSelectedComponent implements OnInit {
  public startSelectFilter: any;
  public tabledata1: any;
  public tabledata2: any;

  public IdentModal:any;
  public ColLabel:any;
  public ColumnModal:any;

  userData: any;

  filterOption :any= [
      {key: '1', value: 'Item Number'},
      {key: '2', value: 'Supplier Item ID'},
      {key: '10', value: 'Lot Number'},
      {key: '8', value: 'Serial Number'},
      {key: '9', value: 'User Field 1'},
      {key: '0', value: 'Any Code'},
      {key: '6', value: 'Tote ID'},
    ];
  ELEMENT_DATA: any[] =[
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},

  ];

 displayedColumns: string[] = ['itemNumber', 'warehouse', 'completedQuantity', 'toteID', 'serialNumber', 'userField1','lotNumber'];
 itemSelectTable:any
 dataSourceList:any
 
  constructor(private dialog: MatDialog, private toastr: ToastrService, private consolidationHub: ConsolidationManagerService, private authService: AuthService, 
     @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
        this.userData = this.authService.userData();
        this.IdentModal = this.data.IdentModal;
        this.ColLabel = this.filterOption[this.data.ColLabel].value
        this.ColumnModal = this.data.ColumnModal;

        this.getItemSelectedData();
  }

  
  getItemSelectedData(){
    let payload = {
        "orderNumber": this.IdentModal ,
        "column": this.ColLabel,
        "columnValue":  this.ColumnModal,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
    }

    this.consolidationHub.get(payload ,'/Consolidation/ItemModelData').subscribe((res=>{
        
        this.itemSelectTable= new MatTableDataSource(res.data);


       
    }))
}

//  filterOption() {
//     if (this.startSelectFilter == '2') {
//         this.startSelectFilter = 1;
//     }
//     else {
//         this.startSelectFilter = 2;
//     }
// }

clickOnItemSelect() {
    let setItem = this.itemSelectTable.forEach((row) => {
        let id = row.id;

        let payload = {
            "id": id,
            "username": this.userData.userName,
            "wsid": this.userData.wsid
        }
        this.consolidationHub.get(payload, '/Consolidation/VerifyItemPost').subscribe((res: any) => {
            if (!res.isExecuted) {
                this.toastr.error(res.responseMessage, 'Error!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000
                });

            }

            else {
                this.tabledata1.forEach((row, i) => {
                    console.log(row.id, i)

                    let tabID = row.id;
                    if (tabID == id) {
                        this.tabledata2 = this.tabledata1.splice(i, 1);
                    }
                });


            }

        })


    })
}

verifyAll(){
    let data = this.itemSelectTable.forEach((row) => {
            let id = row.id;
            let payload = {
                "id": id,
                "username": this.userData.userName,
                "wsid": this.userData.wsid
            }

            this.consolidationHub.get(payload, '/Consolidation/VerifyItemPost').subscribe((res: any) => {
                console.log(res);
                if (!res.isExecuted) {
                    this.toastr.error(res.responseMessage, 'Error!', {
                        positionClass: 'toast-bottom-right',
                        timeOut: 2000
                    });

                }

                else {
                    this.tabledata1.forEach((row :any, i) => {
                        console.log(row.id, i)

                        let tabID = row.id;
                        if (tabID == id) {
                            this.tabledata2 = this.tabledata1.splice(i, 1);
                        }
                    });
                }
            })
    });
}

}
