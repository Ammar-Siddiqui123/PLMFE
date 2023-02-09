import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../app/init/auth.service';
import { ProcessPicksService } from './process-picks.service';
import { PickToteManagerComponent } from 'src/app/dialogs/pick-tote-manager/pick-tote-manager.component';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];
@Component({
  selector: 'app-process-picks',
  templateUrl: './process-picks.component.html',
  styleUrls: ['./process-picks.component.scss']
})
export class ProcessPicksComponent implements OnInit {

  dialogClose: boolean = false;
  public userData: any;
  batchID: any = '';
  countInfo:any;
  pickBatchesList:any[] = [];;
  pickBatches = new FormControl('');
  // pickBatches:any = '';
  filteredOptions: Observable<any[]>;
  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'other'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild('batchPickID') batchPickID: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private pPickService: ProcessPicksService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.pickToteSetupIndex()
  }

  pickToteSetupIndex(){
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/PickToteSetupIndex').subscribe(res => {
      this.countInfo = res.data.countInfo;
      this.pickBatchesList = res.data.pickBatches;
      console.log(this.pickBatches);
      
      this.filteredOptions = this.pickBatches.valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value)),
        map(name => (name ? this._filter(name) : this.pickBatchesList.slice()))
      );
      
      console.log(res.data);
      console.log(this.countInfo);
    });
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.pickBatchesList.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onAddBatch(val: string) {
    const dialogRef = this.dialog.open(this.batchPickID, {
      width: 'auto',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log(val);
      console.log(this.dialogClose);
      if (this.dialogClose) {
        if(val === 'batchWithID'){
          this.pPickService.get('', '/Induction/NextBatchID').subscribe(res => {
            this.batchID = res.data;
          });
        }
        else{
          if(this.batchID === ''){
            this.toastr.error('Batch id is required.', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        }
      }
    });
  }

  confirmAddBatchDialog() {
    this.dialogClose = true;
    this.dialog.closeAll();
  }
  closeBatchDialog() {
    this.dialogClose = false;
    this.dialog.closeAll();
  }

  openPickToteDialogue(){
    const dialogRef =  this.dialog.open(PickToteManagerComponent, {
      height: '90%',
      width: '100vw',
      autoFocus: '__non_existing_element__'
    })
  }

}
