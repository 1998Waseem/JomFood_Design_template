import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private burl='https://system.dilanatandoor.com.my/user_api/user';
  constructor(private http: HttpClient,private alertController: AlertController) { }


  register(userData: any): Observable<any> {
    return this.http.post(`${this.burl}/register`, userData);
  }

  async systemerror() {
		let alert = await  this.alertController.create({
			header: '<img src="assets/img/alert.png">',
			subHeader: 'There is a problem on the server',
			buttons: [
				{
					text:'Ok',
					handler: () => {
					}
				}
			]
		});
		await alert.present();
	}

 signup(userdata:any):Observable<any>{
  return this.http.post(`${this.burl}/register`, userdata);
 }
}