import { Component, OnInit } from '@angular/core';
import { Chapter } from '../../interfaces/chapter';
import { ChapterServicesService } from '../../services/chapter-services/chapter-services.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  
  public edit: Boolean = false;
  public add: Boolean = false;
  public selectedFiles: FileList;
  public progressInfo = []
  public fileName = "";
  public fileInfos: Observable<FileList>;
  public files: any = []
  public imagenes: any =[];
  public img: any =[];
  public message: string = "";
  public cont: number = 0;
  private chapter: Chapter ={
    name: '',
    pages: '',
    number: 0,
    date: new Date()
  }

  constructor(
    private charpterServices: ChapterServicesService,
    private messagesService: MessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store) { }


  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.charpterServices.getCharpter(params.id).subscribe(
        res =>{
          this.chapter = res;
          this.edit = false;
        },
        err => console.log(err)
      )
    } 
  }

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
    delete this.chapter.date
    let {manga_id} = this.store.snapshot()
    this.progressInfo[index] = { value: 0, fileName: file.name };

    await this.messagesService.presentLoading("Creating chapter...");
    setTimeout(() =>{
      this.charpterServices.saveCharpter(file, this.chapter.name, manga_id.manga_id, this.selectedFiles.length).subscribe(
        res =>{
          this.files = res;
          if(this.files.verify){
            this.progressInfo[index].value = Math.round(10*10);
            this.messagesService.presentToast('success','Successful creation');
            /* this.router.navigate([`/view-manga/${manga_id}`]); */
            this.router.navigate([`/dashboard`]);
          }else{
            this.messagesService.presentToast('danger','Invalid');
          }
        },
        err => {
          this.messagesService.presentToast('danger','Invalid');
          console.error(err)
        }
      );
    }, 2100)

  }

  public async updateChapter(){
    delete this.chapter.date;

    await this.messagesService.presentLoading("Updating chapter...");
    const params = this.activatedRoute.snapshot.params;
    setTimeout(() =>{
      this.charpterServices.updateCharpter(params.id, this.chapter).subscribe(
        res =>{
          this.edit = true;
          this.messagesService.presentToast('success','Successful upgrade');
          this.router.navigate([`/view-chapter/${params.id}`]);
        },
        err => {
          this.messagesService.presentToast('danger','Invalid response');
          console.log(err)
        }
      )
    }, 2100)
  }
  
}
