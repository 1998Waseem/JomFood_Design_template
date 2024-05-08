import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  gotoforgot(){
    this.router.navigate(['/forgotpassword']);
  }

  gotodashboard(){
    this.router.navigate(['/home'])
  }
  gotosignup(){
    this.router.navigate(['/signup']);
  }
  gotowelcome(){
    this.router.navigate(['/welcome']);
  }
}
