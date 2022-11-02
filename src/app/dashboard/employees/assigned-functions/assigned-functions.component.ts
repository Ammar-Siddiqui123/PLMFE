import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-assigned-functions',
  templateUrl: './assigned-functions.component.html',
  styleUrls: ['./assigned-functions.component.scss']
})
export class AssignedFunctionsComponent implements OnInit {


  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
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
