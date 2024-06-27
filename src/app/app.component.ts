import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public message: string = 'Hello, Ionic with Angular!';
  public username:any;
  public useremail:any;
  public burl:any;
  public branches:any[]=[];
  selectedBranchId:string='';
  selectedBranch: any;
  selected_branch:any
  disconnectSubscription: any;
  connectSubscription:any;
  mostLikedData:any;
  categories:any;
  catwiseproduct:any
  constructor(private router:Router,private actionSheetController: ActionSheetController,private modalController: ModalController,private http:HttpClient,private authservice:AuthService,private loadingCtrl:LoadingController,private toastController:ToastController,private alertCtrl:AlertController) {
    console.log('AppComponent instantiated');

    this.username = window.localStorage.getItem('ufname');
    this.useremail = window.localStorage.getItem('email');
    this.burl='https://altitudeprojects.net/js-mp/user_api';
   
  }


  ngOnInit(){
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

  // cancelcontinue(){
  //   this.modalController.dismiss();
  // }
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

  

  async disco() {
    this.disconnectSubscription = Network.addListener('networkStatusChange', async (status) => {
      if (!status.connected) {
        console.log('network was disconnected :-(');
        const toast = await this.toastController.create({
          message: 'You have been disconnected from the Internet',
          duration: 2000
        });
        toast.present();
        this.recon();
        this.disconnectSubscription.remove();
      }
    });
  }

  async recon() {
    this.connectSubscription = Network.addListener('networkStatusChange', async (status) => {
      if (status.connected) {
        console.log('network connected!');
        const toast = await this.toastController.create({
          message: 'You have connected to the Internet',
          duration: 2000
        });
        toast.present();
        this.disco();
        this.connectSubscription.remove();
      }
    });
  }
  async presentRadioAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Select Branch',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Yasir Foods',
          value: 'Yasir_Foods',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Yasir Foods (B)',
          value: 'Yasir_Foods_(B)'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Yasur Foods (Al Daud)a',
          value: 'Yasur_Foods_(Al Daud)a'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data: any) => {
            console.log('Confirm Ok with data:', data);
          }
        }
      ]
    });

    await alert.present();
  }
 

}
