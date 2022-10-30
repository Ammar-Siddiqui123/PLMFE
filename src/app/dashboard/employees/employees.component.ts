import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor() { }


  employees_action: boolean = false;
  employee_zone: string = '';
  employee_zones_list: string[] = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];

  ngOnInit(): void {
  }

}
