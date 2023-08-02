import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
  @ViewChild('ListAndLabel', { static: true }) ListAndLabel: ElementRef;
  FileName:any = "";
  constructor(private sharedService:SharedService,private route:ActivatedRoute) {
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
    defaultProject="${this.FileName.split('-')[1] == 'lbl'|| this.FileName?.toLowerCase()?.indexOf('label')>-1 ? '7FAC97B2-3F8A-437A-A3B6-2E0E2FCB750B':'57D637EE-9735-42B4-88D7-4B43FE17DDA8'}" customData="${this.FileName}" ></ll-webreportviewer>`; 
    this.ListAndLabel.nativeElement.insertAdjacentHTML('beforeend', dynamicHtml);
  }
} 