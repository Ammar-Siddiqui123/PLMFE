import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  loadMenu : boolean = false;
  updateSidebar(){
    this.loadMenu = !this.loadMenu;
    return this.loadMenu;
  }
  getSidebarStatus(){
    return this.loadMenu;
  }
}
