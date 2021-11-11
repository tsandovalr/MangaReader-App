import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CharpterServicesService } from '../../../services/charpter-services/charpter-services.service';

@Component({
  selector: 'app-charpter-creation',
  templateUrl: './charpter-creation.page.html',
  styleUrls: ['./charpter-creation.page.scss'],
})
export class CharpterCreationPage implements OnInit {

  public id: any;

  constructor(
    private store: Store,
    private charpterServices: CharpterServicesService) { }

  ngOnInit() {
    let {manga_id} = this.store.snapshot();
    /* this.id = manga_id.manga_id;
    this.charpterServices.getCharpters().subscribe(
      res =>{
        console.log(res);
      },
      err => console.log(err)
    ) */
  }

}
