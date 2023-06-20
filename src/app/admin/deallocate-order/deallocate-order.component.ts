import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-deallocate-order',
  templateUrl: './deallocate-order.component.html',
  styleUrls: ['./deallocate-order.component.scss']
})
export class DeallocateOrderComponent implements OnInit {

  public userData: any;
  public itemNumber = '';
  public orderNumber = '';
  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
    this.userData = this.authService.userData()
  } 

  getItemLookup(event){
    // console.log(event.target.value)
    this.itemNumber = event.target.value
    let payload = {
      
    }

  }

}
