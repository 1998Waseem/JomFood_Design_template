import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HostListener, OnInit ,ElementRef, ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
// import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  mostpopular: any;
  searchterm:any;
  topcats:any;
  resultsnoticesfull:any;
  stickyContent: string = 'All'; // Default content for sticky div

  constructor(private menuController: MenuController,private router: Router,public alertController: AlertController,private http:HttpClient,private DataService:DataService,private loadingCtrl: LoadingController) {
    this.searchterm = '';
  }

  ngOnInit(){
    this.getmostlikedata();
    this.gettopcat();
    // this.getcatwiseproducts();

  }
  openMenu() {
    this.menuController.open('sidemenu');
  }
 
  gotoproductdetails(){
    this.router.navigate(['/productdetails']);
  }

  gotocart(){
    this.router.navigate(['/cart']);
  }
  gotohome(){
    this.router.navigate(['/home']);
  }
  gotoorders(){
    this.router.navigate(['/orders']);
  }

  gotoprofile(){
    this.router.navigate(['/profile']);
  }

  gotocredit(){
    this.router.navigate(['/credit'])
  }

  gotosearch(){
    this.router.navigate(['/search']);
  }

  async presentRadioAlert() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert-bottom',
      header: 'Select an Option',
      inputs: [
        {
          name: 'option1',
          type: 'radio',
          label: 'Option 1',
          value: 'option1',
          checked: true
        },
        {
          name: 'option2',
          type: 'radio',
          label: 'Option 2',
          value: 'option2'
        },
        {
          name: 'option3',
          type: 'radio',
          label: 'Option 3',
          value: 'option3'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Radio data:', data);
          }
        }
      ]
    });

    await alert.present();
  }

getmostlikedata(){

  this.http.get<any[]>('https://system.dilanatandoor.com.my/user_api/dashboard/get_dashboard').subscribe((data: any) => {
    console.log(data);
    this.mostpopular =data.data.most_popular;
    console.log(data.data.most_popular);
  },e=>{
    console.log(e)
  });
 
}

gettopcat(){
  this.http.get<any[]>('https://system.dilanatandoor.com.my/user_api/product/get_categories').subscribe((data: any) => {
    console.log(data);
    this.topcats =data.data.category;
    console.log(data.data.category);
  },e=>{
    console.log(e)
  });
}

// getcatwiseproducts()
// {
//   var category_id = sessionStorage.getItem("product_cat_id");
//   var type = sessionStorage.getItem("cat_id");
//   var apikey = window.localStorage.getItem('apikey');
//   var seller_id = localStorage.getItem("seller_id");
//   var lat = window.localStorage.getItem('lat');
//   var long = window.localStorage.getItem('long');
//   var url = 'https://system.dilanatandoor.com.my/user_api/product/get_products?category_id='+category_id+ '&seller_id='+ seller_id + '&type='+type+'&apikey='+apikey+'&lat='+lat+ '&long='+long;

//   console.log(url);

// }

}
