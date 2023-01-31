import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RequiredDateStatusComponent } from '../../../app/dialogs/required-date-status/required-date-status.component';
import { AuthService } from '../../../app/init/auth.service';
import { SuperBatchService } from './super-batch.service';

@Component({
  selector: 'app-super-batch',
  templateUrl: './super-batch.component.html',
  styleUrls: ['./super-batch.component.scss']
})
export class SuperBatchComponent implements OnInit {
  displayedColumns: string[] = ['zone', 'totalTransactions', 'weight', 'symbol', 'actions'];
  dataSource:any;
  user_data: any;
  totalTransHeading = 'Single Line Orders';
  defaultSuperBatchSize:any;
  isItemNumber:boolean = true;
  itemNumbers:any;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private sb_service: SuperBatchService

  ) { }

  ngOnInit(): void {
    this.user_data = this.authService.userData();
    let payload = {
      "WSID": this.user_data.wsid
    }
    this.sb_service.get(payload, '/Induction/SuperBatchIndex').subscribe(res => {
      const { preferences } = res.data;
      console.log(res.data);
      this.itemNumbers = res.data.itemNums;
      this.defaultSuperBatchSize = preferences.defaultSuperBatchSize;
      this.getSuperBatchBy('Order');
    })
  }

  openReqDataStatus() {
    const dialogRef = this.dialog.open(RequiredDateStatusComponent, {
      height: 'auto',
      width: '100%',
      autoFocus: '__non_existing_element__'
    })
  }

  getSuperBatchBy(type: any) {
    let payload = {
      "Type": type,
      "ItemNumber": ""
    }
    this.sb_service.get(payload, '/Induction/ItemZoneDataSelect').subscribe(res => {
        console.log(res);
        this.dataSource = res.data;
    });
  }
  onChangeBatch($event: MatRadioChange){
    console.log($event.source.name, $event.value);
    if($event.value === 'Item'){
      this.dataSource = [];
      this.isItemNumber = false;
    }
    else{
      this.getSuperBatchBy($event.value);
    }
  }

}
