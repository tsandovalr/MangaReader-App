import { Component, OnInit } from '@angular/core';
import { Manga } from '../../interfaces/manga';
import { MangaService } from '../../services/user_service/manga.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { SetManga } from '../../store/manga/manga.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-manga-form',
  templateUrl: './manga-form.component.html',
  styleUrls: ['./manga-form.component.scss'],
})
export class MangaFormComponent implements OnInit {

  private manga: Manga = {
    manga_id: 0,
    name: '',
    genres:'',
    description: '',
    manga_photo: '',
    artist: '',
    author: '',
    copyright: '',
    publisher: '',
    message: null,
    publication_date: new Date()
  }

  public edit: Boolean = false;
  public shape: Boolean = null;
  public selectedFiles: FileList;
  public fileName = "";
  public progressInfo = [];
  public data: any = [];
  public url: any ='';

  constructor(private mangaService: MangaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messagesService: MessagesService,
    private store: Store,
    private actionSheetController: ActionSheetController) { }

  ngOnInit(){
    const params = this.activatedRoute.snapshot.params;
    console.log(params.id);
    if(params.id){
      this.mangaService.getManga(params.id).subscribe(
        res =>{
          this.data = res;
          this.manga = this.data.content[0];
          this.url = this.data.url
          this.edit = true;
        },
        err => console.log(err)
      )
    }  
  }

  async getImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose From',
      buttons: [
        {
          text: 'Image URL',
          icon: 'share',
          handler: () => {
            this.activation(1);
          }
        }, {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.activation(2);
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

  public activation(n:number){
    if(n === 1){
      this.shape = true;
      return this.shape
    }else{
      this.shape = false;
      return this.shape
    }
  }

  public selectFiles(event: any) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  public async saveNewManga() {
    console.log(this.selectedFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
     await this.uploadFile(i,this.selectedFiles[i]);
    }
  }


  public async uploadFile(index:number, file: File){
    delete this.manga.publication_date
    this.progressInfo[index] = { value: 0, fileName: file.name };
    
    await this.messagesService.presentLoading("Creating Manga...");
    setTimeout(() =>{
      this.mangaService.saveManga(file, this.manga.manga_id, this.manga.name, this.manga.genres, this.manga.author, this.manga.artist, this.manga.publisher, this.manga.copyright, this.manga.description).subscribe(
        res =>{
          console.log(res)
          this.progressInfo[index].value = Math.round(10*10);
          this.messagesService.presentToast('success','Successful creation');
          this.store.dispatch(new SetManga(this.manga.name))
          this.router.navigate(['/dashboard']);
        },
        err => console.error(err)
      );
    }, 2100)

  }

/*   public async saveNewManga(){
    delete this.manga.publication_date
    delete this.manga.manga_id;

    await this.messagesService.presentLoading("Creating Manga...");
    setTimeout(() =>{
      this.mangaService.saveManga(this.manga).subscribe(
        res =>{
          if(res.message){
            this.messagesService.presentToast('success','Successful creation');
            this.store.dispatch(new SetManga(this.manga.name))
            this.router.navigate(['/dashboard']);
          }else{
            this.messagesService.presentToast('danger','Invalid response');
            return;
          }
        },
        err => console.error(err)
      );
    }, 2100)

  } */


  public async updateManga(){
    delete this.manga.publication_date;

    await this.messagesService.presentLoading("Updating manga...");
    const params = this.activatedRoute.snapshot.params;
    setTimeout(() =>{
      this.mangaService.updateManga(params.id, this.manga).subscribe(
        res =>{
          this.messagesService.presentToast('success','Successful upgrade');
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.messagesService.presentToast('danger','Invalid response');
          console.log(err)
        }
      )
    }, 2100)
  } 

}
