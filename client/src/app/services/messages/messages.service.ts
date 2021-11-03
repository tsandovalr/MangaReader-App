import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastController: ToastController, public loadingController: LoadingController) { }

  public async presentToast(color:string, mess: string) {
    const toast = await this.toastController.create({
      color: color,
      message: mess,
      duration: 1000
    });
    toast.present();
  }

  public async presentLoading(loadingMessage: string){
    const loading = await this.loadingController.create({
      message:loadingMessage,
      animated: true,
      translucent: true,
      duration:2000,
      spinner: "bubbles",
      id: "loadingComponent"
    })
    await loading.present();
  }
}
