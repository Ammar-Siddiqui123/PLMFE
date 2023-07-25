import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';
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
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private sharedService:SharedService,private route:ActivatedRoute) {
    this.sharedService.SideBarMenu.next(false);
    
  }
  ngOnInit(): void {
    var filename = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('file')),
    );
    filename.subscribe((param) => { 
      if (param!=null &&param != undefined) {
        this.FileName = param;
      } 
    });
    setTimeout(() => {
      if(this.FileName != null) this.generateHTMLAndAppend();
    }, 600);
  }

  generateHTMLAndAppend() { 
    const dynamicHtml = `<ll-webreportviewer backendUrl="${environment.apiUrl.split("/api")[0]}/LLWebReportViewer"
    defaultProject="42B325E5-A894-4BDE-9D0A-5098B46A5085" customData="${this.FileName}" ></ll-webreportviewer>`; 
    const dynamicComponent = Component({
      template: dynamicHtml
    })(class {}); 
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent); 
    this.ListAndLabel.clear(); 
    const componentRef = this.ListAndLabel.createComponent(componentFactory);
  }
} 