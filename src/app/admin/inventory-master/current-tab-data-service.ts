import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class CurrentTabDataService {
    public currentTab: string;
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
    

    public CheckTabOnRoute(currentTab: string, previousTab: string) {
      if (currentTab.indexOf("Dashboard") >= 0) return true;
      if ((currentTab.split("/").length - 1) != 2) return true;

      if (localStorage.getItem('selectedTab_'+currentTab) != null) {
        return true; // No redirect to dashboard.
      }
      else {
        if (currentTab !== previousTab) {
          this.RemoveTabOnRoute(previousTab);
          localStorage.setItem('selectedTab_'+currentTab, currentTab);	
        }
      }
      return true;
    }
    public RemoveTabOnRoute(currentTab:string) {
      if (currentTab.indexOf("Dashboard") >= 0) return;
      localStorage.removeItem('selectedTab_'+currentTab);
    }
    private previousUrl: string | null = null;

    setPreviousUrl(url: string) {
      this.previousUrl = url;
    }

    getPreviousUrl(): string | null {
      return this.previousUrl;
    }
}