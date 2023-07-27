import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog"; 
import { ToastrService } from "ngx-toastr";


import { AuthService } from "src/app/init/auth.service";
import { Component, Inject, OnInit, ViewChild } from "@angular/core"; 
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ApiFuntions } from "src/app/services/ApiFuntions";

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

 @ViewChild(MatSort) sort: MatSort;

 @ViewChild('paginator') paginator: MatPaginator;
 
  constructor(private dialog: MatDialog, private toastr: ToastrService, private Api:ApiFuntions, private authService: AuthService, 
     @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CmItemSelectedComponent> ,private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
        this.userData = this.authService.userData();
        this.IdentModal = this.data.IdentModal;
        this.ColLabel = this.data.ColLabel
        this.ColumnModal = this.data.ColumnModal;
        this.tableData_1 = this.data.tableData_1;
        this.tableData_2 = this.data.tableData_2;


        this.getItemSelectedData();

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.itemSelectTable.sort = this.sort;
    
  }

  
  getItemSelectedData(){
    let payload = {
        "orderNumber": this.IdentModal ,
        "column": this.ColLabel,
        "columnValue":  this.ColumnModal,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
    }


    this.Api.ItemModelData(payload).subscribe((res=>{
        
        this.itemSelectTable= new MatTableDataSource(res.data);
        this.itemSelectTable.paginator = this.paginator;


       
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


    let payload = {
        "id": id,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
    }


    this.Api.VerifyItemPost(payload).subscribe((res: any) => {

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
    let IDS = new Set();
    this.itemSelectTable.data.forEach((row:any)=>{
        if (!["Not Completed", "Not Assigned", "Waiting Reprocess"].includes(row.lineStatus)) {
            IDS.add(row.id);
        }
    });
    
    let tabID = this.tableData_1.filter((el) => IDS.has(el.id))
                               .map((row) => row.id.toString());
    
    let payload = {
        "iDs": tabID,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
    };
      this.Api.VerifyAllItemPost(payload).subscribe((res: any) => {
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

}
