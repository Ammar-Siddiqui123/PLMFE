import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  all_zones:any = this.data.allZones;
  filteredOptions: Observable<string[]>;
  addZoneForm: FormGroup;
  isValid = false;
  public editZoneName:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialog: MatDialog, 
    private toastr: ToastrService, 
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>
    ) {}

  ngOnInit(): void {
    this.data?.mode === 'edit-zone' ? this.form_heading = 'Edit Zone' : 'Update Zone';
    this.data?.mode === 'edit-zone' ? this.form_btn_label = 'Update' : 'Add';
    
    this.initialzeEmpForm();
    this.filteredOptions = this.addZoneForm.controls['zoneList'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
   
  }

  ngAfterViewInit(){
    if(this.data.mode === 'edit-zone'){
      console.log(this.data);
      
      this.addZoneForm.controls['zoneList'].setValue(this.data.zone);
    }
  }

  private noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  initialzeEmpForm() {
    this.addZoneForm = this.fb.group({
      zoneList: [this.filteredOptions, [Validators.required, this.noWhitespaceValidator]],
    });
  }
  hasError(fieldName: string, errorName: string) {
    return this.addZoneForm.get(fieldName)?.touched && this.addZoneForm.get(fieldName)?.hasError(errorName);
  }

  blurInput() {
    if (!this.isValid)
    this.addZoneForm.controls['zoneList'].setValue("");
  }

  private _filter(value: string){
    const filterValue = value.toLowerCase();
    let results =  this.all_zones.filter(option => option.toLowerCase().includes(filterValue))
    this.isValid = results.length > 0;
    return results;
  }
  

  onSubmit(form: FormGroup){
    let addZoneData = {
        "username": this.data.userName,
        "zone": form.value.zoneList
    }
    let oldZone;
    if(this.data.mode === 'edit-zone'){
      oldZone = this.data.zone
    }
    this.employeeService.updateEmployeeZone(addZoneData).subscribe((res: any) => {
      if (res.isExecuted) {
        this.dialogRef.close({data: addZoneData, mode: 'addZone', oldZone: oldZone});
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      //  this.reloadCurrentRoute();
      }else{
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
