import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../services/user_service/manga.service';

@Component({
  selector: 'app-view-manga',
  templateUrl: './view-manga.page.html',
  styleUrls: ['./view-manga.page.scss'],
})
export class ViewMangaPage implements OnInit {
 
  public mangas: any = []

  constructor(
    private mangaService: MangaService,
    private router: Router) { }

  ngOnInit() {
    this.getMangas();
  }

  public getMangas(){
    this.mangaService.getMangas().subscribe(res =>{
      this.mangas = res;
    },
    err => {
      console.log(err);
    });
  }

 /*  public viewManga(id: string | number){
    this.mangaService.getManga(id).subscribe(res =>{
      console.log(res);
    },
    err => console.log(err)
    )
  } */

}
