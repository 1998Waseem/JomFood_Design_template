import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-verifyregcode',
  templateUrl: './verifyregcode.page.html',
  styleUrls: ['./verifyregcode.page.scss'],
})
export class VerifyregcodePage implements OnInit {

  verificationform:FormGroup

  number1:string='';
  number2:string='';
  number3:string='';
  number4:string='';
  number5:string='';
  number6:string='';
  
  submitAttempt3:boolean=false;



  constructor(private router: Router,private http:HttpClient,private alertCtrl:AlertController,private formbuilder:FormBuilder,private authservice:AuthService) { 
    this.verificationform = formbuilder.group({
       confirmcode:['',Validators.required],
       
    })
  }

  saveVerificationCode() {
    const confirmCode = this.verificationform.value.confirmcode;
    console.log("Hello Testing")
    if (confirmCode) {
      localStorage.setItem('Verification_code', confirmCode);
    }
  }
   
  ngOnInit() {
    
  }
  verifycode() {
    if (!this.verificationform.valid) {
      this.submitAttempt3 = true;
      console.log("error!");
    } else {
      this.submitAttempt3 = false;
      console.log("success!");
      this.saveVerificationCode(); 
      console.log(this.verificationform.value);
      this.sendverificationcode(this.verificationform.value)
      this.gotopassword()
    }
  }
  
gotoemail(){
  this.router.navigate(['/forgotpassword']);
}
sendverificationcode(user:any)
{
  this.authservice.onverifycode(user);
}
gotopassword(){
  
  this.router.navigate(['/password']);
}

// async checkCode() {
//   const code = this.number1 + this.number2 + this.number3 + this.number4 + this.number5 + this.number6;
//   if (code.length === 6) {
//     await this.verifyCode(code);
//   }
// }

// async verifyCode(code: string) {
//     const url = 'https://altitudeprojects.net/js-mp/user_api/user/verify_code';
//     const body = { code: code };

//     try{
//       const verificationcode = await this.http.post<any>(url, body).toPromise();
//       console.log("Verification Code is:", verificationcode);

//       if(verificationcode.status == 'success')
//         {
//             console.log("Verification Successfull",verificationcode.message);
//             this.router.navigate(['/password']);
//         }
//         else{
//           console.log("verfication failed:",verificationcode.message);
//         }
//     } catch(error){
//       console.log("Error:",error)
//     }
//   }
}
