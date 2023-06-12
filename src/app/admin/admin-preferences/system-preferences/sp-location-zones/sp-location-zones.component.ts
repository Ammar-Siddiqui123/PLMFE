import { Component, OnInit } from '@angular/core';
import { AdminPreferencesService } from '../../admin-preferences.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-sp-location-zones',
  templateUrl: './sp-location-zones.component.html',
  styleUrls: ['./sp-location-zones.component.scss']
})
export class SpLocationZonesComponent implements OnInit {

  public userData: any;
  constructor(private preferencehub:AdminPreferencesService, 
              public authService: AuthService,) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    console.log(this.userData)
    this.getLocationZones()
  }

  getLocationZones(){

    let payload = {
      'location':'',
      'zone':'',
      'username':this.userData.userName,
      "wsid":this.userData.wsid
    }
    console.log(payload)
    this.preferencehub.get(payload,'/Admin/GetLocationZoneTypeInventoryMap').subscribe((res=>{
      console.log(res)
    }))
  }
}
