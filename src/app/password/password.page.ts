import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  userpassword:string='';
  usercpassword:string='';
  ackey:string='';
  createpasswordform:FormGroup;
  submitAttempt7:boolean=false;
  constructor(private router:Router,private http:HttpClient,private formbuilder:FormBuilder,private authservice:AuthService) { 
    this.createpasswordform= formbuilder.group({
      regpass1: ['', Validators.required],
      regpass2: ['', Validators.required]
    })
  }

  finishregpass() {
    console.log(this.createpasswordform)
    if (this.createpasswordform?.status === 'INVALID') {
      this.submitAttempt7 = true;
      console.log("error!");
    } else {
        this.submitAttempt7 = false;
        console.log("success!");
        console.log(this.createpasswordform.value);
        this.sendregpass(this.createpasswordform.value);
    //  else {
    //     // this.presentAlert(this.translate.instant('Passwords do not match!'));
    //     console.log("password Not match");
    //   }
    }
  }

  ngOnInit() {
  }

  sendregpass(user:any){
    var getcode= window.localStorage.getItem('Verification_code')
    this.authservice.onnewpass(user, getcode)
  }

gotoverification(){
    this.router.navigate(['/verification']);
  }



}
