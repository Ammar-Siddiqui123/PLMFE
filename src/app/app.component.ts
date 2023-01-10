import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // document.addEventListener('contextmenu', function (e) {
    //   e.preventDefault();
    // });

    window.onresize = function () {
      if ((window.outerHeight - window.innerHeight) > 100)
        if (confirm('You are not authorized')) {
          localStorage.clear();
          window.location.reload()
        }
        else {
          localStorage.clear();
          window.location.reload()
        }
    }
  }
}
