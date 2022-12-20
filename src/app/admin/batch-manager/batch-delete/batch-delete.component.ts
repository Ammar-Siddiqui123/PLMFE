import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { BatchManagerService } from '../batch-manager.service';
import { AuthService } from '../../../../app/init/auth.service';


@Component({
  selector: 'app-batch-delete',
  templateUrl: './batch-delete.component.html',
  styleUrls: ['./batch-delete.component.scss']
})
export class BatchDeleteComponent implements OnInit {

  transList : any = [
    {
      id : "Pick",
      name : "Pick"
    },
    {
      id : "Put Away",
      name : "Put Away"
    },
    {
      id : "Count",
      name : "Count"
    }    
  ];
  batchList : any = [];
  transType : string = 'Pick';
  batchID : string = "";
  public userData : any;
  @ViewChild('deleteAction') dltActionTemplate: TemplateRef<any>;

  @Output() transTypeEmitter = new EventEmitter<any>();
  
  constructor(private dialog: MatDialog,
              private batchService : BatchManagerService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getBatch(this.transType);
  }

  getBatch(type : any) {
    try {
      let paylaod = {
        "transType": type,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.batchService.get(paylaod, '/Admin/SelectBatchesDeleteDrop').subscribe((res: any) => {
        this.batchList = [];
        if (res.isExecuted && res.data.length > 0) {          
          this.batchList.push("All Transaction")
          res.data.forEach((i : any) => {
            i ? this.batchList.push(i) : "";
          });    
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  changeTranType(value : any) {
    this.getBatch(value);
    this.transTypeEmitter.emit(value);
  }

  deleteBatch(type : any, id : any) {
    // alert(`Type : ${type} and Batch ID : ${id}`);
    const dialogRef = this.dialog.open(this.dltActionTemplate, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == "Yes") {
        // this.batchService.delete();
      }
    });
  }
  onDltOptions(){
    
  }

}
