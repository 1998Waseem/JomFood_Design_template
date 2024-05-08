import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  gotoeditaddress(){
    this.router.navigate(['/myaddress']);
  }

  gotoeditprofile(){
    this.router.navigate(['/editprofile']);
  }
  gotocredit(){
    this.router.navigate(['/credit']);
  }

  gotoorders(){
    this.router.navigate(['/orders']);
  }

  gotoprofile(){
    this.router.navigate(['/profile']);
  }
  gotohome(){
    this.router.navigate(['/home']);
  }

  gotocart(){
    this.router.navigate(['/cart']);
  }
}
