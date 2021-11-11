import { Component, OnInit } from '@angular/core';
import { Manga } from '../../interfaces/manga';
import { MangaService } from '../../services/user_service/manga.service';
import { CameraService } from '../../services/user_service/camera.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private mangaService: MangaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cameraService: CameraService,
    private messagesService: MessagesService,
    private store: Store) { }

  ngOnInit(){
    const params = this.activatedRoute.snapshot.params;
    console.log(params.id);
    if(params.id){
      this.mangaService.getManga(params.id).subscribe(
        res =>{
          this.manga = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }  
  }

  public async getImages(){
    await this.cameraService.getImages(this.manga.manga_photo);
  }

  public async saveNewManga(){
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

  }

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
