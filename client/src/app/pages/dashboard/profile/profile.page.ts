import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UsersService } from '../../../services/user_service/users.service';
import { MangaService } from '../../../services/user_service/manga.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public imgSrc: string;
  public name: string;
  public mangas: any = [];
  public unsubscribe: any = [];
  public manga: any = []

  constructor(
    private store: Store,
    private userService: UsersService,
    private mangaService: MangaService,
    private router: Router,
    private messagesService: MessagesService
    ) { }

  ngOnInit() {
    let {avatar, name, token} = this.store.snapshot();
    this.imgSrc = avatar.avatar;
    console.log(name.name.split('-'));
    this.name = name.name.split('-')[0]+' '+name.name.split('-')[1];
    this.userService.mangasSubscribed(token.token).subscribe(
      res =>{
        this.mangas = res;
        this.getMangas();
      },
      err => console.log(err)
    )
  }

  public unsubscribeManga(id: string | number){
    let {token} = this.store.snapshot();
    this.userService.unsubscribeManga(token.token, id).subscribe(
      res =>{
        this.unsubscribe = res;
        if(this.unsubscribe.verify){
          this.messagesService.presentToast('success','Unsubscribe');
        }else{
          this.messagesService.presentToast('danger','Invalid Unsubscribe');
        }
      },
      err => console.log(err)
    )
  }

  public viewManga(id: string | number){
    this.mangaService.getManga(id).subscribe( res =>{
      this.router.navigate([`/view-manga/${id}`]);
    },
    err => console.log(err))
  } 

  public getMangas(){
    this.mangaService.getMangas().subscribe(res =>{
      if(res){
        this.manga = res;
      }else{
        return;
      }
    },
    err => {
      console.log(err);
    });
  }

}
