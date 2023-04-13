import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.scss']
})
export class ConsolidationComponent implements OnInit {
  ELEMENT_DATA: any[] =[
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},

  ];

 displayedColumns: string[] = ['tote_id', 'status', 'location', 'staged_by', 'staged_date'];
 tableData = this.ELEMENT_DATA
 dataSourceList:any

 ELEMENT_DATA_1: any[] =[
  {item_no: '30022', line_no: 'Work 2141',  completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
  {item_no: '30022', line_no: 'Work 2141',  completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
  {item_no: '30022', line_no: 'Work 2141',  completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
 
];
	
displayedColumns_1: string[] = ['item_no', 'line_no', 'completed_qty', 'tote_id', 'status', 'serial_no', 'user_field1', 'actions'];
tableData_1 = this.ELEMENT_DATA_1
dataSourceList_1:any

ELEMENT_DATA_2: any[] =[
  {item_no: '30022', supplier_item_id: 'Work 2141', line_no: 'Work 2141',  completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
  {item_no: '30022', supplier_item_id: 'Work 2141', line_no: 'Work 2141',  completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
  {item_no: '30022', supplier_item_id: 'Work 2141', line_no: 'Work 2141',  completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
   
];
	
displayedColumns_2: string[] = ['item_no', 'supplier_item_id', 'line_no', 'completed_qty', 'tote_id', 'serial_no', 'user_field1', 'actions'];
tableData_2 = this.ELEMENT_DATA_2
dataSourceList_2:any

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

// popup() {
//   let dialogRef = this.dialog.open(ConsolidationOrdernoComponent, {
//     height: '90vh',
//     width: '96vw',
//     autoFocus: '__non_existing_element__',
   
//   })
//   dialogRef.afterClosed().subscribe(result => {
    
    
//   })
//  }
  
//  popupnew() {
//   let dialogRef = this.dialog.open(ConsolidationShippingTransactionComponent, {
//     height: '90vh',
//     width: '96vw',
//     autoFocus: '__non_existing_element__',
   
//   })
//   dialogRef.afterClosed().subscribe(result => {
    
    
//   })
//  }

hideRow=false;

clickToHide(){
  this.hideRow=!this.hideRow;
}

// getOrderData(e:any){
//  console.log(e.target.id.value)
  
// }


}
