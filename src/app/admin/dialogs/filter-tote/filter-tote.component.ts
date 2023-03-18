import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-tote',
  templateUrl: './filter-tote.component.html',
  styleUrls: ['./filter-tote.component.scss']
})
export class FilterToteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { }
  dateList:any;
  orderName;
  ngOnInit(): void {
   
    this.dateList=this.data.dates;
      this.orderName=this.data.orderName
  }

  selectDate(date){
    this.dialogRef.close({ selectedDate: date });
  }

}
