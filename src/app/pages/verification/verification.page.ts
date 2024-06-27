import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {



  constructor(private router: Router,private alertCtrl:AlertController) { 
  
  }


   
  ngOnInit() {
    
  }
 
gotoemail(){
  this.router.navigate(['/forgotpassword']);
}

gotopassword(){
  
  this.router.navigate(['/resetpassword']);
}


}
