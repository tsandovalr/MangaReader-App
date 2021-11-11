import { Component, OnInit } from '@angular/core';
import { Charpter } from '../../interfaces/charpter';
import { CharpterServicesService } from '../../services/charpter-services/charpter-services.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-charpter',
  templateUrl: './charpter.component.html',
  styleUrls: ['./charpter.component.scss'],
})
export class CharpterComponent implements OnInit {
  
  public edit: Boolean = false;
  public add: Boolean = false;
  public selectedFiles: FileList;
  public progressInfo = []
  public fileName = "";
  public fileInfos: Observable<any>;
  public files: any = []
  public photo: any;
  public message: string = "";
  private charpter: Charpter ={
    name: '',
    pages: '',
    date: new Date()
  }

  constructor(
    private charpterServices: CharpterServicesService,
    private messagesService: MessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store) { }


  ngOnInit() {}

  public addImage(){
    this.add = true;
    return this.add;
  }

  public selectFiles(event: any) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  public async saveNewCharpter() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
     await this.uploadFiles(i, this.selectedFiles[i]);
    }
  }

 
  public async uploadFiles(index: number, file: File){
    delete this.charpter.date
    let {manga_id} = this.store.snapshot()
    this.progressInfo[index] = { value: 0, fileName: file.name };

    await this.messagesService.presentLoading("Creating charpter...");
    setTimeout(() =>{
      this.charpterServices.saveCharpter(file, this.charpter.name, manga_id.manga_id).subscribe(
        res =>{
          this.files = res;
          console.log(this.files.verify);
          this.progressInfo[index].value = Math.round(10*10);
          this.messagesService.presentToast('success','Successful creation');
          this.router.navigate([`/view-manga/${manga_id}`]);
        },
        err => {
          this.messagesService.presentToast('danger','Invalid');
          console.error(err)
        }
      );
    }, 2100)

  }

  public async updateCharpter(){
    delete this.charpter.date;

    await this.messagesService.presentLoading("Updating charpter...");
    const params = this.activatedRoute.snapshot.params;
    setTimeout(() =>{
      this.charpterServices.updateCharpter(params.id, this.charpter).subscribe(
        res =>{
          this.messagesService.presentToast('success','Successful upgrade');
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.messagesService.presentToast('danger','Invalid response');
          console.log(err)
        }
      )
    }, 2100)
  }
  
  public deleteFile(filename: string) {
    this.charpterServices.deleteCharpter(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.charpterServices.getCharpters();
    });
  }

}
