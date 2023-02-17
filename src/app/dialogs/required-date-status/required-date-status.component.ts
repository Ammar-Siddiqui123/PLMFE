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
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },    
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" },
    { countToInduct: "1", reqDate: "12/14/2022", zone: "10" }
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
      if(res.data.length > 0) {
        // console.log(res.data)
        this.dataSource = new MatTableDataSource(res.data);
      }
      else {
       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
      // console.log(this.dataSource.data);
    });
  }

}
