import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  constructor() { }
  loadMenu : boolean = false;
  private data: any;
  private menuData = new Subject<any>();
  menuData$ = this.menuData.asObservable();

  private appData:any;
  updateAdminMenuObserver: Subject<boolean> = new Subject<boolean>(); // observing that bool
  updateInductionAdminObserver: Subject<any> = new Subject<any>(); 

  updateSidebar(){
    this.loadMenu = !this.loadMenu;
    return this.loadMenu;
  }
  updateAdminMenu()
  {
    this.updateAdminMenuObserver.next(true);
  }

  updateInductionAdminMenu(menu)
  {
    this.updateInductionAdminObserver.next(menu);
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
  setMenuData(value: any) {
    

    
    this.menuData.next(value);
  }
  
}
