import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit , Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  zone: string
  locationName: string
  locationType: string
  stagingZone:string
  selected: boolean,
  available: boolean
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-select-zones',
  templateUrl: './select-zones.component.html',
  styleUrls: ['./select-zones.component.scss']
})
export class SelectZonesComponent implements OnInit {
  ELEMENT_DATA = [{ zone: '',locationName:'',locationType:'',stagingZone:'',selected: false,available: false}];
  displayedColumns: string[] = ['select', 'zone', 'locationdesc', 'locationtype', 'stagingzone'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  batchID="";
  username="";
  wsid="";
  zoneDetails :any;



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.zone + 1}`;
  }

  selectStaging(staging="0")
  {
  if(staging=="0")
  {
  //Auto select non staging records

  }
  else 
  {
  //Auto select staging records

  }
  }

  getAvailableZones()
  {
    this.ELEMENT_DATA.length=0;
    var payLoad =
    {
      batchID: this.batchID,
      username: this.username,
      wsid: this.wsid
    };
    this.service.create(payLoad, '/Induction/AvailableZone').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
        this.zoneDetails = res.data.zoneDetails;
        for(var i=0;i<this.zoneDetails.length;i++)
        {
          this.ELEMENT_DATA.push(
            { zone: this.zoneDetails[i].zone,locationName:this.zoneDetails[i].locationName,locationType:this.zoneDetails[i].locationType,stagingZone:this.zoneDetails[i].stagingZone,selected: this.zoneDetails[i].selected,available: this.zoneDetails[i].available}
            );
        }
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => { }
    );

  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service: ProcessPutAwayService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ELEMENT_DATA.length=0;
    this.batchID = this.data.batchId;
    this.username= this.data.userId;
    this.wsid=this.data.wsid;
    this.getAvailableZones();
  }

}
