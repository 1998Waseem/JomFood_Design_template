import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  
  gotocredit(){
    this.router.navigate(['/credit']);
  }

  gotoorders(){
    this.router.navigate(['/orders']);
  }

  gotoprofile(){
    this.router.navigate(['/profile']);
  }

}
