import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
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
  constructor(private router:Router,private actionSheetController: ActionSheetController,private modalController: ModalController,private http:HttpClient,private authservice:AuthService,private loadingCtrl:LoadingController,private toastController:ToastController) {
    console.log('AppComponent instantiated');

    this.username = window.localStorage.getItem('ufname');
    this.useremail = window.localStorage.getItem('email');
    this.burl='https://altitudeprojects.net/js-mp/user_api';
   
  }


  ngOnInit(){
    this.getbranches();
    this.recon();
    this.disco();

    if (this.branches.length > 0) {
      const firstBranchId = this.branches[0].id;
      this.authservice.setBranchId(firstBranchId);
      this.changeBranch(firstBranchId);
    }
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


  async getbranches(){
    var url= this.burl + '/seller/get_branches';
  
    try{
      const data:any = await this.http.get(url).toPromise();
      console.log('Get Branches are:',data);
  
      if(data.status == "success"){
        this.branches = data.data;
        console.log("Get Branchesn response:", this.branches);
        localStorage.setItem('seller_id:',this.branches[0].id);
        localStorage.setItem('seller_name:',this.branches[0].full_name);
      }else{
        console.log("Error",data.message);
      }
    }catch(error){
      console.log("Error in get branches:",error);
    }
  }

 async onBranchChange(event: any) {
    const selectedBranchId = event.detail.value;
    console.log("Branch id is:",selectedBranchId);
     this.changeBranch(selectedBranchId);
     this.modalController.dismiss();
    //  window.location.reload();
   
  }

  // async changeBranch(branchId: string) {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Fetching Branch Data',
  //   });

  //   await loading.present();

  //   try {
  //     this.authservice.changeBranch(branchId);
  //     this.mostLikedData = await this.authservice.fetchmostlikedata().toPromise();
  //     this.categories = await this.authservice.getcategories().toPromise();
  //     this.catwiseproduct= await this.authservice.get_catwise_products().toPromise();
  //   } catch (error) {
  //     console.error('Error changing branch:', error);
  //   } finally {
  //     await loading.dismiss();
  //   }
  // }

  async changeBranch(branchId: string) {
  const loading = await this.loadingCtrl.create({
    message: 'Fetching Branch Data',
  });

  await loading.present();

  try {
    this.authservice.changeBranch(branchId);
    this.authservice.setBranchId(branchId);  // Update the branch service
  } catch (error) {
    console.error('Error changing branch:', error);
  } finally {
    await loading.dismiss();
  }
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

 

}
