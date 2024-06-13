import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { EventEmitter, Output } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  selectedSegment='ASAP'
  public burl:any;
  orderid:any;
  grandtotal: number=0;
  grandtotalorigi: number=0;
  subtotal: number=0;
  notifyItems:any;
  resultdelivery: number=0;
  resultcoupon: number=0;
  sellerguy: string='';
  tax_name: string='';
  tax_percent: number=0;
  tax_amount: number=0;
  tip_btns: any[]=[];
  tip_amount:any=0;
  cartUpdated:any;
  sellerid: string='';
  searchcat: string="";
  fulladdress: string='';
  distance: number=0;
  selectedOption: string = 'Delivery'; 
  globeload: any;
  events: any;
  self_pickup: any = '1';
  constructor(private router:Router,private cdr:ChangeDetectorRef, private modalController: ModalController,private authservice:AuthService,private http:HttpClient,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {

    this.burl='https://altitudeprojects.net/js-mp/user_api';
    this.orderid = window.localStorage.getItem('cartorderid');
   }

  ngOnInit() {
    this.viewNow();
  }
  gotocheckout(){
    this.router.navigate(['/checkout'])
    this.modalController.dismiss();
  }
  gotopaymentsucess(){
    this.router.navigate(['/paymentsucess'])
    this.modalController.dismiss();
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  moveIcon() {
    
    const iconElement = document.querySelector('.orderbtn ion-icon') as HTMLElement;

    if (iconElement) {
      iconElement.style.marginLeft = 'auto';
    }

  }

async viewNow(){
    
    const uid = window.localStorage.getItem('uid');
    var order_id=window.localStorage.getItem('cartorderid');
    const apikey = window.localStorage.getItem('apikey');
    const url = `${this.burl}/order/view_cart/?user_id=${uid}&order_id=${order_id}&api_key=${apikey}`;

    console.log(url);

    return await this.http.get(url).toPromise()
      .then((data: any) => {
        if (data.status === 'success') {
          const cartDetail = data.data.cart_detail;
          const order = cartDetail.total_order;
          this.grandtotal = order.cart_total_amount_plus_delivery_charges;
          this.grandtotalorigi = order.cart_total_amount_plus_delivery_charges_without_format;
          this.subtotal = order.total_without_anycharges;
          this.notifyItems = cartDetail.order_items;
          this.resultdelivery = order.total_dilevery_charges;
          this.resultcoupon = order.discount;
          this.sellerguy = data.data.seller_info[0].company_name;
          this.tax_name = cartDetail.order[0].tax_name;
          this.tax_percent = cartDetail.order[0].tax_percentage;
          this.tax_amount = order.cart_total_tax_amount;
          this.tip_btns = data.data.seller_info[0].tip_options;
          console.log("Check btns:-", this.tip_btns);

          console.log("All cart products are:",this.notifyItems);

          if (this.notifyItems.length > 0) {
            this.sellerid = this.notifyItems[0].seller_id;
            this.searchcat = cartDetail.order[0].delivery_address_id;
            this.fulladdress = cartDetail.order[0].delivery_address;
            this.distance = order.distance;
          } else {
            window.localStorage.setItem('cartorderid', '');
            window.localStorage.setItem('cartbadge', '0');
            // Assuming you have an event emitter setup for cart badge updates
            this.cartUpdated.emit(Date.now());
            console.log('cart is zero');
          }
          this.cdr.detectChanges();
          return order;
        } else {
          return false;
        }
      })
      .catch(error => {
        console.error(error);
        return 'http_error';
      });
  }


  gotoproductdetails(productId:any) {
    sessionStorage.setItem('Product_id',productId)
    this.router.navigate([`/productdetails/${productId}`]);
    console.log(productId);
}

plusitem(i:any) {
  this.notifyItems[i].quantity = this.notifyItems[i].quantity - (-1);
  this.updateCart(this.notifyItems[i]);
}

minusitem(i:any) {
  var cartItems = this.notifyItems[i].quantity;

  if (cartItems == 1) {
    this.notifyItems[i].quantity = 1;
  } else {
    this.notifyItems[i].quantity = this.notifyItems[i].quantity - 1;
     this.updateCart(this.notifyItems[i]);
  }
}

viewOrder() {
  this.orderid = window.localStorage.getItem('cartorderid');

  this.viewNow().then(data => {
    if (data == 'http_error') {
      this.authservice.systemError();
      this.globeload.dismiss();
    } else {
      if (data != false) {
        console.log(data);
        this.globeload.dismiss();
      } else {
        console.log('sorry no listings found');
        this.notifyItems = [];
        window.localStorage.setItem('cartbadge', '0');
        this.events.publish('cartbadge:updated', Date.now());
        //this.presentLoading(this.translate.instant('This shop has no products!'));
        this.globeload.dismiss();
      }
    }

  });
}

async updateCart(x: any): Promise<void> {

  const standardCart = {
    user_id: window.localStorage.getItem('uid'),
    product_id: x.product_id,
    quantity_id: x.quantity,
    price: x.price,
    order_id: this.orderid,
    name: x.product_name,
    img: x.image_url,
    seller_id: x.seller_id,
    adjustable: 'yes'
  };

  try {
    const data = await this.authservice.updatecart(standardCart);
    if (data) {
      this.events.publish('cartbadge:updated', Date.now());
      if (this.searchcat === 'none' || this.self_pickup === '1') {
        this.viewOrder();
        // this.deliveryCharge();
      } else {
        this.globeload.dismiss();
        this.deliveryCharge();
      }
    } else {
      this.globeload.dismiss();
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    this.globeload.dismiss();
  }
}
  deliveryCharge() {
    throw new Error('Method not implemented.');
  }

  async deleteNotes(x: any) {
    // debugger
    const loading = await this.loadingCtrl.create({
      //content: 'Updating cart...'
      backdropDismiss: false
    });
    await loading.present();
    this.globeload = loading;
  
    const standardcart = {
      user_id: window.localStorage.getItem('uid'),
      item_id: x.item_id,
      quantity_id: x.quantity,
      price: x.price,
      order_id: '',
      name: x.product_name,
      img: x.image_url,
      adjustable: 'yes'
    };
  
    try {
      const data: any = await this.authservice.singlewipe(standardcart);
      if (data === true) {
        //update menu counter number
        this.authservice.cartBadgeUpdated.emit(Date.now());
        this.viewOrder();
      } else {
        (await this.globeload).dismiss();
      }
      this.cdr.detectChanges();
    } catch (error) {
      console.error(error);
      (await this.globeload).dismiss();
    }
  }
  async confirmdelete(x:any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: `${'Remove cart item '} ${x.product_name} ?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.deleteNotes(x);
          }
        }
      ]
    });
  
    await alert.present();
  }




}


