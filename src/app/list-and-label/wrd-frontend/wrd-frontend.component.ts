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
    defaultProject="${this.FileName.split('-')[1] == 'lbl'? '7FAC97B2-3F8A-437A-A3B6-2E0E2FCB750B':'57D637EE-9735-42B4-88D7-4B43FE17DDA8'}" customData="${this.FileName}" ></ll-webreportdesigner>`; 
    const dynamicComponent = Component({
      template: dynamicHtml
    })(class {}); 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent); 
    this.ListAndLabel.clear(); 
    const componentRef = this.ListAndLabel.createComponent(componentFactory);
  }
} 