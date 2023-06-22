import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'; 
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmationComponent } from '../../admin/dialogs/delete-confirmation/delete-confirmation.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ToteElement {
  toteID:string,
  cells:string,
  position:number,
  oldToteID:string,
  isInserted:number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'}
];

@Component({
  selector: 'app-totes-add-edit',
  templateUrl: './totes-add-edit.component.html',
  styleUrls: ['./totes-add-edit.component.scss']
})
export class TotesAddEditComponent implements OnInit {
  ELEMENT_DATA_TOTE = [{toteID:"" , cells:"" , position: 1 ,oldToteID:"",isInserted:1}];
  displayedColumns: string[] = [ 'zone', 'locationdesc','actions'];
  alreadySavedTotesList:any;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSourceManagedTotes = new MatTableDataSource<ToteElement>(this.ELEMENT_DATA_TOTE);
  selection = new SelectionModel<PeriodicElement>(true, []);
  position:any;
  isIMPath=false;
  toteID="";
  cellID="";
  userData:any;

  // emptyField:boolean = false


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  addRow()
  {
    this.ELEMENT_DATA_TOTE.push({toteID:"" , cells:"" , position: this.ELEMENT_DATA_TOTE.length-1 ,oldToteID:"",isInserted:0});
    this.dataSourceManagedTotes = new MatTableDataSource<any>(this.ELEMENT_DATA_TOTE);
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  saveTote(toteID:any,cells:any,oldToteID:any,isInserted:any,index:any)
  { 
      var oldTote = "";
      var updateMessage="Update Successful";
      if(isInserted=="1")
      {
        oldTote = oldToteID;
      }
      let searchPayload = {
        username: this.userData.userName,
        wsid: this.userData.wsid,
        oldToteID: oldTote,
        toteID: toteID,
        cells: cells
      }
      this.Api.ToteSetupInsert(searchPayload).subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            this.toastr.success(isInserted=="1"?updateMessage:res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          this.getTotes();
          } else {
           
            this.toastr.error("Cannot set the selected tote because it is already set in the batch.", 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => { }
      );
    
    
  }

  deleteTote(toteID:any)
  {  //jhgjhgfhgfh
    const dialogRef =  this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
        action: 'delete',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result=='Yes')
      {
        let deleteTote = {
          username: this.userData.userName,
          wsid: this.userData.wsid,
          toteID: toteID
        }
        this.Api.ToteSetupDelete(deleteTote).subscribe(
          (res: any) => {
            if (res.data && res.isExecuted) {
              this.toastr.success("Deleted successfuly", 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
      this.getTotes();
            } else {
              this.toastr.error("Already exists", 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
            }
          },
          (error) => { }
        );

      }

    })
  }

  getTotes()
  {
    this.ELEMENT_DATA_TOTE.length=0;
    this.Api.ToteSetup().subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.ELEMENT_DATA_TOTE = res.data;
          for(var i=0;i<this.ELEMENT_DATA_TOTE.length;i++)
          {
          this.ELEMENT_DATA_TOTE[i].isInserted = 1;
          this.ELEMENT_DATA_TOTE[i].oldToteID   = this.ELEMENT_DATA_TOTE[i].toteID
          }
          this.dataSourceManagedTotes = new MatTableDataSource<any>(this.ELEMENT_DATA_TOTE);
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

  onToteChange($event,position,cells="")
  {
  if(cells=="")
  {
    if(this.ELEMENT_DATA_TOTE[(position)].toteID!=$event.target.value)
    {
      this.ELEMENT_DATA_TOTE[(position)].toteID = $event.target.value;
    }

  }
  else 
  {

    if(this.ELEMENT_DATA_TOTE[(position)].cells!=$event.target.value)
    {
    this.ELEMENT_DATA_TOTE[(position)].cells = $event.target.value;
    }

  }
  
  }

  selectTote(toteIDs=null,cells=null)
  {    

    var exists=false;
    for(var i=0; i < this.alreadySavedTotesList?.length; i++)
    {
      if(toteIDs==null)
      {
        if(this.alreadySavedTotesList[i].toteid==this.toteID)
        {
          exists=true;
          break;
        }
      }
      else 
      {                
        if(this.alreadySavedTotesList[i].toteid==toteIDs)
        {
          exists=true;
          break;
        }
      }

    }

    if(exists)
    {
      this.toastr.error("Cannot set the selected tote because it is already set in the batch.", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000,
      });
    }
    else 
    {
      let selectedTote;
      if(toteIDs == null && cells == null)
      {
        if (!this.cellID) {
          this.toastr.error("Cannot set the selected tote because it is cells is empty.", 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          return;
        }
        selectedTote = { toteID : this.toteID, cellID : this.cellID, position : this.position };
        this.dialogRef.close(selectedTote);
      }
      else 
      {
        if (!cells) {
          this.toastr.error("Cannot set the selected tote because it is cells is empty.", 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          return;
        }
        selectedTote = { toteID : toteIDs, cellID : cells, position : this.position }; 
        this.dialogRef.close(selectedTote);
      }
    }

    
  }

  displayedColumns1: string[] = ['select', 'zone', 'locationdesc', 'options'];
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection1 = new SelectionModel<PeriodicElement>(true, []);

  constructor(public dialogRef: MatDialogRef<TotesAddEditComponent>,private route: ActivatedRoute,private location: Location,
    @Inject(MAT_DIALOG_DATA) public data : any,private authService: AuthService,private Api:ApiFuntions,private toastr: ToastrService,private dialog: MatDialog,) {

      let pathArr= this.location.path().split('/')
      this.isIMPath=pathArr[pathArr.length-1]==='ImToteManager'?true:false

    
      
      
     }

   

  ngOnInit(): void {
    this.ELEMENT_DATA_TOTE.length=0;
    this.position = this.data.position;
    this.userData = this.authService.userData();
    this.alreadySavedTotesList = this.data.alreadySavedTotes;
    this.cellID = this.data.defaultCells ? this.data.defaultCells : 0;
    this.getTotes();
  }

}
