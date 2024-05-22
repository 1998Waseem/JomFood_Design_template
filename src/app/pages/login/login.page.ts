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

  email:string='';
  password:string='';
  burl:any;
  loginform: FormGroup;
  submitAttempt2:boolean=false;

  constructor(private router:Router,private http: HttpClient,private alertCtrl:AlertController,private formbuilder:FormBuilder,private authservice:AuthService,private loadingCtrl:LoadingController) {
    this.burl='https://altitudeprojects.net/js-mp/user_api';

    this.loginform = formbuilder.group({
      loginname : ['',[Validators.required,<any>Validators.email]],
      loginpassword:['', Validators.required]
    })
   }

   dothelogin(){
    console.log(this.loginform);
    if(this.loginform?.status === 'INVALID'){
      this.submitAttempt2 = true;
      console.log('Error!')
    }else{
      this.submitAttempt2 = false;
      console.log("Success");
      console.log(this.loginform.value);
      this.sendlogin(this.loginform.value);
    }
   }

   sendlogin(user:any){
    this.authservice.authenticate(user);
   }

  ngOnInit() {
  }
  gotoforgot(){
    this.router.navigate(['/forgotpassword']);
  }

  storedata(userstuff:any){
    window.localStorage.setItem('utoken', userstuff.token);
		window.localStorage.setItem('apikey', userstuff.api_key);
		window.localStorage.setItem('uid', userstuff.user_id);
		window.localStorage.setItem('mpid', userstuff.mp_id);
		window.localStorage.setItem('ufname', userstuff.name);
		window.localStorage.setItem('status', userstuff.status);
		window.localStorage.setItem('email', userstuff.email);
		window.localStorage.setItem('address', userstuff.address);
    window.localStorage.setItem('Seller_id', userstuff.seller_id);
		window.localStorage.setItem('walletbalance', userstuff.balance);
		window.localStorage.setItem('phone', userstuff.phone); // suppose to be work in progress
		window.localStorage.setItem('badge', '0');
		window.localStorage.setItem('cartbadge', '0');
		window.localStorage.setItem('cartorderid', '');
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

  // async authenticate() {
  //   const header = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   });
  
  //   const creds = {
  //     input_email: this.email,
  //     input_password: this.password, // corrected property name
  //     device_info: localStorage.getItem('deviceid'),
  //     os_type: 'android'
  //   };
  
  //   console.log(creds);
  
  //   try {
  //     const data = await this.http.post<any>(this.burl + '/user/login', creds, { headers: header }).toPromise();
  //     console.log(data);
  
  //     if (data.status === "success") {
  //       this.storedata(data.data);
  //       this.router.navigate(['/home'])
  //       return data.data;
  //     } else {
  //       console.log('Sorry, you ain\'t getting in');
  //       const alert = await this.alertCtrl.create({

  //         subHeader: data.message,
  //         buttons: ['OK']
  //       });
  //       await alert.present();
        
  //       return false;
  //     }
      
  //   } catch (error) {
  //     console.error(error);
  //     return 'http_error';
  //   }
  // }


 async fetching_products_as_a_guest(){
  this.gotodashboard();
    const loading = await this.loadingCtrl.create({
      message: 'Fetching data',
      // duration: 5000,
    });

    loading.present();
    await loading.dismiss();
    
  }

}
