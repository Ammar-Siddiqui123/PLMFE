import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wrv-frontend',
  templateUrl: './wrv-frontend.component.html',
  styleUrls: ['./wrv-frontend.component.scss']
})
export class WrvFrontendComponent implements OnInit {
  @ViewChild('ListAndLabel', { read: ViewContainerRef }) ListAndLabel: ViewContainerRef;
  FileName:any = "";
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private sharedService:SharedService) {
    this.sharedService.SideBarMenu.next(false);
    var file = localStorage.getItem("ListAndLandFile")?.replace(".","-");
    this.FileName = file;
    console.log(file);
  }
  ngOnInit(): void {
    
    setTimeout(() => {
      this.generateHTMLAndAppend();
    }, 600);
  }

  generateHTMLAndAppend() { 
    const dynamicHtml = `<ll-webreportviewer backendUrl="${environment.apiUrl.split("/api")[0]}LLWebReportViewer"
    defaultProject="42B325E5-A894-4BDE-9D0A-5098B46A5085" customData="${this.FileName}" ></ll-webreportviewer>`; 
    const dynamicComponent = Component({
      template: dynamicHtml
    })(class {}); 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent); 
    this.ListAndLabel.clear(); 
    const componentRef = this.ListAndLabel.createComponent(componentFactory);
  }
} 