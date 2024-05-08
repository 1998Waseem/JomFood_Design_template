import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchcategory',
  templateUrl: './searchcategory.page.html',
  styleUrls: ['./searchcategory.page.scss'],
})
export class SearchcategoryPage implements OnInit {

  public data = [
    'Beef Samosa',
    'Biryani',
    'Lamb Shank',
    'Mandi & Kabsa',
    'Pulao Rice',
    'BBQ',
    'Naan',
    'Daal',
    'Desserts',
    'Fresh Milk Drinks',
    'Lassi',
    'Shakes',
    'Family Deals',
    'Pizza',
    'Shawarma',
    'Appetizers',
    'Handi',
    'Beef Samosa',

  ];

  public results = [...this.data];


  constructor() { }

  ngOnInit() {
  }
  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }
}
