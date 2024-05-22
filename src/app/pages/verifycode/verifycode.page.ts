import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.page.html',
  styleUrls: ['./verifycode.page.scss'],
})
export class VerifycodePage implements OnInit {

  uemail:string='';
  burl:any;
  forgotpasswordform:FormGroup;
  submitAttempt3:boolean=false;
  constructor(private router:Router,private http: HttpClient,private alertCtrl: AlertController, private formbuilder:FormBuilder,private authservice:AuthService) { 
    this.burl='https://altitudeprojects.net/js-mp/user_api';
    this.forgotpasswordform=formbuilder.group({
      forgotemail: ['', [Validators.required, <any>Validators.email]],
    }
    )
  }

  dotheforgot(){
    if(!this.forgotpasswordform.valid){
      this.submitAttempt3 = true;
        console.log("error!");
    }else{
      this.submitAttempt3 = false;
      console.log("Success");
      console.log(this.forgotpasswordform.value)
      this.sendforgot(this.forgotpasswordform.value);
    }
  }

  sendforgot(user:any){
    this.authservice.onresetpass(user);
  }

  ngOnInit() {
  }

  gotoverification(){
    this.router.navigate(['/verification'])
  }
  gotoback(){
    this.router.navigate(['/login'])
  }

  storedata(userstuff:any){
    window.localStorage.setItem('uid',userstuff.user_id)
  }

}
