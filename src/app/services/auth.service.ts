import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public burl:any;
  
  constructor(private http:HttpClient,private alertCtrl:AlertController,private router:Router, private loadingCtrl:LoadingController) { 
    this.burl='https://altitudeprojects.net/js-mp/user_api';
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
		window.localStorage.setItem('walletbalance', userstuff.balance);
		window.localStorage.setItem('phone', userstuff.phone); // suppose to be work in progress
		window.localStorage.setItem('badge', '0');
		window.localStorage.setItem('cartbadge', '0');
		window.localStorage.setItem('cartorderid', '');
  }
  
  async authenticate(user:any) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const creds = {
      input_email: user.loginname,
      input_password: user.loginpassword, // corrected property name
      device_info: localStorage.getItem('deviceid'),
      os_type: 'android'
    };
  
    console.log(creds);
  
    try {
      const data = await this.http.post<any>(this.burl + '/user/login', creds, { headers: header }).toPromise();
      console.log(data);
  
      if (data.status === "success") {
        this.storedata(data.data);
        this.router.navigate(['/home'])
        const loading = await this.loadingCtrl.create({
          message: 'Fetching data',
          // duration: 5000,
        });
    
        loading.present();
        await loading.dismiss();
        return data.data;
      } else {
        console.log('Sorry, you ain\'t getting in');
        const loading = await this.loadingCtrl.create({
          message: 'Authenticatiing...',
          // duration: 1000,
        });
    
        loading.present();
        await loading.dismiss();
        const alert = await this.alertCtrl.create({

          subHeader: data.message,
          buttons: ['OK']
        });
        await alert.present();
        
        return false;
      }
      
    } catch (error) {
      console.error(error);
      return 'http_error';
    }
  }


  async onCreateuser(user:any) {

    const postdata={
      input_full_name:user.fullname,
      input_email:user.email,
      input_phone:user.phonenumber,
      // passport:this.passport
      }
    console.log(postdata);

   try{
    const signupdata = await this.http.post<any>(this.burl+'/user/register',postdata).toPromise();
    console.log(signupdata)

    if(signupdata.status==='success'){
      this.router.navigate(['/verifyregcode']);
      return signupdata.data;

    }else{
      console.log(signupdata.message);
      const alert = await this.alertCtrl.create({
        subHeader:signupdata.message,
        buttons:['OK']
      });
      await alert.present();
      return false;
      
    } 
   }catch(error){
    console.error(error);
      return 'http_error';
   }


  }

  async onresetpass(user:any) {

    const useremail={
      input_email:user.forgotemail
      // passport:this.passport
      }
    console.log(useremail);

   try{
    const postdata = await this.http.post<any>(this.burl+'/user/forgot_password',useremail).toPromise();
    console.log(postdata)

    if(postdata.status==='success'){
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      this.router.navigate(['/verification']);
      return postdata.data;

    }else{
      console.log(postdata.message);
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      return false;
      
    } 
   }catch(error){
    console.error(error);
      return 'http_error';
   }


  }

  async onverifycode(user:any) {

    const useremail={
      code:user.confirmcode
      // passport:this.passport
      }
    console.log(useremail);

   try{
    const postdata = await this.http.post<any>(this.burl+'/user/verify_code',useremail).toPromise();
    console.log(postdata)

    if(postdata.status==='success'){
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      this.router.navigate(['/password']);
      return postdata.data;

    }else{
      console.log(postdata.message);
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      return false;
      
    } 
   }catch(error){
    console.error(error);
      return 'http_error';
   }


  }

  async setregpass(user:any,ackey:any){
    const creds={
      password:user.regpass2,
      code:ackey
    }
    console.log(creds);
    try{
      const createpassword = await this.http.post<any>(this.burl+'/user/new_set_password',creds).toPromise();
      console.log(createpassword)
  
      if(createpassword.status =='success'){
        const alert = await this.alertCtrl.create({
          subHeader:createpassword.message,
          buttons:['OK']
        });
        await alert.present();
        this.router.navigate(['/verification']);
        return createpassword.data;
  
      }else{
        console.log(createpassword.message);
        const alert = await this.alertCtrl.create({
          subHeader:createpassword.message,
          buttons:['OK']
        });
        await alert.present();
        return false;
        
      } 
     }catch(error){
      console.error(error);
        return 'http_error';
     }
  }


  async onnewpass(user:any,ackey:any) {

    const creds={
      password:user.regpass2,
        // user_id:window.localStorage.getItem('uid'),
        code:ackey
      // passport:this.passport
      }
    console.log(creds);

   try{
    const postdata = await this.http.post<any>(this.burl+'/user/new_set_password',creds).toPromise();
    console.log(postdata)

    if(postdata.status==='success'){
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      this.router.navigate(['/login']);
      return postdata.data;

    }else{
      console.log(postdata.message);
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      return false;
      
    } 
   }catch(error){
    console.error(error);
      return 'http_error';
   }


  }


  async onresetpass1(user:any,ackey:any) {

    const creds={
      input_password:user.resetpass2,
        user_id:window.localStorage.getItem('uid'),
        input_activation_code:ackey
      // passport:this.passport
      }
    console.log(creds);

   try{
    const postdata = await this.http.post<any>(this.burl+'/user/reset_password',creds).toPromise();
    console.log(postdata)

    if(postdata.status==='success'){
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      this.router.navigate(['/login']);
      return postdata.data;

    }else{
      console.log(postdata.message);
      const alert = await this.alertCtrl.create({
        subHeader:postdata.message,
        buttons:['OK']
      });
      await alert.present();
      return false;
      
    } 
   }catch(error){
    console.error(error);
      return 'http_error';
   }


  }

  fetchmostlikedata():Observable<any>{
    var user_id = window.localStorage.getItem('uid');
		var apikey = window.localStorage.getItem('apikey');
		var seller_id = localStorage.getItem("seller_id");
    
    return this.http.get(this.burl+'/dashboard/get_dashboard?user_id=' + user_id + '&seller_id=' + seller_id + '&api_key=' + apikey + '&index=' + '&show=all')
  }
}
