import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AssignService } from 'src/app/assign.service';

@Component({
  selector: 'app-unassigned-functions',
  templateUrl: './unassigned-functions.component.html',
  styleUrls: ['./unassigned-functions.component.scss']
})
export class UnassignedFunctionsComponent implements OnInit {
  @Input() unassignedFunctions: [];
  @Output() addPermission = new EventEmitter();
  spliceArray: any;
  filterValue: string;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: string[];
  employee_fetched_zones: string[] = [];

  constructor(private AssignService: AssignService) { }
  public searchText: string;
  ngOnInit(): void {


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.filterValue = filterValue
    const filteredArray = this.unassignedFunctions.filter((option: string) => option.toLowerCase().includes(filterValue))

    this.filteredOptions = filterValue ? filteredArray : this.unassignedFunctions

  }


  removeFunction(value: string) {
    console.log("value: ", value)
    // this.spliceArray = this.unassignedFunctions.filter(v => v !== value)
    this.spliceArray = this.AssignService.removeGroupOption(this.unassignedFunctions, value)
    this.unassignedFunctions = this.spliceArray

    //after splice array
  }


  add(permData: any) {
    console.log(permData);
    this.addPermission.emit({ permisionData: permData });
  }


}
