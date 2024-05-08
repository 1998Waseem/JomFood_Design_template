import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  selectedSegment='ASAP'
  constructor(private router:Router,private modalController: ModalController) { }

  ngOnInit() {
  }
  gotocheckout(){
    this.router.navigate(['/checkout'])
    this.modalController.dismiss();
  }
  gotopaymentsucess(){
    this.router.navigate(['/paymentsucess'])
    this.modalController.dismiss();
  }

  moveIcon() {
    
    const iconElement = document.querySelector('.orderbtn ion-icon') as HTMLElement;

    if (iconElement) {
      iconElement.style.marginLeft = 'auto';
    }

  }
}
