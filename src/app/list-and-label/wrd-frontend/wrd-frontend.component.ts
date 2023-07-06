import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-wrd-frontend',
  templateUrl: './wrd-frontend.component.html',
  styleUrls: ['./wrd-frontend.component.scss']
})
export class WrdFrontendComponent implements OnInit {
  @ViewChild('ListAndLabel', { read: ViewContainerRef }) ListAndLabel: ViewContainerRef;
  FileName:string = "BMCountList";
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.generateHTMLAndAppend();
    }, 600);
  }

  generateHTMLAndAppend() { 
    const dynamicHtml = `<ll-webreportdesigner backendUrl="http://localhost:63590/LLWebReportDesigner"
    defaultProject="42B325E5-A894-4BDE-9D0A-5098B46A5085" customData="${this.FileName}" ></ll-webreportdesigner>`; 
    const dynamicComponent = Component({
      template: dynamicHtml
    })(class {}); 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent); 
    this.ListAndLabel.clear(); 
    const componentRef = this.ListAndLabel.createComponent(componentFactory);
  }
} 