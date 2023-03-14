import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SetColumnSeqService } from '../admin/dialogs/set-column-seq/set-column-seq.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  constructor(private columnSequence : SetColumnSeqService) { }
  loadMenu : boolean = false;
  private data: any;
  private menuData = new Subject<any>();
  public SidebarMenupdate = new Subject<any>();
  menuData$ = this.menuData.asObservable();

  private appData:any;
  startMenu: Subject<any> = new Subject<any>(); 
  updateAdminMenuObserver: Subject<boolean> = new Subject<boolean>(); // observing that bool
  updateInductionAdminObserver: Subject<any> = new Subject<any>(); 
  orderStatusObserver: Subject<any> = new Subject<any>(); 
  itemObserver: Subject<any> = new Subject<any>(); 
  historyItemObserver: Subject<any> = new Subject<any>(); 
  reprocessItemObserver: Subject<any> = new Subject<any>();
  orderStatusObjObserver: Subject<any> = new Subject<any>();
  orderStatusSendOrderObserver: Subject<any> = new Subject<any>();
  historyLocObserver: Subject<any> = new Subject<any>();  
  appRestrictionObserver: Subject<any> = new Subject<any>();  
  updateReprocessObserver: Subject<any> = new Subject<any>();  
  updateToteFilterCheckObserver:Subject<any>=new Subject<any>();

  resetSidebar() {
    this.startMenu.next(true);
  }     

  updateSidebar(){
    this.loadMenu = !this.loadMenu;
    return this.loadMenu;
  }
  
  updateAdminMenu()
  {
    this.updateAdminMenuObserver.next(true);
  }

  updateInductionAdminMenu(menu)    // on side menu update induction menu 
  {
    this.updateInductionAdminObserver.next(menu);
  }
 
  updateOrderStatus(order){    // order status observer for selecting order number when passing toteid and set order fields 
    this.orderStatusObserver.next(order);

  }
  updateItemTransaction(item){   // changes select field to item number and passes item number to field in Open Transaction 
    this.itemObserver.next(item);

  }
  updateTransactionHistory(item){   //changes select field to item number and passes item number to field in Transaction History 
    this.historyItemObserver.next(item);

  }
  updateTransactionLocHistory(loc){   //changes select field to location and passes location to field in Transaction History 
    this.historyLocObserver.next(loc);

  }
  updateTransactionReprocess(item){   //changes select field to item number and passes item number to field in Rreprocess 
    this.reprocessItemObserver.next(item);

  }
  updateFilterByTote(obj){   // passing data of coming from filter of tote passing to order list for filtering
    this.orderStatusObjObserver.next(obj)
  }
  updateAppVerification(isVerified?){
    this.appRestrictionObserver.next(isVerified);
  }

  updateReprocess(obj?){   // passing item number and order number in reprocess transaction
    this.updateReprocessObserver.next(obj);
  }

  updateToteFilterCheck(isChecked){  // toggle check box if tote filter present in order status
    this.updateToteFilterCheckObserver.next(isChecked)
  }
  
  updateOrderStatusOrderNo(orderNumber){ 
    this.orderStatusSendOrderObserver.next(orderNumber);
  }
  getSidebarStatus(){
    return this.loadMenu;
  }

  setData(data: any) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  
  setApp(data: any) {
    this.appData = data;
  }
  getApp() {
    return this.appData;
  }


  updateLoggedInUser(userName:any,wsid:any,menu:any)
  {
    let appName;
    console.log(userName,wsid,menu);
    if(menu.includes('/admin')){
      appName = 'Admin';
    }
    if(menu.includes('/InductionManager')){
      appName = 'Induction Manager';
    }
    this.columnSequence.updateAppName(userName,wsid,appName).subscribe((res: any) => {
      (error) => {
        // alert(error);
         }
         });
  }

  setMenuData(value: any) {
    

    
    this.menuData.next(value);
  }
  BroadCastMenuUpdate(str:any){
    this.SidebarMenupdate.next(str)
  }
}
