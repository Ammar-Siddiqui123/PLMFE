import { Component, EventEmitter, Input,Output, Pipe, PipeTransform} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AssignService } from 'src/app/assign.service';



@Component({
  selector: 'app-unassigned-functions',
  templateUrl: './unassigned-functions.component.html',
  styleUrls: []
})
export class UnassignedFunctionsComponent {
  @Input() unassignedFunctions: [];
  @Input() isGroupLookUp: boolean;
  @Output() addFunction = new EventEmitter();
  spliceArray: any;
  filterValue: string;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: string[];
  employee_fetched_zones: string[] = [];
  filterName:any

  constructor(private AssignService: AssignService,private dialog: MatDialog) { }
  public searchText: string;

  clearFields(){
    this.filterName='';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.unassignedFunctions.filter((option: string) => option.toLowerCase().includes(filterValue))
  }
  assignFunction(permData: any) { 
    let   data = {
      target: 'assigned',
      function: permData
    }
      this.addFunction.emit(data);
  }
  ngOnDestroy() {
    this.filterName = '';
  }


}

@Pipe({name: 'filterUnassignedFunc'})
export class filterUnassignedFunc implements PipeTransform {
  transform(listOfNames: any, nameToFilter: any) {
    if(!listOfNames) return null;
    if(!nameToFilter) return listOfNames;
    return listOfNames.filter(n => n.toLowerCase().indexOf(nameToFilter.toLowerCase()) >= 0);
  }
}