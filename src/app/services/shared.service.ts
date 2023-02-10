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
  menuData$ = this.menuData.asObservable();

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
    this.columnSequence.updateAppName(userName,wsid,menu.replace(/[^a-z]/gi, '')).subscribe((res: any) => {
      //alert('DONE');
      (error) => {
        // alert(error);
         }
         });
  }

  setMenuData(value: any) {
    

    
    this.menuData.next(value);
  }
  
}
