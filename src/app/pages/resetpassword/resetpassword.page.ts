import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  userpassword:string='';
  usercpassword:string='';
  ackey:string='';
  createresetpasswordform:FormGroup;
  submitAttempt7:boolean=false;
  constructor(private router:Router,private http:HttpClient,private formbuilder:FormBuilder,private authservice:AuthService) { 
    this.createresetpasswordform= formbuilder.group({
      resetpass1: ['', Validators.required],
      resetpass2: ['', Validators.required]
    })
  }

  finishregpass() {
    console.log(this.createresetpasswordform)
    if (this.createresetpasswordform?.status === 'INVALID') {
      this.submitAttempt7 = true;
      console.log("error!");
    } else {
        this.submitAttempt7 = false;
        console.log("success!");
        console.log(this.createresetpasswordform.value);
        this.sendregpass(this.createresetpasswordform.value);
    //  else {
    //     // this.presentAlert(this.translate.instant('Passwords do not match!'));
    //     console.log("password Not match");
    //   }
    }
  }

  ngOnInit() {
  }

  sendregpass(user:any){
    var getcode= window.localStorage.getItem('Verification_reset_code')
    console.log("Code is:",getcode);
    this.authservice.onresetpass1(user, getcode)
  }

gotoverification(){
    this.router.navigate(['/verification']);
  }
}
