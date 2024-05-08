import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public message: string = 'Hello, Ionic with Angular!';
  

  constructor(private router:Router,private actionSheetController: ActionSheetController,private modalController: ModalController) {
    console.log('AppComponent instantiated');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Language',
      buttons: [{
        text: 'English',
        handler: () => {
          console.log('English selected');
          // Add logic to set language to English
        }
      }, {
        text: 'Urdu',
        handler: () => {
          console.log('Urdu selected');
          // Add logic to set language to Urdu
        }
      },
      {
        text: 'Continue',
        role: 'button', // This makes the button behave as a cancel button
        handler: () => {
          console.log('Continue button clicked');
          // Add logic for continue action
        }
    },]
    });

    await actionSheet.present();
  }

  gotohome(){
    this.router.navigate(['/home']);
  }

  cancelcontinue(){
    this.modalController.dismiss();
  }
  gotomyorder(){
    this.router.navigate(['/orders']);
  }
  gotocredit(){
    this.router.navigate(['/credit']);
  }
  gotocart(){
    this.router.navigate(['/cart']);
  }
  gotocategory(){
    this.router.navigate(['/searchcategory']);
  }

  gotomessages(){

    this.router.navigate(['/messages']);
  }

  gotoreviews(){
    this.router.navigate(['/reviews']);
  }

  gotohelp(){
    this.router.navigate(['/help']);
  }

  gotocontact(){
    this.router.navigate(['/contact']);
  }
  gototerms(){
    this.router.navigate(['/termsconditions']);
  }

  gotorefund(){
    this.router.navigate(['/refund']);
  }
  gotonews(){
    this.router.navigate(['/newsroom']);
  }
  gototermuse(){
    this.router.navigate(['/termuse']);
  }
  dologout(){
    this.router.navigate(['/login']);
  }
}
