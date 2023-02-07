import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SuperBatchService } from '../../../app/induction-manager/super-batch/super-batch.service';

@Component({
  selector: 'app-required-date-status',
  templateUrl: './required-date-status.component.html',
  styleUrls: ['./required-date-status.component.scss']
})
export class RequiredDateStatusComponent implements OnInit {
  displayedColumns = ['reqDate', 'zone', 'countToInduct'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ELEMENT_DATA: any[] = [
    { "reqDate": "No Required Date", "zone": "53", "countToInduct": "1" }, 
    { "reqDate": "08/04/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "09/14/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "09/28/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "09/29/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/05/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/12/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/13/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/14/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/17/2022", "zone": "08", "countToInduct": "2" }, 
    { "reqDate": "10/20/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/20/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/25/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "10/31/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "11/01/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "11/01/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "11/01/2022", "zone": "08", "countToInduct": "4" }, 
    { "reqDate": "11/03/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "11/04/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "11/07/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "11/07/2022", "zone": "08", "countToInduct": "4" }, 
    { "reqDate": "11/08/2022", "zone": "06", "countToInduct": "1" }, 
    { "reqDate": "11/08/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "11/09/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "12/20/2022", "zone": "07", "countToInduct": "7" }, 
    { "reqDate": "12/20/2022", "zone": "08", "countToInduct": "1" }, 
    { "reqDate": "12/20/2022", "zone": "09", "countToInduct": "1" }, 
    { "reqDate": "12/20/2022", "zone": "07", "countToInduct": "2" }, 
    { "reqDate": "12/20/2022", "zone": "08", "countToInduct": "5" }, 
    { "reqDate": "12/20/2022", "zone": "07", "countToInduct": "1" }, 
    { "reqDate": "12/20/2022", "zone": "07", "countToInduct": "2" }, 
    { "reqDate": "12/20/2022", "zone": "08", "countToInduct": "6" }, 
    { "reqDate": "12/20/2022", "zone": "09", "countToInduct": "1" }, 
    { "reqDate": "12/21/2022", "zone": "SC", "countToInduct": "1" }, 
    { "reqDate": "12/21/2022", "zone": "WB", "countToInduct": "1" }, 
    { "reqDate": "12/21/2022", "zone": "07", "countToInduct": "11" }, 
    { "reqDate": "12/21/2022", "zone": "08", "countToInduct": "4" }, 
    { "reqDate": "12/21/2022", "zone": "09", "countToInduct": "1" }, 
    { "reqDate": "12/21/2022", "zone": "09", "countToInduct": "1" }
  ];

  constructor(private sb_service: SuperBatchService) { }

  ngOnInit(): void {
    this.getReqDateDataSelect();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getReqDateDataSelect(){
    this.sb_service.get('', '/Induction/ReqDateDataSelect').subscribe(res => {
      if(res.data.length > 0){
        this.dataSource = new MatTableDataSource(res.data);
      }
      else{
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
      console.log(this.dataSource.data);
    });
  }

}
