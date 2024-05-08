import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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

  gotoorderdetails(){
    this.router.navigate(['/ordertracking']);
  }
}
