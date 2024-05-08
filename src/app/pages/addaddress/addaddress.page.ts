import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  gotomyaddress(){
    this.router.navigate(['/myaddress'])

  }
}
