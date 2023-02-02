import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../../app/init/auth.service';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-tran-in-reprocess',
  templateUrl: './tran-in-reprocess.component.html',
  styleUrls: ['./tran-in-reprocess.component.scss']
})
export class TranInReprocessComponent implements OnInit {
  selectedOption = "reprocess";
  public userData : any;
  public itemNumber : string = '';
  public orderNumber : string = '';
  @Output() reprocessSelectionEvent = new EventEmitter<string>();

  constructor(
    private transService: TransactionService,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getFilteredList();
  }
  radioButtonChange(event) {
    this.reprocessSelectionEvent.emit(event.value);
  }



  getFilteredList() {
    let payload = {
      "itemNumber": this.itemNumber,
      "orderNumber": this.orderNumber,
      "holds": false,
      "history": false,
      "username":  this.userData.username,
      "wsid": this.userData.wsid
    }
    this.transService.get(payload, '/Admin/FilterdOrdersList').subscribe(res => {
      console.log(res);
      
    });
  }

}
