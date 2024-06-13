import { Component, ElementRef, QueryList,HostListener, NgZone, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ScrollDetail } from '@ionic/core';
// import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { debounce } from 'lodash';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('productList', { read: ElementRef })
  productList!: ElementRef;
  @ViewChildren('categorySection', { read: ElementRef })
  categorySections!: QueryList<ElementRef>;
  mostpopular: any;
  searchterm:any;
  allcats:any=[];
  alldashprods:any=[]; 
  selectedCategory: any='';
  resultsnoticesfull:any;
  stickyContent: string = 'All'; // Default content for sticky div
  burl:any;
  catwiseproducts:any;
  topcategory:any;
  selectedCategoryName:string='';
  cartItems;
  singlepro: any;
  cartUpdated: any;
  badgebanner: any;
  globeload: any;
  orderid: any;
  notifyItems: any[]=[];
  events: any;
  grandtotal: any;
  grandtotalorigi: any;
  subtotal: any;
  resultdelivery: any;
  resultcoupon: any;
  sellerguy: any;
  tax_name: any;
  tax_percent: any;
  tax_amount: any;
  tip_btns: any;
  sellerid: any;
  searchcat: any;
  fulladdress: any;
  distance: any;
  proimages: any;
  proreviews: any;
  prorelated: any;
  username:any;
  currentCategory:string='';
  debouncedScroll: any;
  timeoutId: any;
  constructor(private ngZone: NgZone,private menuController: MenuController,private router: Router,public alertController: AlertController,private http:HttpClient,private loadingCtrl: LoadingController,private authService: AuthService,private cdr: ChangeDetectorRef) {
    this.searchterm = '';
    this.burl='https://altitudeprojects.net/js-mp/user_api';
    this.username = window.localStorage.getItem('ufname');
		this.badgebanner = window.localStorage.getItem('cartbadge');
    sessionStorage.setItem("cat_id",'1');
    this.cartItems=0;
    this.singlepro = {
			seller_id: '',
			seller_name: '',
			category_name: '',
			name: '',
			description: '',
			price: '',
			image_url: '',
			average_rating: 0,
		};
   
    
  }
 

  ngOnInit() {
    this.getmostlikedata();
    this.goallcategories();
    this.goalldashprod();
    this.authService.getBranchId().subscribe(branchId => {
      if (branchId) {
        this.updateBranchData(branchId);
      }
    });
    this.debouncedScroll = debounce(this.onScroll, 100);
		window.addEventListener('scroll', this.debouncedScroll);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(event:any) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => this.onScroll(event));
    }, 100);
  }


  ngAfterViewInit() {
    this.productList.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event: any) {
		// Get the scroll position
		const scrollTop = event.target.scrollTop;
		console.log('Scroll Top:', scrollTop);

		// Iterate through topcategories to find the current category
		for (let cat of this.allcats) {
			const element = document.getElementById(cat.name);

			if (element) {
				const offsetTop = element.offsetTop;
				console.log(`Category: ${cat.name}`);

				// Check if the scroll position is within the category's section
				if (scrollTop >= offsetTop) {
					//console.log(`Updating selectedCategoryName to: ${cat.name}`);
					this.selectedCategoryName = cat.name;
					console.log("Selected Category is:", this.selectedCategoryName);

				}
			} else {
				console.warn(`Element with ID ${cat.name} not found.`);
			}
		}
	}

  
  
  
  

 

  


  scrollToCategory(event: any) {
    const categoryName = event.detail.value;
    const categoryIndex = this.allcats.findIndex((cat:any) => cat.name === categoryName);

    if (categoryIndex !== -1) {
      const section = this.categorySections.toArray()[categoryIndex];
      section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openMenu() {
    this.menuController.open('sidemenu');
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

  async updateBranchData(branchId: string) {
    try {
      const mostLikedData = await this.authService.fetchmostlikedata().toPromise();
      if (mostLikedData.status === 'success') {
        this.mostpopular = mostLikedData.data.most_popular;
      }

      const categories = await this.authService.getcategories().toPromise();
      if (categories.status === 'success') {
        this.allcats = categories.data.category;
      }

      const allProducts = await this.authService.get_catwise_products().toPromise();
      if (allProducts.status === 'success') {
        this.alldashprods = allProducts.data;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

async getmostlikedata(){

  var user_id=window.localStorage.getItem('uid');
  var apikey=window.localStorage.getItem('apikey');
  var seller_id = localStorage.getItem("seller_id");


  const dashboardata= this.http.get<any[]>(this.burl+'/dashboard/get_dashboard?user_id='+user_id+'&apikey='+apikey).subscribe((data: any) => {
    console.log(data);
    this.mostpopular =data.data.most_popular;
    console.log("Most popular data:",data.data.most_popular);
    console.log("Product_id is:",sessionStorage.getItem('Product_id'))
  },e=>{
    console.log(e)
  });
 
}
gotoproductdetails(productId:any) {
  sessionStorage.setItem('Product_id',productId)
  this.router.navigate([`/productdetails/${productId}`]);
  console.log(productId);
  

}
async gotomostlike(){
  try{
    const data = await this.authService.fetchmostlikedata().toPromise();
  console.log(data);
  if(data.status ==='success'){
    this.mostpopular = data.data.most_popular;
    console.log("Most like Data is:",this.mostpopular);
    
  }
  }catch(error){
    console.log("Error:",error)
  }
}

async goallcategories(){
  try{
    const data = await this.authService.getcategories().toPromise();
  console.log(data);
  if(data.status ==='success'){
    this.allcats = data.data.category;
    console.log("All categories are:",this.allcats);

  }
  }catch(error){
    console.log("Error:",error)
  }

  console.log("Testing")
}


async goalldashprod(){
  try{
    const data = await this.authService.get_catwise_products().toPromise();
  console.log(data);
  if(data.status ==='success'){
    this.alldashprods = data.data;
    console.log("All categories wise products are:",this.alldashprods);

  }
  }catch(error){
    console.log("Error:",error)
  }

  console.log("Testing")
}


minusitem(result: any) {
  // Decrement the cartItems for the specific product
  result.cartItems = result.cartItems && result.cartItems > 1 ? result.cartItems - 1 : 0
  let cart_badge = result.cartItems
  console.log("result.cartItems;-", result.cartItems, 'cart_badge:-', cart_badge);
  var price = result.price;
  if (Number(result.cartItems) !== 0) {
    // Update the cart for the specific product
    this.addToCart(result, price);
  } else {
    result.cartItems = 0
    this.deleteNotes(result);
    localStorage.setItem('cartbadge', cart_badge)
    // this.events.publish('cartbadge:updated', Date.now());
  }
  this.cdr.detectChanges();
}

plusitem(result: any) {
  // Increment the cartItems for the specific product
  sessionStorage.setItem("Product_id",result.product_id)
  result.cartItems = (result.cartItems || 0) + 1;
  console.log(result.cartItems);
  var price = result.price;
  console.log("Price", price);
  console.log("Result", result);
  this.addToCart(result, price);
  
  this.cdr.detectChanges();
}

addToCart(result: any, price: any) {
  if (window.localStorage.getItem("utoken")) {
    console.log("Single product is :",this.singlepro);
    var standardcart = {
      user_id: window.localStorage.getItem('uid'),
      product_id: result.product_id,
      quantity_id: result.cartItems,
      price: price,
      order_id: '',
      name: this.singlepro.category_name,
      img: this.singlepro.image_url,
      seller_id: this.singlepro.seller_id,
      adjustable: 'yes'
    };

    // Store item to device storage
    this.authService.initializeCart(standardcart).then((data: boolean) => {
      if (data) {
        // Emit event to notify cart update
        this.cartUpdated.emit(Date.now());
        this.badgebanner = window.localStorage.getItem('cartbadge');
        console.log("Badge is:",this.badgebanner);
      }
    });
    // this.router.navigate(['/cart']);
  } else {
    sessionStorage.setItem("route_back_page", 'ProductdetailPage');
    this.router.navigate(['/home']);
  }
}

async deleteNotes(x: any) {
  // debugger
  const loading = await this.loadingCtrl.create({
    //content: 'Updating cart...'
    backdropDismiss: false
  });
  await loading.present();
  this.globeload = loading;

  const standardcart = {
    user_id: window.localStorage.getItem('uid'),
    item_id: x.item_id,
    quantity_id: x.quantity,
    price: x.price,
    order_id: '',
    name: x.product_name,
    img: x.image_url,
    adjustable: 'yes'
  };

  try {
    const data: any = await this.authService.singlewipe(standardcart);
    if (data === true) {
      //update menu counter number
      this.authService.cartBadgeUpdated.emit(Date.now());
      this.authService.viewOrder();
    } else {
      (await this.globeload).dismiss();
    }
  } catch (error) {
    console.error(error);
    (await this.globeload).dismiss();
  }
}
}
