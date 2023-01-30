import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RequiredDateStatusComponent } from '../../../app/dialogs/required-date-status/required-date-status.component';
import { AuthService } from '../../../app/init/auth.service';

@Component({
  selector: 'app-super-batch',
  templateUrl: './super-batch.component.html',
  styleUrls: ['./super-batch.component.scss']
})
export class SuperBatchComponent implements OnInit {
   ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = this.ELEMENT_DATA;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    
  }

  openReqDataStatus(){
    const dialogRef =  this.dialog.open(RequiredDateStatusComponent, {
      height: 'auto',
      width: '100%',
      autoFocus: '__non_existing_element__'
    })
  }

}
