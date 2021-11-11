import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../services/user_service/manga.service';
import { CharpterServicesService } from '../../services/charpter-services/charpter-services.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-view-manga',
  templateUrl: './view-manga.page.html',
  styleUrls: ['./view-manga.page.scss'],
})
export class ViewMangaPage implements OnInit {
 
  public mangas: any = [];
  public chapters: any = [];
  public bool: boolean = false;

  constructor(
    private mangaService: MangaService,
    private router: Router,
    private store: Store,
    private charpterService: CharpterServicesService) { }

  ngOnInit() {
    this.getMangas();
    let {manga_id} = this.store.snapshot();
    if(manga_id.manga_id){
      this.charpterService.getCharpter(manga_id.manga_id).subscribe(
        res =>{
          this.chapters = res;
          this.bool = true;
          console.log(this.chapters)
        },
        err => console.log(err)
      )
    }
  }

  public getMangas(){
    this.mangaService.getMangas().subscribe(res =>{
      this.mangas = res;
    },
    err => {
      console.log(err);
    });
  }

  

  /* public createChapter(){
    this.router.navigate(['/charpter-creation']);
    this.bool = true;
    return this.bool 
  } */

}
