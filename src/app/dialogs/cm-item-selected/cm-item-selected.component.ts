import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog"; 
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
  public tableData_1: any;
  public tableData_2: any;

  public IdentModal:any;
  public ColLabel:any;
  public ColumnModal:any;

  userData: any;


  ELEMENT_DATA: any[] =[
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},

  ];

 displayedColumns: string[] = ['itemNumber', 'warehouse', 'completedQuantity', 'toteID', 'serialNumber', 'userField1','lotNumber','actions'];
 itemSelectTable:any
 dataSourceList:any
 
  constructor(private dialog: MatDialog, private toastr: ToastrService, private consolidationHub: ConsolidationManagerService, private authService: AuthService, 
     @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CmItemSelectedComponent>) { }

  ngOnInit(): void {
        this.userData = this.authService.userData();
        this.IdentModal = this.data.IdentModal;
        this.ColLabel = this.data.ColLabel
        this.ColumnModal = this.data.ColumnModal;
        this.tableData_1 = this.data.tableData_1;
        this.tableData_2 = this.data.tableData_2;

        console.log(this.tableData_1)
        console.log(this.tableData_2)

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

    // console.log(payload)

    this.consolidationHub.get(payload ,'/Consolidation/ItemModelData').subscribe((res=>{
        // console.log(res)
        
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

verifyLine(index) {
    let id = this.itemSelectTable.data[index].id;
    // console.log(this.itemSelectTable.data)
    // console.log(this.itemSelectTable)
    console.log(id)


    let payload = {
        "id": id,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
    }

    console.log(payload)

    this.consolidationHub.get(payload, '/Consolidation/VerifyItemPost').subscribe((res: any) => {
        console.log(res)

        if(res.isExecuted){
            
            this.dialogRef.close({ isExecuted : true});
            
        }
        else{
            this.toastr.error(res.responseMessage, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
        }
  

    })


  
}

verifyAll(){

    console.log(this.itemSelectTable.data)
    this.itemSelectTable.data.forEach((row,i)=>{
       let selectID = row.id;
    })
    // let data = this.itemSelectTable.forEach((row) => {
    //         let id = row.id;
    //         let payload = {
    //             "id": id,
    //             "username": this.userData.userName,
    //             "wsid": this.userData.wsid
    //         }

    //         this.consolidationHub.get(payload, '/Consolidation/VerifyItemPost').subscribe((res: any) => {
    //             console.log(res);
    //             if (!res.isExecuted) {
    //                 this.toastr.error(res.responseMessage, 'Error!', {
    //                     positionClass: 'toast-bottom-right',
    //                     timeOut: 2000
    //                 });

    //             }

    //             else {
    //                 this.tableData_1.forEach((row :any, i) => {
    //                     console.log(row.id, i)

    //                     let tabID = row.id;
    //                     if (tabID == id) {
    //                         this.tableData_2 = this.tableData_1.splice(i, 1);
    //                     }
    //                 });
    //             }
    //         })
    // });
}

}
