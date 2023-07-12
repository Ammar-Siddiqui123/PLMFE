import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-wrd-frontend',
  templateUrl: './wrd-frontend.component.html',
  styleUrls: ['./wrd-frontend.component.scss']
})
export class WrdFrontendComponent implements OnInit {
  @ViewChild('ListAndLabel', { read: ViewContainerRef }) ListAndLabel: ViewContainerRef;
  FileName:any = "BMCountList";
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private sharedService:SharedService) {    
    this.sharedService.SideBarMenu.next(false);
    var file = localStorage.getItem("ListAndLandFile")?.replace(".","-");
    this.FileName = file; 
  }
  ngOnInit(): void {
    
    setTimeout(() => {
      this.generateHTMLAndAppend();
    }, 600);
  }

  generateHTMLAndAppend() { 
    const dynamicHtml = `<ll-webreportdesigner backendUrl="http://localhost:63590/LLWebReportDesigner"
    defaultProject="42B325E5-A894-4BDE-9D0A-5098B46A5095" customData="${this.FileName}" ></ll-webreportdesigner>`; 
    const dynamicComponent = Component({
      template: dynamicHtml
    })(class {}); 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent); 
    this.ListAndLabel.clear(); 
    const componentRef = this.ListAndLabel.createComponent(componentFactory);
  }
} 