import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HostListener, OnInit ,ElementRef, ViewChild } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
// import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


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
  burl:any;
  catwiseproducts:any;
  topcategory:any;
  constructor(private menuController: MenuController,private router: Router,public alertController: AlertController,private http:HttpClient,private loadingCtrl: LoadingController,private authService: AuthService) {
    this.searchterm = '';
    this.burl='https://altitudeprojects.net/js-mp/user_api';
    sessionStorage.setItem("cat_id",'1');
  }

  ngOnInit(){
    this.gettopcat();
    this.getproducts();
    // this.getcatwiseproducts();

  }
  openMenu() {
    this.menuController.open('sidemenu');
  }
 
  // gotoproductdetails(){
    
  // }

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

// async getmostlikedata(){

//   var user_id=window.localStorage.getItem('uid');
//   var apikey=window.localStorage.getItem('apikey');
//   var seller_id = localStorage.getItem("seller_id");


//   const dashboardata= this.http.get<any[]>(this.burl+'/dashboard/get_dashboard?user_id='+user_id+'&apikey='+apikey).subscribe((data: any) => {
//     console.log(data);
//     this.mostpopular =data.data.most_popular;
//     console.log(data.data.most_popular);
//     localStorage.setItem('Product_id',data.data.most_popular.product_id)

//   },e=>{
//     console.log(e)
//   });
 
// }

gettopcat(){

  var user_id=window.localStorage.getItem('uid');
  var apikey=window.localStorage.getItem('apikey');
  var seller_id = localStorage.getItem("seller_id");

  this.http.get<any[]>(this.burl+'/product/get_categories?user_id='+user_id+ '&apikey='+apikey).subscribe((data: any) => {
    console.log(data);
    this.topcats =data.data.category;
    console.log(data.data.category);
  },e=>{
    console.log(e)
  });
}


getproducts(){
  var cat_id = window.localStorage.getItem('category_id')
  var user_id=window.localStorage.getItem('uid');
  var apikey=window.localStorage.getItem('apikey');
  var Seller_id = localStorage.getItem("Seller_id");
  var type = sessionStorage.getItem("cat_id")

  this.http.get<any[]>(this.burl+'/product/get_products?category_id='+cat_id+'&user_id='+user_id+ '&apikey='+apikey +'&type='+type + '&Seller_id='+Seller_id+ '&show=all').subscribe((data: any) => {
    console.log(data);
    this.catwiseproducts =data.data;
    console.log(data.data);
    var prod_id=sessionStorage.setItem('Product_id',data.data.product_id);
    console.log(prod_id);

  },e=>{
    console.log(e)
  });
}


gotoproductdetails(productId:any) {
  this.router.navigate([`/productdetails/${productId}`]);
  console.log(productId);
}

// gotoproductdetails(x: any) {
//   console.log(x);
//   this.router.navigate(['/productdetail', { param1: x }]);
// }

async gotomostlike(){
  try{
    const data = await this.authService.fetchmostlikedata().toPromise();
  console.log(data);
  if(data.status ==='success'){
    this.topcategory = data.data.top_categories;
    console.log(this.topcategory);
  }
  }catch(error){
    console.log("Error:",error)
  }
}

}
