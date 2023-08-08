import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wrd-frontend',
  templateUrl: './wrd-frontend.component.html',
  styleUrls: ['./wrd-frontend.component.scss']
})
export class WrdFrontendComponent implements OnInit {
  @ViewChild('ListAndLabel', { static: true }) ListAndLabel: ElementRef;
  FileName:any = "BMCountList";
  constructor(private sharedService:SharedService,private route:ActivatedRoute) {    
    this.sharedService.SideBarMenu.next(false);
    this.sharedService.updateMenuState(true);
    // var file = localStorage.getItem("ListAndLandFile")?.replace(".","-");
    // this.FileName = file;
     
  }
  ngOnDestroy(){ 
    this.sharedService.SideBarMenu.next(true);
    window.location.reload();
  }

  ngOnInit(): void {
    // let appd=JSON.parse(localStorage.getItem('availableApps') || '');
    // this.sharedService.setMenuData(appd);
    this.sharedService.updateLoadMenuFunction({route:'/admin/reports'})
    
    var filename = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('file')),
    );
    filename.subscribe((param) => { 
      if (param!=null &&param != undefined) {
        this.FileName = param;
      } 
    });
    setTimeout(() => {
      this.generateHTMLAndAppend();
    }, 600);
  }

  generateHTMLAndAppend() { 
    const dynamicHtml = `<ll-webreportdesigner backendUrl="${environment.apiUrl.split("/api")[0]}/LLWebReportDesigner"
    defaultProject="${this.FileName.split('-')[1] == 'lbl'? 'BCAEC8B2-9D16-4ACD-94EC-74932157BF82':'072A40E4-6D25-47E5-A71F-C491BC758BC9'}" customData="${this.FileName}" ></ll-webreportdesigner>`; 
    this.ListAndLabel.nativeElement.insertAdjacentHTML('beforeend', dynamicHtml);
  }
} 