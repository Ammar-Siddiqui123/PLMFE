import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox'; 
import { ToastrService } from 'ngx-toastr';
import labels from '../../../../labels/labels.json';
import { Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../../services/shared.service';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { MatSelect } from '@angular/material/select';

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

  @Input() ROrder : any = '';
  @Input() RItem : any = '';
  @Input() selection4 : any = '';
  @Input() searchString4 : any = '';
  @Input() hold : boolean = false;
  

  constructor(private Api:ApiFuntions,private toastr: ToastrService , private sharedService:SharedService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['ROrder']&&changes['ROrder']?.currentValue){
      this.ROrder = changes['ROrder'].currentValue;
      console.log(this.ROrder);
    } 
    if(changes['RItem']&&changes['RItem']?.currentValue){
      this.ROrder = changes['RItem'].currentValue;
      console.log(this.RItem);
    } 
    if(changes['selection4']&&changes['selection4']?.currentValue){
      this.selection4 = changes['selection4'].currentValue;
      console.log(this.selection4);
    } 
    if(changes['searchString4']&&changes['searchString4']?.currentValue){
      this.searchString4 = changes['searchString4'].currentValue;
      console.log(this.searchString4);
    } 
  }

  postTransaction()
  {
    var payload={
      username: this.userData.userName,
      wsid: this.userData.wsid,
      }
    this.Api.PostReprocessTransaction(payload).subscribe(
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
        this.Api.ReprocessIncludeSet(payload).subscribe(
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

  markTableSelection(matEvent:any){
    const matSelect: MatSelect = matEvent.source;
    matSelect.writeValue(null);
  }
  
  markTable(type:string){
    console.log(type);
    console.log("ROrder",this.ROrder);
    console.log("RItem",this.RItem);
    console.log("selection4",this.selection4);
    console.log("searchString4",this.searchString4);
    console.log("hold",this.hold);
    //   RPHub.server.setReprocessIDs($('#ROrder').val(), $('#RItem').val(), hold, $('#selection4').val(), $('#searchString4').val(), Field).done(function (response) {
    //     if (!response) {
    //         MessageModal('Error', 'There was an error marking the designated reprocess records', undefined, function () { document.getElementById("Message_Modal").style.zIndex = "1061"; });
    //     };
    // });
  }
}
