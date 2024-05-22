import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
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
  public branches:any;
  selectedBranchId: number | null = null;
  selectedBranch: any;
  selected_branch:any

  constructor(private router:Router,private actionSheetController: ActionSheetController,private modalController: ModalController,private http:HttpClient,private authservice:AuthService) {
    console.log('AppComponent instantiated');

    this.username = window.localStorage.getItem('ufname');
    this.useremail = window.localStorage.getItem('email');
    this.burl='https://altitudeprojects.net/js-mp/user_api';
   
  }


  ngOnInit(){
    this.getbranches();
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

  changeBranch(branch_id:any) {
		if (branch_id !== localStorage.getItem("seller_id")) {
			localStorage.setItem("seller_id", branch_id)
			// localStorage.setItem("seller_name", branch_name)
			this.selected_branch = branch_id;
      console.log("Branch is:",this.selected_branch);
      this.authservice.fetchmostlikedata();
      console.log("Testing");
     
    }
	}

 
  
}
