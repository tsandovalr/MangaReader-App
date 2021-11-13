import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../services/user_service/manga.service';
import { ChapterServicesService } from '../../services/chapter-services/chapter-services.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-view-manga',
  templateUrl: './view-manga.page.html',
  styleUrls: ['./view-manga.page.scss'],
})
export class ViewMangaPage implements OnInit {
 
  public manga: any = [];
  public view_manga: any = [];
  public name_chapter: any =[];
  public chapters: any = [];
  public nums: any = [];
  public bool: boolean = false;

  constructor(
    private mangaService: MangaService,
    private router: Router,
    private store: Store,
    private charpterService: ChapterServicesService) { }

  ngOnInit() {
    this.getManga();
    let {manga_id} = this.store.snapshot();
    if(manga_id.manga_id){
      this.getCharpter(manga_id.manga_id);
    }
  }

  public getCharpter(id: any){
    this.charpterService.getCharpter(id).subscribe(
      res =>{
        this.chapters = res;
        this.name_chapter = this.chapters.content;
        console.log(this.name_chapter)
        this.bool = true;
      },
      err => console.log(err)
    )
  }

  public getManga(){
    let {manga_id} = this.store.snapshot();
    if(manga_id.manga_id){
      this.mangaService.getManga(manga_id.manga_id).subscribe(res =>{
        this.manga = res;
        this.view_manga = this.manga.content[0]
      },
      err => {
        console.log(err);
      });
    }
  }

  public deleteChapter(id: string | number){
    let manga_id = id;
    if(manga_id){
      this.charpterService.deleteCharpter(manga_id).subscribe(
        res =>{
          this.getCharpter(manga_id);
        },
        err => console.log(err)
      )
    }
  }

  public viewChapter(id: string | number){
    this.charpterService.getCharpter(id).subscribe( res =>{
      console.log(res)
      this.router.navigate([`/view-chapter/${id}`]);
    },
    err => console.log(err))
  } 
  

  /* public createChapter(){
    this.router.navigate(['/charpter-creation']);
    this.bool = true;
    return this.bool 
  } */

}
