import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit , Inject, Output, EventEmitter} from '@angular/core';
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
  displayedColumns: string[] = ['select', 'zone', 'locationdesc', 'locationtype', 'stagingzone' , 'flag'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  batchID="";
  username="";
  wsid="";
  zoneDetails :any;
  alreadyAssignedZones :any;


  selectZone(row:any){

    let obj = this.ELEMENT_DATA.find((o, i) => {
      if (o.zone === row.zone) {
        this.ELEMENT_DATA[i].selected = !this.ELEMENT_DATA[i].selected;
        return true; // stop searching
      }
      else 
      {
        return false;
      }
    });

  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllReadyAssigned()
  {
    if(this.alreadyAssignedZones.length==this.ELEMENT_DATA.length)
    {
      return true;
    }
    else 
    {
      return false;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    for(var i=0;i<this.ELEMENT_DATA.length;i++)
    {
    if(!(this.ELEMENT_DATA[i].selected==false&&this.ELEMENT_DATA[i].available==false))
    {
      this.ELEMENT_DATA[i].selected=!this.ELEMENT_DATA[i].selected;
    }
    
    }
  
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
  //Auto select staging records
  var recordExists=0;
  for(var i=0;i<this.ELEMENT_DATA.length;i++)
  {
  if(this.ELEMENT_DATA[i].stagingZone=='False' && !(this.ELEMENT_DATA[i].selected==false&&this.ELEMENT_DATA[i].available==false))
  {
    this.ELEMENT_DATA[i].selected=true;
    recordExists=1;
  }
  
  }
  if(recordExists==0)
  {
    this.toastr.error('No non staging zones', 'Error!', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
    });
  }
  }
  else 
  {
  //Auto select staging records
  var recordExists=0;
  for(var i=0;i<this.ELEMENT_DATA.length;i++)
  {
  if(this.ELEMENT_DATA[i].stagingZone!='False')
  {
    this.ELEMENT_DATA[i].selected=true;
    recordExists=1;
  }
  
  }

  if(recordExists==0)
  {
    this.toastr.error('No staging zones', 'Error!', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
    });
  }
  
  }
  }

  updateZones()
  {
    let selectedRecords=[{zone:'',locationName:'',locationType:'',stagingZone:'',selected: false,available: false}];
    selectedRecords.shift();
    for(var i=0;i<this.ELEMENT_DATA.length;i++)
    {
    if(this.ELEMENT_DATA[i].selected)
    {
    selectedRecords.push(this.ELEMENT_DATA[i]);
    }
    }
    this.dialogRef.close(selectedRecords);
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
        console.log('TEST');
        console.log(this.alreadyAssignedZones);
        for(var i=0;i<this.zoneDetails.length;i++)
        {
          var isSelected = false;
          
          if(this.alreadyAssignedZones!=null && this.alreadyAssignedZones.length>0)
          {
            let obj = this.alreadyAssignedZones.find((o) => {
              if (o.zone == this.zoneDetails[i].zone) {
                isSelected = true;
                return true; // stop searching
              }
              else 
              {
                return false;
              }
            });
  
          }
          this.ELEMENT_DATA.push(
            { zone: this.zoneDetails[i].zone,locationName:this.zoneDetails[i].locationName,locationType:this.zoneDetails[i].locationType,stagingZone:this.zoneDetails[i].stagingZone,selected:isSelected,available: this.zoneDetails[i].available}
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service: ProcessPutAwayService , private toastr: ToastrService , public dialogRef: MatDialogRef<SelectZonesComponent>) { }

  ngOnInit(): void {
    this.ELEMENT_DATA.length=0;
    this.batchID = this.data.batchId;
    this.username= this.data.userId;
    this.wsid=this.data.wsid;
    this.alreadyAssignedZones = this.data.assignedZones;
    this.getAvailableZones();

    
  }

}
