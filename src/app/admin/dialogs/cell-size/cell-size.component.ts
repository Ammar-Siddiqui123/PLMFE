import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(
    private cellSizeService: CellSizeService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
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
  dltCellSize(cell:any, i){
    let paylaod = {
      "cell": cell.toString(),
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    console.log(paylaod);
    
    this.cellsize_list.shift(i);
    this.cellSizeService.dltCellSize(paylaod).subscribe((res) => {
      if(res.isExecuted){
        this.getCellSizeList();
      this.toastr.success(labels.alert.delete, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    });
  }

  selectCellSize(selectedCZ: any){
    this.dialogRef.close(selectedCZ);
  }
  clearCellSize(){
    this.dialogRef.close('');
  }

}
