import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  loadMenu : boolean = false;
  private data: any;
  private appData:any;
  updateAdminMenuObserver: Subject<boolean> = new Subject<boolean>(); // observing that bool
  updateSidebar(){
    this.loadMenu = !this.loadMenu;
    return this.loadMenu;
  }
  updateAdminMenu()
  {
    this.updateAdminMenuObserver.next(true);
  }
  getSidebarStatus(){
    return this.loadMenu;
  }
}
