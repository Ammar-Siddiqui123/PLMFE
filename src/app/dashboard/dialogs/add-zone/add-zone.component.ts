import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { EmployeeService } from 'src/app/employee.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {
  form_heading: string = 'Add New Zone';
  form_btn_label: string = 'Add';
  zone = new FormControl('');;
  all_zones:string[] = this.data.allZones;
  filteredOptions: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.filteredOptions = this.zone.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.all_zones.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSend(form: NgForm){
    let addZoneData = {
        "username": '1234',
        "zone": this.zone.value
    }
    this.employeeService.updateEmployeeZone(addZoneData).subscribe((res: any) => {
      if (res.isExecuted) {
        this.dialog.closeAll();
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

}
