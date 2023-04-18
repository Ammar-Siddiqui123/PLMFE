import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from '../../consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FloatLabelType } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { AlertConfirmationComponent } from 'src/app/dialogs/alert-confirmation/alert-confirmation.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
];

@Component({
  selector: 'app-cm-shipping',
  templateUrl: './cm-shipping.component.html',
  styleUrls: ['./cm-shipping.component.scss']
})
export class CmShippingComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'ex', 'srno', 'replishment', 'case', 'transaction', 'replenish', 'exists', 'action'];
  tableData = ELEMENT_DATA;

  constructor(private dialog: MatDialog,
              private toastr: ToastrService,
              private service: ConsolidationManagerService,
              private authService: AuthService,
              private _liveAnnouncer: LiveAnnouncer) { }
  
  ngOnInit(): void {
  }

}
