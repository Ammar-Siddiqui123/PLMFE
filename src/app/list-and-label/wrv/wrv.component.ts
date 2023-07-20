import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wrv',
  templateUrl: './wrv.component.html',
  styleUrls: ['./wrv.component.scss']
})
export class WrvComponent implements OnInit {
  env:string;
  @ViewChild('ListAndLabel', { read: ViewContainerRef }) ListAndLabel: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
     
    this.env = location.protocol + '//' + location.host; 
 
   }
  ngOnInit(): void {
    setTimeout(() => {
     this.generateHTMLAndAppend() ;
      
    }, 250);
  }
  generateHTMLAndAppend() { 
    const dynamicHtml = `
    <iframe style="width: 100%; height: 1000px;" id="wrdFrame" src="${this.env}/#/ListAndLabel/report-view">
    </iframe>
    `; 
    const dynamicComponent = Component({
      template: dynamicHtml
    })(class {}); 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent); 
    this.ListAndLabel.clear(); 
    const componentRef = this.ListAndLabel.createComponent(componentFactory);
  }
}
