import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  selector: 'app-set-item-location',
  templateUrl: './set-item-location.component.html',
  styleUrls: ['./set-item-location.component.scss'],
})
export class SetItemLocationComponent implements OnInit {
  itemNumber;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  floatLabelControlLocation = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  hideRequiredControlItem = new FormControl(false);
  searchAutocompleteList: any;
  searchAutocompleteListItem: any;
  searchByOrderNumber = new Subject<string>();
  searchByItemNumber = new Subject<string>();
  location: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private transactionService: TransactionService
  ) {
    this.itemNumber = data.itemNumber;
  }
  getFloatLabelValueLocation(): FloatLabelType {
    return this.floatLabelControlLocation.value || 'auto';
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  searchData() {}
  ngOnInit(): void {
    this.searchByOrderNumber
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteGetLocation();
      });

    this.searchByItemNumber
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteGetItem();
      });
  }

  async autocompleteGetLocation() {
    let searchPayload = {
      itemNumber: this.itemNumber,
      username: this.data.userName,
      wsid: this.data.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/GetLocations', true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
        },
        (error) => {}
      );
  }

  async autocompleteGetItem() {
    let searchPayload = {
      itemNumber: this.itemNumber,
      username: this.data.userName,
      wsid: this.data.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/GetItemNumber', true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteListItem = res.data;
        },
        (error) => {}
      );
  }
  ngOnDestroy() {
    this.searchByOrderNumber.unsubscribe();
    this.searchByItemNumber.unsubscribe();
  }
}
