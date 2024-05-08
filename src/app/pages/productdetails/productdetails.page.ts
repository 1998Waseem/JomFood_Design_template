import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  product_id: any;
  selectedSegment='Related Products'
  constructor(private router: Router) { }

  ngOnInit() {
    this.gotoproductdetails();
  }

  gotocart(){
    this.router.navigate(['/cart']);
  }

  gotoproductdetails(){
    var creds = {
			id: this.product_id,
			seller_id : localStorage.getItem("seller_id")	
        };
        console.log(creds)
  }
}
