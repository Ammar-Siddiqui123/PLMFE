import { Component, ComponentFactoryResolver, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wrv',
  templateUrl: './wrv.component.html',
  styleUrls: ['./wrv.component.scss']
})
export class WrvComponent implements OnInit {
  env:string;
  file:string;
  @ViewChild('ListAndLabel', { static: true }) ListAndLabel: ElementRef;
  @ViewChild('myIframe', { static: true }) myIframeRef: ElementRef;
  iframeSrc:string;
  constructor(private route:ActivatedRoute) {
 this.iframeSrc = `${this.env}/#/ListAndLabel/report-view?file=${this.file}`;  
    this.env = location.protocol + '//' + location.host; 
 
   }
   
  ngOnInit(): void {
    var filename = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('file')),
    );
    filename.subscribe((param) => { 
      if (param!=null &&param != undefined) {
        this.file = param;
      } 
    });
    setTimeout(() => {
     this.generateHTMLAndAppend() ;
      
    }, 250);
  }
  generateHTMLAndAppend() { 
    const dynamicHtml = `
    <iframe style="width: 100%; height: 1000px;"  #myIframe src="${this.env}/#/report-view-iframe?file=${this.file}">
    </iframe>
    `; 
    this.ListAndLabel.nativeElement.insertAdjacentHTML('beforeend', dynamicHtml);
    const iframe: HTMLIFrameElement = this.myIframeRef.nativeElement;
     
    iframe.onload = () => { 
      debugger
      if (`${this.env}/#/ListAndLabel/report-view?file=${this.file}` ==  window.location.href) {
        // If they match, do nothing (keep the iframe open)
        console.log('Iframe URL matches parent window URL.');
      } else { 
        console.log('Iframe URL does not match parent window URL. Closing the iframe...'); 
      }
  }
}
}
