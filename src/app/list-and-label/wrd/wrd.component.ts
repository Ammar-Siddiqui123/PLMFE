import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Route, Router } from 'angular-routing';
import { map } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wrd',
  templateUrl: './wrd.component.html',
  styleUrls: ['./wrd.component.scss']
})
export class WrdComponent implements OnInit {
  env:string;
  file:string;
  @ViewChild('ListAndLabel', { static: true }) ListAndLabel: ElementRef;
  constructor(private route: ActivatedRoute) {
     
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
    <iframe style="width: 100%; height: 1000px;" id="wrdFrame" src="${this.env}/#/ListAndLabel/report?file=${this.file}">
    </iframe>
    `; 
    this.ListAndLabel.nativeElement.insertAdjacentHTML('beforeend', dynamicHtml);
  }
}
