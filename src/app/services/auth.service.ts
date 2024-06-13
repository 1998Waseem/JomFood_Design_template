import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController, AnimationKeyFrames } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public burl:any;
  public selected_branch:any;
  globeload: any;
  authservice: any;
  events: any;
  private selectedBranchId = new BehaviorSubject<string | null>(null);
  cartBadgeUpdated = new EventEmitter<number>();
  constructor(private http:HttpClient,private alertCtrl:AlertController,private router:Router, private loadingCtrl:LoadingController,private toastController:ToastController) { 
    this.burl='https://altitudeprojects.net/js-mp/user_api';
    this.globeload=''
  }


  setBranchId(branchId: string) {
    this.selectedBranchId.next(branchId);
  }

  getBranchId(): Observable<string | null> {
    return this.selectedBranchId.asObservable();
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
      const load = await this.loadingCtrl.create({
        message:'Loading...',
      })

      const alert = await this.alertCtrl.create({
        subHeader:signupdata.message,
        buttons:['OK']
      });
      await alert.present();

      load.present();
      await load.dismiss();
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
      const loading = await this.loadingCtrl.create({
        message: 'Loading....',
        // duration: 5000,
      });
  
      loading.present();
      await loading.dismiss();
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
     
    let data = this.http.get(this.burl+'/dashboard/get_dashboard?user_id=' + user_id + '&seller_id=' + seller_id + '&api_key=' + apikey + '&index=' + '&show=all')
    console.log("Data is:",data);
    return data;
  }

 

  getcategories():Observable<any>{
    var user_id=window.localStorage.getItem('uid');
    var apikey=window.localStorage.getItem('apikey');
    var seller_id = localStorage.getItem("seller_id");
    var type = sessionStorage.getItem("cat_id")

    let categories = this.http.get(this.burl+'/product/get_categories?&user_id='+user_id+ '&apikey='+apikey +'&type='+type + '&seller_id='+seller_id+ '&show=all')
    console.log("categories are:",categories);
    return categories;
  }

  get_catwise_products():Observable<any>{
    var cat_id = window.localStorage.getItem('category_id')
  var user_id=window.localStorage.getItem('uid');
  var apikey=window.localStorage.getItem('apikey');
  var seller_id = localStorage.getItem("seller_id");
  var type = sessionStorage.getItem("cat_id")

    let allproducts = this.http.get(this.burl+'/product/get_products?category_id='+cat_id+'&user_id='+user_id+ '&apikey='+apikey +'&type='+type + '&Seller_id='+seller_id+ '&show=all')
    console.log("All products are:",allproducts);
    return allproducts;
  }

  changeBranch(branch_id:any) {
		if (branch_id !== localStorage.getItem("seller_id")) {
			localStorage.setItem("seller_id", branch_id)
			// localStorage.setItem("seller_name", branch_name)
			this.selected_branch = branch_id;
      console.log("Branch is:",this.selected_branch);
      this.fetchmostlikedata().subscribe((data)=>{
        console.log("Data is:",data);
      });

      this.getcategories().subscribe((categories)=>{
        console.log("categories are:",categories);
      });
      
      
      console.log("Testing");
     
    }
	}

  async systemError() {
    const alert = await this.alertCtrl.create({
      header: '<img src="assets/img/alert.png">',
      message: 'There is a problem on the server',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // Handle Ok button action here
          }
        }
      ]
    });
  
    await alert.present();
  }

  async addToServer(x: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      /*  let loading = this.loadingCtrl.create({
          content: 'Adding to cart...'
        });*/
      //loading.present();
      const orderId = window.localStorage.getItem('cartorderid');
  
      if (!orderId) {
        this.addNowfirst(x).then((data:any) => {
          if (data === 'http_error') {
            this.systemError();
            console.log('server error');
            //loading.dismiss();
            resolve(false);
          } else {
            if (data !== false) {
              console.log(data);
              //loading.dismiss();
              resolve(true);
            } else {
              console.log('sorry no records found');
              //loading.dismiss();
              resolve(false);
            }
          }
        });
      } else {
        this.addNow(x).then(data => {
          if (data === 'http_error') {
            this.systemError();
            console.log('server error');
            //loading.dismiss();
            resolve(false);
          } else {
            if (data !== false) {
              console.log(data);
              //loading.dismiss();
              resolve(true);
            } else {
              console.log('sorry no records found');
              //loading.dismiss();
              resolve(false);
            }
          }
        });
      }
    });
  }




  async viewNow() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const oid = parseInt(localStorage.getItem('cartorderid') || '0', 10);
    const apikey = localStorage.getItem('apikey');
    const seller_id = localStorage.getItem('seller_id');
    const url = `${this.burl}/order/get_items_counter/?order_id=${oid}&seller_id=${seller_id}&api_key=${apikey}`;
    
    console.log(url);

    try {
      const data: any = await this.http.get(url, { headers: headers }).toPromise();
      console.log('your cart total');
      console.log(data);
      
      if (data.status === 'success') {
        const countnew = data.data.count;
        if (countnew > 0) {
          localStorage.setItem('cartbadge', countnew.toString());
          return data.data;
        } else {
          localStorage.setItem('cartbadge', countnew.toString());
          localStorage.setItem('cartorderid', data.data.orderid);
          return data.data;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return 'http_error';
    }
  }

  async viewOrder() {
    try {
      // Show loading indicator
      // const loading = await this.loadingController.create({
      //   message: 'Viewing Order...'
      // });
      // await loading.present();
  
      const data = await this.viewNow();
      
      if (data === 'http_error') {
        this.systemError();
        console.log('server error');
        // Dismiss loading indicator
        // await loading.dismiss();
        return false;
      } else {
        if (data !== false) {
          console.log(data);
          // Dismiss loading indicator
          // await loading.dismiss();
          return true;
        } else {
          console.log('Sorry, no records found');
          // Dismiss loading indicator
          // await loading.dismiss();
          return false;
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }
  
  async addtoServer(x: any): Promise<boolean> {
    try {
      const orderid = localStorage.getItem('cartorderid');
  
      if (!orderid) {
        const data:any = await this.addNowfirst(x);
        if (data === 'http_error') {
          this.systemError();
          console.log('server error');
          return false;
        } else {
          if (data !== false) {
            console.log(data);
            return true;
          } else {
            console.log('sorry no records found');
            return false;
          }
        }
      } else {
        const data = await this.addNow(x);
        if (data === 'http_error') {
          this.systemError();
          console.log('server error');
          return false;
        } else {
          if (data !== false) {
            console.log(data);
            return true;
          } else {
            console.log('sorry no records found');
            return false;
          }
        }
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  


  async initializeCart(cartItem: any): Promise<boolean> {
    try {
      const loading = await this.loadingCtrl.create({
        //content: 'Adding product to cart...'
        showBackdrop: false
      });
      await loading.present();
  
      const addToServerResult = await this.addtoServer(cartItem);
      console.log(addToServerResult);
  
      if (addToServerResult) {
        const viewOrderResult = await this.viewOrder();
        console.log(viewOrderResult);
  
        if (viewOrderResult) {
          loading.dismiss();
          console.log(cartItem.name +' is added to cart');
          const toast = await this.toastController.create({
            message: cartItem.name+' is added to cart',
            duration: 2000
          });
          toast.present();
          return true;
        } else {
          loading.dismiss();
          console.log(cartItem.name +' is not added to cart');
          const toast = await this.toastController.create({
            message: cartItem.name+' is not added to cart',
            duration: 2000
          });
          toast.present();
          return false;
        }
      } else {
        loading.dismiss();
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }
  
  

  // async addNowfirst(x:any) {

  //   const creds={
  //     user_id: window.localStorage.getItem('uid'),
	// 		product_id: x.product_id,
	// 		quantity_id: x.quantity_id,
	// 		price: x.price,
	// 		api_key: window.localStorage.getItem('apikey'),
  //     order_id: window.localStorage.getItem('cartorderid'),
	// 		seller_id : localStorage.getItem("seller_id")
  //     }
  //   console.log(creds);

  //  try{
  //   const cartdata = await this.http.post<any>(this.burl+'/Product/ad_to_cart',creds).toPromise();
  //   console.log("Cart Data:",cartdata)

  //   if(cartdata.status==='success'){
  //     console.log('Order ID is:',cartdata.data.orderid);
  //     window.localStorage.setItem('cartorderid',cartdata.data.orderid)
  //     const alert = await this.alertCtrl.create({
  //       subHeader:cartdata.message,
  //       buttons:['OK']
  //     });
  //     await alert.present();
  //     this.router.navigate(['/cart']);
  //     return cartdata.data;

  //   }else{
  //     console.log(cartdata.message);
  //     const alert = await this.alertCtrl.create({
  //       subHeader:cartdata.message,
  //       buttons:['OK']
  //     });
  //     await alert.present();
  //     return false;
      
  //   } 
  //  }catch(error){
  //   console.error(error);
  //     return 'http_error';
  //  }


  // }


  async addNowfirst(x: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const creds = {
      user_id: window.localStorage.getItem('uid'),
      product_id: x.product_id,
      quantity_id: x.quantity_id,
      price: x.price,
      api_key: window.localStorage.getItem('apikey'),
      seller_id: localStorage.getItem("seller_id")
    };

    console.log(creds);

    try {
      const data: any = await this.http.post(`${this.burl}/Product/ad_to_cart`, creds, { headers }).toPromise();
      console.log("Add to cart testing:",data);
      if (data.status === "success") {
        window.localStorage.setItem('cartorderid', data.data.orderid);
        return data.data;
      } else {
        this.presentError(data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      return 'http_error';
    }
  }

  async presentError(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log("error while adding to order");
          }
        }
      ]
    });
    await alert.present();
  }

  async addNow(x: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const creds = {
      user_id: localStorage.getItem('uid'),
      product_id: x.product_id,
      quantity_id: x.quantity_id,
      price: x.price,
      order_id: parseInt(localStorage.getItem('cartorderid') || '0'),
      api_key: localStorage.getItem('apikey'),
      seller_id: localStorage.getItem('seller_id')
    };

    console.log(creds);

    try {
      const data = await this.http.post<any>(`${this.burl}/Product/ad_to_cart`, creds, { headers }).toPromise();
      console.log(data);
      if (data.status === 'success') {
        window.localStorage.setItem('cartorderid', data.data.orderid);
        return data.data;
      } else {
        this.presentError(data.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      return 'http_error';
    }
  }

  updatenow(item: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const creds = new URLSearchParams({
      product_id: item.product_id,
      order_id: item.order_id,
      price: item.price,
      quantity_id: item.quantity_id,
      api_key: window.localStorage.getItem('apikey') || '',
      seller_id: localStorage.getItem("seller_id") || ''
    }).toString();

    console.log(creds);

    return new Promise<any>((resolve, reject) => {
      this.http.post(this.burl + '/order/update_items_cart', creds, { headers: headers }).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 'success') {
            resolve(data.message);
          } else {
            resolve(false);
          }
        },
        (error: any) => {
          console.error(error);
          resolve('http_error');
        }
      );
    });
  }

  updatetoServer(item:any) {
		return new Promise((resolve, reject) => {

			/*  let loading = this.loadingCtrl.create({
				content: 'Deleting cart...'
				});*/
			//loading.present();

			this.updatenow(item).then(data => {
				if (data == 'http_error') {
					this.systemError();
					console.log('server error');
					//loading.dismiss();
					resolve(false);
				} else {
					if (data != false) {
						console.log(data);
						//loading.dismiss();
						resolve(true);
					} else {
						console.log('sorry no records found');
						//loading.dismiss();
						resolve(false);
					}
				}

			});

		});
	}

  async updatecart(cartitem:any) {
		return new Promise<any>(resolve => {
			/*			  let loading = this.loadingCtrl.create({
										 content: 'Updating cart...'
									});
									loading.present(loading);*/

			this.updatetoServer(cartitem).then(async data => {
				console.log(data);
				if (data == true) {


					//menu badge count
					this.viewOrder().then(async data => {
						console.log(data);
						if (data == true) {
							//loading.dismiss();
              const toast = await this.toastController.create({
                message: cartitem.name+' is updated',
                duration: 2000
              });
              toast.present();
							resolve(true);
						} else {
							//loading.dismiss();
              const toast = await this.toastController.create({
                message: cartitem.name+' failed to updated',
                duration: 2000
              });
              toast.present();
							resolve(false);
						}
					});

				} else {
					//loading.dismiss();
					resolve(false);
          const toast = await this.toastController.create({
            message: cartitem.name+' failed to updated',
            duration: 2000
          });
				}
			});

		});
	}

  async delAll(pid: number): Promise<boolean> {
    try {
      const data = await this.delAllnow(pid);
      if (data === 'http_error') {
        this.systemError();
        console.log('server error');
        // this.discoToast(this.translate.instant('Error in deleting an item'));
        const toast = await this.toastController.create({
          message:'Error in deleting an item',
          duration: 2000
        });
        return false;
      } else {
        if (data !== false) {
          console.log(data);
          return true;
        } else {
          console.log('sorry no records found');
          // this.discoToast(this.translate.instant('Error in deleting an item'));
          const toast = await this.toastController.create({
            message:'Error in deleting an item',
            duration: 2000
          });
          return false;
        }
      }
    } catch (error) {
      console.error('Error in deleting all items:', error);
      const toast = await this.toastController.create({
        message:'Error in deleting all items',
        duration: 2000
      });
      return false;
    }
  }
  
  async delAllnow(pid:number): Promise<any> {
    const ids=[];
    ids.push(pid)
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const creds = {
      user_id: window.localStorage.getItem('uid') || '',
      order_id: parseInt(window.localStorage.getItem('cartorderid') || '0', 10),
      id: ids,
      api_key: window.localStorage.getItem('apikey') || '',
      seller_id: localStorage.getItem('seller_id') || ''
    };
    console.log(creds);
  
    try {
      const response: any = await this.http.post(this.burl + '/order/delete_items_cart', creds, { headers: headers }).toPromise();
      console.log(response);
      if (response && response.status === 'success') {
        return response.message;
      } else {
        return false;
      }
    } catch (error) {
      console.error('HTTP error:', error);
      return 'http_error';
    }
  
}

async singlewipe(cartitem:any) {
  debugger
  return new Promise<any>(resolve => {
    /*			  let loading = this.loadingCtrl.create({
                   content: 'Removing product...'
                });
                loading.present(loading);*/

    this.delAll(cartitem.item_id).then(data => {
      console.log(data);
      if (data == true) {


        //menu badge count
        this.viewOrder().then(async data => {
          console.log(data);
          if (data == true) {
            //loading.dismiss();
            const toast = await this.toastController.create({
              message:cartitem.name+'is removed from cart',
              duration: 2000
            });
            resolve(true);
          } else {
            //loading.dismiss();
            const toast = await this.toastController.create({
              message:cartitem.name+'failed to remove to cart',
              duration: 2000
            });
            resolve(false);
          }
        });

      } else {
        //loading.dismiss();
        resolve(false);
      }
    });

  });
}




}
