import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  product_id: any;
  selectedSegment='Related Products';
  public burl:any;
  public singlepro:any;
  public proimages:any;
  public proreviews:any;
  public prorelated:any;
  constructor(private router: Router,private authservice:AuthService,private http:HttpClient) { 
    this.burl='https://altitudeprojects.net/js-mp/user_api';
  }

  ngOnInit() {
    this.getproddetails();
  }

  gotocart(){
    this.router.navigate(['/cart']);
  }

 async getproddetails(){
   
    try{
      const creds={
     
        id:sessionStorage.getItem("Product_id"),
        seller_id:localStorage.getItem("seller_id")
      }
  
      console.log(creds)
  
      const product_detail= await this.http.post<any>('https://altitudeprojects.net/js-mp/user_api/Product/get_single_product', creds).toPromise();
      console.log(product_detail);
  
      if(product_detail.status === 'success')
        {
          this.singlepro = product_detail.data.product_detail;
          this.proimages = product_detail.data.product_images;
          this.proreviews = product_detail.data.reviews;
          this.prorelated = product_detail.data.related_products;
        }
    }catch(error){
      console.log("Error:",error)
    }
  }
}
