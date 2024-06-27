import { Component, ElementRef, QueryList,HostListener, NgZone, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

 
  constructor(private menuController: MenuController,private router: Router,public alertController: AlertController,private loadingCtrl: LoadingController,private authService: AuthService) {
};
   
 

  ngOnInit() {
  }

  openMenu() {
    this.menuController.open('sidemenu');
  }
 
  gotoproductdetails(){
    this.router.navigate(['/productdetails']);
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

  gotocredit(){
    this.router.navigate(['/credit'])
  }

  gotosearch(){
    this.router.navigate(['/search']);
  }

 
}


