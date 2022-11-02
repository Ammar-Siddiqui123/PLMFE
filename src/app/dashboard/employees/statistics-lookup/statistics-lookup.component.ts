import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

class Person {
  id: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-statistics-lookup',
  templateUrl: './statistics-lookup.component.html',
  styleUrls: ['./statistics-lookup.component.scss']
})
export class StatisticsLookupComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;


  persons: Person[];
  dtOptions: DataTables.Settings = {};
  // persons = [
  //   {
  //     id: '01', firstName: 'John', lastName: 'Wickson'
  //   },
  //   {
  //     id: '02', firstName: 'Johny', lastName: 'Batata'
  //   },
  //   {
  //     id: '03', firstName: 'Andrew', lastName: 'Jackson'
  //   },
  //   {
  //     id: '04', firstName: 'Matt', lastName: 'hardy'
  //   },
  // ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      ordering: false,
      lengthChange: false,
      pagingType: 'full_numbers',
      pageLength: 25,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'https://xtlncifojk.eu07.qoddiapp.com/',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.header()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }

}
