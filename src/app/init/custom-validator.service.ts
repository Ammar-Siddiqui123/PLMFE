import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  specialCharValidator(control: FormControl): any {
    const nameRegexp: RegExp = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
    if (control.value && nameRegexp.test(control.value)) {
       return { invalidInput: true };
    }
  }
  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  customTrim(control: FormControl){
    const isSpace = (control.value || '').trim() === '' ? true : false;
    return isSpace ? { 'whitespace': true } : null
  }
}
