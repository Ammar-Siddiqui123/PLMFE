import { Component, OnInit } from '@angular/core';
import { ILogin, ILoginInfo } from './Ilogin';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers:[LoginService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: ILogin;
  logins: ILogin[] = [];
  // LoginTyped: ILoginInfo[] = [];
  //sprintForm!: FormGroup;

  returnUrl: string;


  constructor(public loginService: LoginService, private router: Router, private route: ActivatedRoute,) {}

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
      .subscribe((response: ILoginInfo) => {
        console.log(response);

        this.logins.push({ userName: response.userName
          , accessLevel: response.accessLevel,token: response.token,isExecuted: response.isExecuted, loginTime: response.loginTime , responseMessage: response.responseMessage});
     
     
        const exe = this.logins[0].isExecuted
        if(exe == true){
          console.log("logins",this.logins)
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['../dashboard']);
        }
        else{
          const errorMessage = response.responseMessage;
          console.log(" something went wrong", errorMessage)

        }
       
        
      });
  }

  ngOnInit() {  

  }

}
