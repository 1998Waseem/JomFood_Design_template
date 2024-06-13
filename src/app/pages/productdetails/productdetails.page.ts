import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  product_id: any;
  selectedSegment='Related Products';
  public burl:any;
  public singlepro:any;
  public proimages:any;
  public proreviews:any;
  public prorelated:any;
  cartUpdated:any;
  cartItems:any;
	public badgebanner: any;  
  constructor(private router: Router,private authservice:AuthService,private http:HttpClient) { 
    this.burl='https://altitudeprojects.net/js-mp/user_api';
    this.cartItems=1;
  }

  ngOnInit() {
    this.getproddetails();
  }

  gotocart(){
    this.router.navigate(['/cart']);
  }

 async getproddetails(){
   
    try{
      const creds={
     
        "id":sessionStorage.getItem("Product_id"),
        "seller_id":localStorage.getItem("seller_id")
      }
  
      console.log(creds)
  
      const product_detail= await this.http.post<any>('https://altitudeprojects.net/js-mp/user_api/Product/get_single_product', creds).toPromise();
      console.log("Product data is:",product_detail);
  
      if(product_detail.status === 'success')
        {
          this.singlepro = product_detail.data.product_detail;
          this.proimages = product_detail.data.product_images;
          this.proreviews = product_detail.data.reviews;
          this.prorelated = product_detail.data.related_products;
        }
    }catch(error){
      console.log("Error:",error)
    }
  }

  // addToCart() {
  //   if (window.localStorage.getItem("utoken")) {
  //     const standardcart = {
  //       user_id: window.localStorage.getItem('uid'),
  //       product_id: this.product_id, // Assuming product_id, cartItems, singlepro are defined in your component
  //       quantity_id: this.cartItems,
  //       price: this.singlepro.price,
  //       order_id: '',
  //       name: this.singlepro.name,
  //       img: this.singlepro.image_url,
  //       seller_id: this.singlepro.seller_id,
  //       adjustable: 'yes'
  //     };

  //     // Store item to device storage
  //     this.authservice.initializeCart(standardcart).then((data: boolean) => {
  //       if (data) {
  //         // Update menu counter number
  //         this.events.publish('cartbadge:updated', Date.now());
  //         this.badgebanner = window.localStorage.getItem('cartbadge');
  //       }
  //     });
  //   } else {
  //     sessionStorage.setItem("route_back_page", 'ProductdetailPage');
  //     this.router.navigate(['/home']);
  //   }
  // }

  addToCart() {
    if (window.localStorage.getItem("utoken")) {
      const standardcart = {
        user_id: window.localStorage.getItem('uid'),
        product_id: sessionStorage.getItem("Product_id"), // Assuming product_id, cartItems, singlepro are defined in your component
        quantity_id: this.cartItems,
        price: this.singlepro.price,
        order_id: window.localStorage.getItem('cartorderid'),
        name: this.singlepro.name,
        img: this.singlepro.image_url,
        seller_id: this.singlepro.seller_id,
        adjustable: 'yes'
      };

      // Store item to device storage
      this.authservice.initializeCart(standardcart).then((data: boolean) => {
        if (data) {
          // Emit event to notify cart update
          this.cartUpdated.emit(Date.now());
          this.badgebanner = window.localStorage.getItem('cartbadge');
        }
      });
      this.router.navigate(['/cart']);
    } else {
      sessionStorage.setItem("route_back_page", 'ProductdetailPage');
      this.router.navigate(['/home']);
    }
  }

  plusitem(){
    this.cartItems = this.cartItems + 1;
  }
 
  minusitem(){ 
    if (this.cartItems == 1){
      this.cartItems = 1;
    }else{
      this.cartItems = this.cartItems - 1;
    }
  }

}

