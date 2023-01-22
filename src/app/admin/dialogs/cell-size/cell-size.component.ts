import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CellSizeService } from '../../../../app/common/services/cell-size.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'

@Component({
  selector: 'app-cell-size',
  templateUrl: './cell-size.component.html',
  styleUrls: ['./cell-size.component.scss']
})
export class CellSizeComponent implements OnInit {
  public cellsize_list: any;
  public userData: any;
  public currentCellValue="";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cellSizeService: CellSizeService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.currentCellValue = this.data.cs
    this.getCellSizeList();
   
  }

  getCellSizeList(){
    this.cellSizeService.getCellSize().subscribe((res) => {
      this.cellsize_list = res.data;
   });
  }
  
  addczRow(row:any){
    this.cellsize_list.unshift({cells: '', cellTypes: ''});
  }
  handleChange($event){
    console.log($event);
    
  }
  saveCellSize(cell:any, cellType:any, i){ 

    if(cell){
    let cond = true;
    this.cellsize_list.forEach(element => {
      if(element.cells.toLowerCase() == cell.toLowerCase() ) {
        cond = false;
       this.toastr.error('Already Exists', 'Error!', {
         positionClass: 'toast-bottom-right',
         timeOut: 2000
       });
       return;
      }   
    });

    if(cond){
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
      if(res.isExecuted){
        this.getCellSizeList();
      this.toastr.success(labels.alert.success, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    });
  }
}
  }
  dltCellSize(cell:any, i){
    if(cell){
    let paylaod = {
      "cell": cell.toString(),
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    console.log(paylaod);
    this.cellSizeService.dltCellSize(paylaod).subscribe((res) => {
      if(res.isExecuted){
        this.getCellSizeList();
      this.toastr.success(labels.alert.delete, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    });
  } else {
    this.cellsize_list.shift()
  }
  }

  selectCellSize(selectedCZ: any){
    this.dialogRef.close(selectedCZ);
  }
  clearCellSize(){
    this.dialogRef.close('');
  }

}
