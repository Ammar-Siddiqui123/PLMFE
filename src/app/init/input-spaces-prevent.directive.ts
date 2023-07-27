import { Directive,HostListener  } from '@angular/core';

@Directive({
  selector: '[appInputSpacesPrevent]'
})
export class InputSpacesPreventDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
}
