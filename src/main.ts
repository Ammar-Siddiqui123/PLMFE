import { enableProdMode,HostListener  } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
  const tabId = 'tab_' + new Date().getTime();
 // Check if this tab's identifier is stored in localStorage
 const existingTabs = localStorage.getItem('openTabs') || '';
 const tabsArray = existingTabs.split(',');
 if (!tabsArray.includes(tabId)) {
  // Add this tab's identifier to the list and update localStorage
  tabsArray.push(tabId);
  localStorage.setItem('openTabs', tabsArray.join(','));

  // Perform any actions specific to new tabs/windows here
  console.log('New tab opened.');
}
window.addEventListener('beforeunload', function (event) {
  let loadTime = new Date();
  let unloadTime:any = localStorage.getItem('unloadTime');

  if (unloadTime) {
    unloadTime = new Date(JSON.parse(unloadTime));
    let refreshTime = loadTime.getTime() - unloadTime.getTime();
    

  }
});