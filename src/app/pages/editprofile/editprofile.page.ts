import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source:CameraSource.Camera,
      resultType: CameraResultType.Uri
    });
}

async openGallery() {
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos
  });

  // Process selected image
  console.log('Selected image:', image);
}

}
