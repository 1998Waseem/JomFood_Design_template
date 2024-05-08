import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.page.html',
  styleUrls: ['./ordertracking.page.scss'],
})
export class OrdertrackingPage implements OnInit {
  selectedSegment='Trackinginfo'
  constructor(private router:Router) { }

  ngOnInit() {
  }
  gotoreviews(){
    this.router.navigate(['/reviews'])
  }
}
