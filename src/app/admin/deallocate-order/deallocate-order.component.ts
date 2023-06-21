import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-deallocate-order',
  templateUrl: './deallocate-order.component.html',
  styleUrls: ['./deallocate-order.component.scss']
})
export class DeallocateOrderComponent implements OnInit {

  public userData: any;
  public itemNumber:any = '';
  public orderNumber = '';
  displayedColumns:string[] = ['select','orderNumber']
  orderNumberList:any=[]
  constructor(public authService: AuthService,
              public adminService: AdminService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData()
    this.getAllOrder()
  } 

  getAllOrder(e?){
    let payload = {
      "orderNumber": "",
      "itemNumber": "",
      "transType": e?.value ?? "All", 
      "userName": this.userData.userName,
      "wsid": this.userData.wsid
    }
    console.log(payload)
    this.adminService.get(payload,'/Admin/AllAllocatedOrders').subscribe((res=>{
      console.log(res)
      this.orderNumberList = res.data
    }))
    
  }


}
