import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  loadMenu: boolean = false;
  private data: any;  //shared data between components
  private appData:any;  //global config app data
  updateSidebar() {
    this.loadMenu = !this.loadMenu;
    return this.loadMenu;
  }
  getSidebarStatus() {
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
}
