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
  }

  gotocart(){
    this.router.navigate(['/cart']);
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

  gotoaddToCart(){
    this.router.navigate(['/cart']);
  }

}

