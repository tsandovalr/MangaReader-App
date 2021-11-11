import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../../services/upload-files/upload-files.service';
import { Observable } from 'rxjs';
import { CharpterServicesService } from '../../services/charpter-services/charpter-services.service';
import { Store} from '@ngxs/store';
import { Router } from '@angular/router'

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {

  //Lista de archivos seleccionados
  public selectedFiles: FileList;
  public progressInfo = []
  public fileName = "";
  public fileInfos: Observable<any>;
  public files: any = []
  public getFiles: any =[];
  public photo: any;
 // public file: string = 'data:image/png;base64,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';

  constructor(
    private charpterServices: CharpterServicesService,
    private store: Store,
    private router: Router) { }

  ngOnInit() {
   // this.mangaService.getMangas()
  // this.avatar 
   /* let {avatar} = this.store.snapshot();
   console.log(avatar);
   this.avatars = avatar.avatar; */
    this.charpterServices.getCharpters().subscribe(
      res =>{
        this.getFiles = res;
        this.photo= this.getFiles.content;
        //console.log(this.photo);
      },
      err => console.log(err)
    );
  }

  public selectFiles(event: any) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  public uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
       this.upload(i, this.selectedFiles[i]);
    }
  }

  public upload(index: number, file: File) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

  /*   if(file){
     this.charpterServices.saveCharpter(file).subscribe(
       res =>{
         this.files = res;
         console.log(this.files);
         if(this.files.verify){
           this.photo = this.files.content;
           this.progressInfo[index].value = Math.round(10*10);
           console.log(this.photo)
         }
       },
       err => console.log(err)
     ); 
      
     
    }else{
      console.log('Aca se deberia de mostrar Los archivos');
      //this.fileInfos = this.charpterServices.getFiles();
    } */

  }

  /* public deleteFile(filename: string) {
    this.charpterServices.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.charpterServices.getFiles();
    });
  }
   */
}
