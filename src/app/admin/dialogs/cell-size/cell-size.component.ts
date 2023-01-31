import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CellSizeService } from '../../../../app/common/services/cell-size.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-cell-size',
  templateUrl: './cell-size.component.html',
  styleUrls: ['./cell-size.component.scss']
})
export class CellSizeComponent implements OnInit {
  public cellsize_list: any;
  public userData: any;
  public currentCellValue = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cellSizeService: CellSizeService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.currentCellValue = this.data.cs
    this.getCellSizeList();

  }

  getCellSizeList() {
    this.cellSizeService.getCellSize().subscribe((res) => {
      for(var i=0;i<res.data.length;i++){
        res.data[i].isInserted = 1;
      }
      this.cellsize_list = res.data;
    });
  }

  addczRow(row: any) {
    this.cellsize_list.unshift({ cells: '', cellTypes: '' });
  }
  handleChange($event) {
    console.log($event);

  }
  saveCellSize(cell: any, cellType: any, i,isInserted:any) {

    if (cell) {
      let cond = true;
      if(isInserted!=1)
      {
        this.cellsize_list.forEach(element => {
          if (element.cells.toLowerCase() == cell.toLowerCase()) {
            cond = false;
            this.toastr.error('Cell Size already exists. Ensure any pending changes are saved before attempting to save this entry.', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            return;
          }
        });
      }
      

      if (cond) {
        let oldVal = this.cellsize_list[i].cells;
        let paylaod = {
          "oldCell": oldVal.toString(),
          "newCell": cell,
          "cellType": cellType,
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
        this.cellSizeService.saveCellSize(paylaod).subscribe((res) => {
          console.log(res);
          if (res.isExecuted) {
            this.getCellSizeList();
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
          else {
            this.toastr.error('Cell Size already exists. Ensure any pending changes are saved before attempting to save this entry.', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
    }
  }
  dltCellSize(cell: any, i) {
    if (cell) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
      })
      dialogRef.afterClosed().subscribe(result => {
       if(result === 'Yes'){
        let paylaod = {
        "cell": cell.toString(),
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.cellSizeService.dltCellSize(paylaod).subscribe((res) => {
        if (res.isExecuted) {
          this.getCellSizeList();
          this.toastr.success(labels.alert.delete, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
       }
      })
      
    } else {
      this.cellsize_list.shift()
    }
  }

  selectCellSize(selectedCZ: any) {
    const cellExists =  this.cellsize_list.some(obj => obj.cells === selectedCZ)
    if(cellExists){
      this.dialogRef.close(selectedCZ);   
    }
    else{
      this.dialogRef.close();   
    }
    
  }
  clearCellSize() {
    this.dialogRef.close('');
  }

}
