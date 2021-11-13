import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChapterServicesService } from '../../services/chapter-services/chapter-services.service';


@Component({
  selector: 'app-view-chapter',
  templateUrl: './view-chapter.page.html',
  styleUrls: ['./view-chapter.page.scss'],
})
export class ViewChapterPage implements OnInit {

  public id: any;
  public chapters: any = [];

  constructor(
    private store: Store,
    private chapterService: ChapterServicesService
  ) { }

  ngOnInit() {
    let {manga_id} = this.store.snapshot();
    this.id = manga_id.manga_id;
    this.chapterService.getCharpter(this.id).subscribe(
      res =>{
        this.chapters = res;
        console.log(this.chapters.content);
      },
      err => console.log(err)
    ) 
  }

}
