import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  // singleCharInput: string = '';
  input1: string = '';
  input2: string = '';
  input3: string = '';
  input4: string = '';


  constructor(private router: Router) { }

  ngOnInit() {
  }
gotoemail(){
  this.router.navigate(['/forgotpassword']);
}

// validateInput(event: any) {
//   // Get the entered value
//   let enteredValue = event.target.value;

//   // If the entered value has more than one character, truncate it
//   if (enteredValue.length > 1) {
//     this.singleCharInput = enteredValue.substring(0, 1);
//   }
// }

validateInput(event: any, fieldNumber: number) {
  // Get the entered value
  let enteredValue = event.target.value;

  // If the entered value has more than one character, truncate it
  if (enteredValue.length > 1) {
    switch (fieldNumber) {
      case 1:
        this.input1 = enteredValue.substring(0, 1);
        break;
      case 2:
        this.input2 = enteredValue.substring(0, 1);
        break;
      case 3:
        this.input3 = enteredValue.substring(0, 1);
        break;
      case 4:
        this.input4 = enteredValue.substring(0, 1);
        break;
      default:
        break;
    }
  }
}
}
