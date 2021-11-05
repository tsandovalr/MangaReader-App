import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../../services/upload-files/upload-files.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {

  //Lista de archivos seleccionados
  public selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  public progressInfo = []
  //Nombre del archivo para usarlo posteriormente en la vista html
  public fileName = "";
  public fileInfos: Observable<any>;

  constructor(private uploadFilesService: UploadFilesService) { }

  ngOnInit() {
    //this.fileInfos = this.uploadFilesService.getFiles();
  }

  public selectFiles(event: any) {
    this.progressInfo = [];
    //Validación para obtener el nombre del archivo si es uno solo
    //En caso de que sea >1 asigna a fileName length
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

    if(file){
      this.uploadFilesService.uploadFile(file).
      then(res => res.json()).
      then(json =>{
        console.log(json);
      }).catch(err => {
        console.log(err)
      });
      this.progressInfo[index].value = Math.round(10*10);
    }else{
      console.log('Aca se deberia de mostrar Los archivos');
      //this.fileInfos = this.uploadFilesService.getFiles();
    }

  }

  /* public deleteFile(filename: string) {
    this.uploadFilesService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.uploadFilesService.getFiles();
    });
  }
   */
}
