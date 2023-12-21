import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  signUp: boolean = true
  loginForm = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['',[Validators.required]]
  });
  constructor(private authService: AuthenticationService, private fb: FormBuilder, private router: Router) {
    this.authService.logout();
  }

  submit() {
    if(this.signUp) this.createAccount();
    else this.login()
    console.log('submitted')
  }
  
  createAccount() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    if(email && password) this.authService.createUserWithEmail(email, password)
  }

  login() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    if(email && password) this.authService.login(email, password).then(res => {
      if(res) this.router.navigate(['dashboard'])
    })
  }
}
