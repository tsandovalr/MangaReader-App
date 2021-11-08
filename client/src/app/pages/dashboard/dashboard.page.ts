import { Component, OnInit,HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../services/user_service/manga.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @HostBinding('class') classes = 'row'
  public mangas: any = []

  constructor(
    private mangaService: MangaService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getMangas()
  }

  public getMangas(){
    this.mangaService.getMangas().subscribe(res =>{
      this.mangas = res;
    },
    err => {
      console.log(err);
    });
  }

  public deleteManga(id: string | number){
    this.mangaService.deleteManga(id).subscribe(
      res =>{
        console.log(res);
        this.getMangas();
      },
      err => console.log(err)
    )
  }
}
