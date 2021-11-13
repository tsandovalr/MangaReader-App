import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChapterServicesService } from '../../../services/chapter-services/chapter-services.service';

@Component({
  selector: 'app-chapter-creation',
  templateUrl: './chapter-creation.page.html',
  styleUrls: ['./chapter-creation.page.scss'],
})
export class ChapterCreationPage implements OnInit {

  public id: any;

  constructor(
    private store: Store,
    private charpterServices: ChapterServicesService) { }

  ngOnInit() {
    let {manga_id} = this.store.snapshot();

    this.id = manga_id.manga_id;
    this.charpterServices.getCharpters().subscribe(
      res =>{
        console.log(res);
      },
      err => console.log(err)
    ) 
  }

  

}
