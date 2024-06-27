import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private router:Router,private http: HttpClient,private alertCtrl:AlertController,private formbuilder:FormBuilder,private authservice:AuthService,private loadingCtrl:LoadingController) {
  
    }
   

  ngOnInit() {
  }
  gotoforgot(){
    this.router.navigate(['/forgotpassword']);
  }
  gotodashboard(){
    this.router.navigate(['/home']);
  }
  gotosignup(){
    this.router.navigate(['/signup']);
  }
  gotowelcome(){
    this.router.navigate(['/welcome']);
  }

}
