import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manga-creation',
  templateUrl: './manga-creation.page.html',
  styleUrls: ['./manga-creation.page.scss'],
})
export class MangaCreationPage implements OnInit {

  private creation: boolean = false;
 

  constructor() { }

  ngOnInit(){
    
  }

  public creationManga(): boolean{
    this.creation = true;
    return this.creation;
  }

}
