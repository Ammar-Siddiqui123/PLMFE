import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  employees_action: boolean = false;
  employee_fetched_zones: string[] = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];

  constructor() { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}
