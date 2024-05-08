import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {

  constructor(private menuController: MenuController,private router: Router) { }

  ngOnInit() {
  }

  openMenu() {
    this.menuController.open('sidemenu');
  }

  gotoaddcredit(){
    this.router.navigate(['/addcredit']);
  }

  gotocredit(){
    this.router.navigate(['/credit']);
  }

  gotoorders(){
    this.router.navigate(['/orders']);
  }

  gotocart(){
    this.router.navigate(['/cart']);
  }

  gotoprofile(){
    this.router.navigate(['/profile']);
  }

  gotohome(){
    this.router.navigate(['/home']);
  }
}
