import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-sp-general-setup',
  templateUrl: './sp-general-setup.component.html',
  styleUrls: ['./sp-general-setup.component.scss']
})
export class SpGeneralSetupComponent implements OnInit {
  public userData: any;
  public CompanyObj: any={};
  public FieldNames :any={};
  constructor(    public authService: AuthService) {
    this.userData = authService.userData();
   }

  ngOnInit(): void {
    this.CompanyInfo();
    this.OSFieldFilterNames();
  }
  public OSFieldFilterNames() { 
    this.authService.OSFieldFilterNames().subscribe((res: any) => {
      this.FieldNames = res.data;
    })
  }
  public CompanyInfo() {
    let paylaod = { 
      "userName": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.authService.CompanyInfo(paylaod).subscribe((res: any) => {
      this.CompanyObj = res.data;
    })
  }
  ngOnDestroy(){  
  }
  payload(no){ 
    var paylaod1:any = {
      "preference": [
        this.CompanyObj.companyName,this.CompanyObj.address1,this.CompanyObj.city,this.CompanyObj.state,
        this.CompanyObj.earlyBreakTime,String(this.CompanyObj.earlyBreakDuration),this.CompanyObj.midBreakTime,String(this.CompanyObj.midBreakDuration)
        ,this.CompanyObj.lateBreakTime,String(this.CompanyObj.lateBreakDuration)
      ],
      "panel": 1,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }; 
    var paylaod3:any = {
      "preference": [null,null,null,String(this.CompanyObj.replenishDedicatedOnly),null,null,null,null,null,null,null,
       String(this.CompanyObj.reelTrackingPickLogic) ,null,null,String(this.CompanyObj.showTransQty),
      String(this.CompanyObj.nextToteID),String(this.CompanyObj.nextSerialNumber),null,String(this.CompanyObj.pickType),null
      ,String(this.CompanyObj.distinctKitOrders),null,String(this.CompanyObj.generateQuarantineTransactions)],
      "panel": 3,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }; 
    if(no==1) this.SaveForm(paylaod1);
    if(no==3)  this.SaveForm(paylaod3);
  }
    async SaveForm(paylaod){ 
      this.authService.GeneralPreferenceSave(paylaod).subscribe((res: any) => { 
      })
    }
}
