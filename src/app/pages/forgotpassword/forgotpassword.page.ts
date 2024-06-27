import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  constructor(private router:Router,private alertCtrl: AlertController) { 
  }

  ngOnInit() {
  }

  gotoverification(){
    this.router.navigate(['/verification'])
  }
  gotoback(){
    this.router.navigate(['/login'])
  }


}
