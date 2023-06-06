import { Component, OnInit } from '@angular/core';
import { LocationAssignmentService } from './location-assignment.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-location-assignment',
  templateUrl: './location-assignment.component.html',
  styleUrls: ['./location-assignment.component.scss']
})
export class LocationAssignmentComponent implements OnInit {

  countLabel:string = "Count";
  pickLabel:string = "Pick";
  putAwayLabel:string = "Put Away";
  public userData: any;

  constructor(
    private locationService: LocationAssignmentService,
    private authservice : AuthService,
  ) {}

  public Tab;

  ngOnInit(): void {
    this.userData = this.authservice.userData();
    this.getLabels();
  }

  getLabels(){
    let payload = {
      "userName" : this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.locationService.get(payload,'/Admin/GetTransactionTypeCounts').subscribe((res =>{
      if (res.isExecuted && res.data) {
        res.data.forEach(item => {
          if (item.transactionType === "Count") {
            this.countLabel = `Count (${item.count})`;
          } else if (item.transactionType === "Pick") {
            this.pickLabel = `Pick (${item.count})`;
          } else if (item.transactionType === "Put Away") {
            this.putAwayLabel = `Put Away (${item.count})`;
          }
        });
      } 
    }));
  }

  ngAfterViewInit(){
    // this.addItem()
  }

  addItem(newItem: Event) {
    this.Tab = newItem
  }
}
