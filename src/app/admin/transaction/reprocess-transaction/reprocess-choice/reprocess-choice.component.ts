import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TransactionService } from '../../../transaction/transaction.service';
import { ToastrService } from 'ngx-toastr';
import labels from '../../../../labels/labels.json';
import { Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-reprocess-choice',
  templateUrl: './reprocess-choice.component.html',
  styleUrls: ['./reprocess-choice.component.scss']
})
export class ReprocessChoiceComponent implements OnInit {
  
  @Input() reprocessCount : any;
  @Input() isEnabled : any;
  @Input() transactionID:any;
  @Input() userData:any;
  @Input() isReprocessedChecked : any;
  @Input() isCompleteChecked : any;
  @Input() isHistoryChecked : any;
  @Output() itemUpdatedEvent = new EventEmitter<boolean>();
  

  constructor(private transactionService: TransactionService,private toastr: ToastrService , private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  postTransaction()
  {
    var payload={
      username: this.userData.userName,
      wsid: this.userData.wsid,
      }
    this.transactionService.get(payload, '/Admin/PostReprocessTransaction').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.isEnabled=true;
          this.clearControls();
          this.toastr.success(res.responseMessage, 'Success!',{
            positionClass: 'toast-bottom-right',
            timeOut:2000
         });
         this.itemUpdatedEvent.emit(true);
        } else {
          this.clearControls();
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          this.itemUpdatedEvent.emit(true);
        }
      },
      (error) => {}
    );
  }

  clearControls()
  {
    this.isEnabled=true;
    this.isReprocessedChecked.flag=false;
    this.isCompleteChecked.flag=false;
    this.isHistoryChecked.flag=false;
  }

  changeOrderStatus(event:MatCheckboxChange,status): void {
    console.log("CHANGE======");
    if(status=='Reprocess')
    {
    this.isCompleteChecked.flag = false;
    }else if(status=='Complete')
    {
    this.isReprocessedChecked.flag = false;
    }
    
      var payload={
        id: this.transactionID,
        reprocess: (this.isReprocessedChecked.flag)?1:0,
        postComplete: (this.isCompleteChecked.flag)?1:0,
        sendHistory: (this.isHistoryChecked.flag)?1:0,
        field: "",
        username: this.userData.userName,
        wsid: this.userData.wsid,
        }
        this.transactionService.get(payload, '/Admin/ReprocessIncludeSet').subscribe(
          (res: any) => {
            if (res.data && res.isExecuted) {
              this.toastr.success(labels.alert.update, 'Success!',{
                positionClass: 'toast-bottom-right',
                timeOut:2000
             });
             this.itemUpdatedEvent.emit(true);
            } else {
              this.toastr.error('Something went wrong', 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
            }
          },
          (error) => {}
        );
    


  }

}
