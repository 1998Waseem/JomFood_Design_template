import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  // passport:string='';

  constructor(private router: Router,private alertCtrl:AlertController) {
  }


  

  ngOnInit() {
  }

  gotologin(){
    this.router.navigate(['/login']);
  }
}
