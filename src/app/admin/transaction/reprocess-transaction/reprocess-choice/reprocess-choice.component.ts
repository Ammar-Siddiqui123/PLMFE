import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TransactionService } from '../../../transaction/transaction.service';
import { ToastrService } from 'ngx-toastr';
import labels from '../../../../labels/labels.json';
import { Output, EventEmitter } from '@angular/core';

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
  @Output() itemUpdatedEvent = new EventEmitter<boolean>();
  @Input() isReprocessedChecked: any;
  @Input() isCompleteChecked: any;
  @Input() isHistoryChecked: any;
  constructor(private transactionService: TransactionService,private toastr: ToastrService) { }

  ngOnInit(): void {
   
  }

  postTransaction()
  {
    //Admin/PostReprocessTransaction
    var payload={
      username: this.userData.userName,
      wsid: this.userData.wsid,
      }
    this.transactionService.get(payload, '/Admin/PostReprocessTransaction').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.toastr.success(res.responseMessage, 'Success!',{
            positionClass: 'toast-bottom-right',
            timeOut:2000
         });
         this.itemUpdatedEvent.emit(true);
        } else {
          console.log(res);
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => {}
    );
  }

  changeOrderStatus(event:MatCheckboxChange,status): void {
    if(status=='Reprocess')
    {
    this.isCompleteChecked= false;
    this.isHistoryChecked= false;
    }else if(status=='Complete')
    {
    this.isReprocessedChecked = false;
    this.isHistoryChecked= false;
    }
    else 
    {
    this.isReprocessedChecked = false;
    this.isCompleteChecked= false;
    }
    
      var payload={
        id: this.transactionID,
        reprocess: (status=='Reprocess' && event.checked)?1:0,
        postComplete: (status=='Complete'&& event.checked)?1:0,
        sendHistory: (status=='History'&& event.checked)?1:0,
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
             console.log(res);
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
