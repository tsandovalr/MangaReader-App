import { Injectable } from '@angular/core';
/* import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage'; */
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private cameraCtrl: Camera,
    private actionSheetController: ActionSheetController) { }

  onRatingChange(event) {
    console.log('event', event)
  }

  async getImages(photo: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose From',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            console.log('camera clicked');
            this.takePhoto(photo);
          }
        }, {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            console.log('gallery clicked');
            this.gallery(photo);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }



  async gallery(photo: string) {
    try {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 500,
        targetWidth: 500,
        destinationType: this.cameraCtrl.DestinationType.DATA_URL,
        encodingType: this.cameraCtrl.EncodingType.JPEG,
        mediaType: this.cameraCtrl.MediaType.PICTURE,
        sourceType: this.cameraCtrl.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true
      }
      const result = await this.cameraCtrl.getPicture(options);
      photo = `data:image/png;base64,${result}`;
    }
    catch (e) {
      console.error(e);
    }
  } // take Gallary

  async takePhoto(photo: string) {
    try {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 500,
        targetWidth: 500,
        destinationType: this.cameraCtrl.DestinationType.DATA_URL,
        encodingType: this.cameraCtrl.EncodingType.PNG,
        mediaType: this.cameraCtrl.MediaType.PICTURE,
        sourceType: this.cameraCtrl.PictureSourceType.CAMERA,
        correctOrientation: true
      }
      const result = await this.cameraCtrl.getPicture(options);
      photo = `data:image/png;base64,${result}`;
    }
    catch (e) {
      console.error(e);
    }
  }
}