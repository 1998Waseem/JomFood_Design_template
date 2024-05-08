import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myaddress',
  templateUrl: './myaddress.page.html',
  styleUrls: ['./myaddress.page.scss'],
})
export class MyaddressPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  addnewaddress(){
    this.router.navigate(['/addaddress'])
  }

}
