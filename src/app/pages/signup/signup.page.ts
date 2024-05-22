import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AbstractControl, FormGroup, FormBuilder,Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  fname:string='';
  email:string='';
  phone:string='';
  burl:any;
  signupform:FormGroup
  submitAttempt1:boolean=false;

  // passport:string='';

  constructor(private router: Router,private http: HttpClient,private alertCtrl:AlertController,private formbuilder:FormBuilder, private authservice:AuthService) {
    this.burl='https://altitudeprojects.net/js-mp/user_api';
    this.signupform= formbuilder.group({
      fullname:['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', [Validators.required, <any>Validators.email]],
      phonenumber: ['', Validators.compose([Validators.required, this.customNumberValidator()])],
    })
  }

  customNumberValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const regex =/^(?!.*[-.+])(?!0\d{0,8}|00\d{0,8}|60\d{0,7}|600\d{0,6}|0*0060\d{0,6})[0-9]{9,10}$/;
      
      if (!regex.test(value)) {
        return { invalidNumber: true };
      }
      
      return null;
    };
  }

  dotheregister(){
    if(!this.signupform.valid)
      {
        this.submitAttempt1=true;
        console.log("Error !")
      }else {
        if(this.signupform.value.phonenumber.startsWith('+60')) {
          console.log("+60 added")
        }else {
          this.signupform.value.phonenumber = '+60' + (this.signupform.value.phonenumber);
          console.log(this.signupform.value.phonenumber);
        }
        this.submitAttempt1 = false;
        console.log("Success");
        console.log(this.signupform.value)
        this.sendregister(this.signupform.value);
      }
  }

  sendregister(user:any){
    this.authservice.onCreateuser(user);
  }

  

  ngOnInit() {
  }

  gotologin(){
    this.router.navigate(['/login']);
  }
}
