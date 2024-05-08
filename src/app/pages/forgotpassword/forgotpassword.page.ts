import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoverification(){
    this.router.navigate(['/verification'])
  }
  gotoback(){
    this.router.navigate(['/login'])
  }
}
