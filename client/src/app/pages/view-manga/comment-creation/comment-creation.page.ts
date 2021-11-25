import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-comment-creation',
  templateUrl: './comment-creation.page.html',
  styleUrls: ['./comment-creation.page.scss'],
})
export class CommentCreationPage implements OnInit {

  public id: any;
  
  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    let {manga_id} = this.store.snapshot();

    this.id = manga_id.manga_id;
  }

}
