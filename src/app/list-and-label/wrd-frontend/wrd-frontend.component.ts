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
    // var file = localStorage.getItem("ListAndLandFile")?.replace(".","-");
    // this.FileName = file;
     
  }
  ngOnDestroy(){
    this.sharedService.SideBarMenu.next(true);
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
      this.generateHTMLAndAppend();
    }, 600);
  }

  generateHTMLAndAppend() { 
    const dynamicHtml = `<ll-webreportdesigner backendUrl="${environment.apiUrl.split("/api")[0]}/LLWebReportDesigner"
    defaultProject="${this.FileName.split('-')[1] == 'lbl'? '7FAC97B2-3F8A-437A-A3B6-2E0E2FCB750B':'57D637EE-9735-42B4-88D7-4B43FE17DDA8'}" customData="${this.FileName}" ></ll-webreportdesigner>`; 
    this.ListAndLabel.nativeElement.insertAdjacentHTML('beforeend', dynamicHtml);
  }
} 