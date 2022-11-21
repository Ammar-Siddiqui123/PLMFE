import { Component, OnInit } from '@angular/core';
import { ILogin, ILoginInfo } from './Ilogin';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import labels from '../labels/labels.json'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers:[LoginService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: ILogin;

  returnUrl: string;


  constructor(public loginService: LoginService, private router: Router, private route: ActivatedRoute,private toastr: ToastrService) {}

  addLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required,
      Validators.minLength(2),  Validators.maxLength(50)
    ]),
    password: new FormControl('', [Validators.required]),
  });

  loginUser() {
    this.login = this.addLoginForm.value;
    this.loginService
      .login(this.login)
      .subscribe((response: any) => {
        const exe = response.isExecuted
        if(exe == true){
          let data = {
            '_token' : response.data.token
          }
          this.addLoginForm.reset();
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/dashboard']);
        }
        else{
          const errorMessage = response.responseMessage;
          this.toastr.error(errorMessage?.toString(), 'Error!', {
            positionClass: 'toast-top-right',
            timeOut: 2000
          });
        }
       
        
      });
  }

  ngOnInit() {  

  }

}
