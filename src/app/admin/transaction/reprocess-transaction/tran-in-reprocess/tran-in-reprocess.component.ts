import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../../../../../app/init/auth.service';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-tran-in-reprocess',
  templateUrl: './tran-in-reprocess.component.html',
  styleUrls: ['./tran-in-reprocess.component.scss']
})
export class TranInReprocessComponent implements OnInit {
  selectedOption = "reprocess";
  reasonFilter = "none";
  @Input() selectedOrder: any;

  public userData : any;
  public orderList : any;
  public itemNumberList : any;
  public itemNumber : string = '';
  public orderNumber : string = '';
  public history : boolean = false;
  @Output() reprocessSelectionEvent = new EventEmitter<string>();
  @Output() radioChangeEvent = new EventEmitter<any>();
  @Output() reasonFilterEvent = new EventEmitter<string>();
  @Output() selectedOrderNumber = new EventEmitter<string>();
  @Output() selectedItemNum = new EventEmitter<string>();
  @Output() filterCleared = new EventEmitter<string>();

  constructor(
    private transService: TransactionService,
    private authService: AuthService,
    private sharedService:SharedService

  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getFilteredList();
    this.sharedService.updateReprocessObserver.subscribe(selectedOrder => {
      this.orderNumber='';
      this.itemNumber='';
      this.orderNumber=selectedOrder.orderNumber;
      this.itemNumber=selectedOrder.itemNumber;
      this.orderSelected();
      this.listSelected();
      
       })
  }


  radioButtonChange(event) {

    this.orderNumber='';
    this.itemNumber='';
    if(event.value === 'history'){
      this.history = true;
    }
    else{
      this.history = false;
    }
    this.radioChangeEvent.emit({radioChange:true})
    this.reprocessSelectionEvent.emit(event.value);
    this.clear();
  }
  reasonFilterChange(event) {
    this.orderNumber='';
    this.itemNumber='';
    this.radioChangeEvent.emit({radioChange:true})
    this.reasonFilterEvent.emit(event.value);
    this.clear();
  }

  clear(reset:boolean=false)
  {

    if(reset){
   
      this.setResetValues();
     this.filterCleared.emit('cleared');
     this.getFilteredList();
     this.getItemList();
    //  this.reprocessSelectionEvent.emit('reprocess');
    //  this.reasonFilterEvent.emit('none');
    }else{
      this.getFilteredList();
     this.getItemList();
      this.filterCleared.emit();
    }
    
  
  }

  setResetValues(){
    this.orderNumber="";
    this.itemNumber="";
    this.reasonFilter='none';
    this.selectedOption='reprocess';
   this.history=false;
  }

  getFilteredList() {
    let payload = {
      "ItemNumber": this.itemNumber,
      "OrderNumber": this.orderNumber,
      "History": this.history,
      "username":  this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.transService.get(payload, '/Admin/ReprocessTypeahead').subscribe(res => {
      // console.log(res);
      this.orderList = res.data;
    });
  }

  orderSelected(){
    // console.log(this.orderNumber);
    this.selectedOrderNumber.emit(this.orderNumber);
    this.getItemList();
  }
  listSelected(event?){
    // console.log(this.orderNumber);
    this.selectedItemNum.emit(this.itemNumber);
    // this.getItemList();
  }
  getItemList(){
    let payload = {
      "ItemNumber": this.itemNumber,
      "OrderNumber": this.orderNumber,
      "History": this.history,
      "username":  this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.transService.get(payload, '/Admin/ReprocessTypeahead').subscribe(res => {
      // console.log(res.data);
      this.itemNumberList = res.data;
    });
  }


}
