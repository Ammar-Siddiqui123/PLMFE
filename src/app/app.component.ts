import { Component, HostListener, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BrowserCloseService } from './services/browser-close.service';
import { ApiFuntions } from './services/ApiFuntions';
import { BroadcastService } from './init/broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userData;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private browserCloseService: BrowserCloseService,
    private api:ApiFuntions,
    private broadCast:BroadcastService
  ) {}


  @HostListener('window:beforeunload', ['$event'])
beforeunloadHandler(event): void {
  this.browserCloseService.handleBrowserClose();
}
@HostListener('window:load',['$event'])
onPageLoad(event: Event) {
   let loadTime = new Date();
  let unloadTime:any = localStorage.getItem('unloadTime');
  this.userData = JSON.parse(localStorage.getItem('user') || '{}');
  if (unloadTime) {
    unloadTime = new Date(JSON.parse(unloadTime));
    let refreshTime = loadTime.getTime() - unloadTime.getTime();

    if (refreshTime > 3000) {
    }
  }
}
  ngOnInit() {

    this.broadCast.checkLastTab(() => {
      console.log('This is the last open tab');
    });

    window.addEventListener('beforeunload', () => {
      this.broadCast.sendTabClosedMessage();
    });
  }
}
