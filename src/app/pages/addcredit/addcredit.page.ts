import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-addcredit',
  templateUrl: './addcredit.page.html',
  styleUrls: ['./addcredit.page.scss'],
})
export class AddcreditPage implements OnInit {

  constructor(private menuController: MenuController,private router:Router,private modalController: ModalController) { }

  ngOnInit() {
  }


  gotocart(){
    this.router.navigate(['/cart']);
  }
  gotohome(){
    this.router.navigate(['/home']);
  }
  gotoorders(){
    this.router.navigate(['/orders']);
  }

  gotoprofile(){
    this.router.navigate(['/profile']);
  }

  openMenu() {
    this.menuController.open('sidemenu');
  }

  gotocredit(){
    this.router.navigate(['/credit'])
    this.modalController.dismiss();
  }
}
