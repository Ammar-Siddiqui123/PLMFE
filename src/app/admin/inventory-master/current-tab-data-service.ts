import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class CurrentTabDataService {
    public savedItem: string[] = [];
    public BATCH_MANAGER = "Batch Manager";
    public BATCH_MANAGER_DELETE = "Batch Manager Delete";
    public INVENTORY_MAP = "Inventory Map";
    public INVENTORY = "Inventory";
    public TRANSACTIONS = "Transactions";
    public TRANSACTIONS_ORDER = "Transactions Order";
    public TRANSACTIONS_ORDER_SELECT = "Transactions Order Select";
    public CONSOLIDATION = "Consolidation";
    public ORDER_MANAGER = "Order Manager";
    public ClearAllItems() {
      this.savedItem = [];
    }
    public ClearItemsExceptCurrentTab(currentTab: string) {
      this.SetNull(this.BATCH_MANAGER, currentTab);
      this.SetNull(this.BATCH_MANAGER_DELETE, currentTab);
      this.SetNull(this.INVENTORY, currentTab);      
      this.SetNull(this.INVENTORY_MAP, currentTab);      
      this.SetNull(this.TRANSACTIONS, currentTab);
      this.SetNull(this.TRANSACTIONS_ORDER, currentTab);    
      this.SetNull(this.TRANSACTIONS_ORDER_SELECT, currentTab);     
      this.SetNull(this.CONSOLIDATION, currentTab);          
      this.SetNull(this.ORDER_MANAGER, currentTab);      
    }
    public SetNull (currentTab: string, excludeTab: string) {
      // if (currentTab !== excludeTab) {
      //   this.savedItem[currentTab] = undefined;
      //   if (currentTab === this.TRANSACTIONS)
      //   this.savedItem[this.TRANSACTIONS_ORDER_SELECT] = undefined;        
      // }
      this.savedItem[currentTab] = undefined;
    }
}