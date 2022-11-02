import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


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
export class StatisticsLookupComponent implements OnInit {


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
      pagingType: 'full_numbers',
      pageLength: 2,
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

}
