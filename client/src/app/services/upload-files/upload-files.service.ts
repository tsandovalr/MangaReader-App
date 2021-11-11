import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store'; 

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

 //public URL_FILES: string = 'http://localhost:8000/';
 public URL_FILES: string = "https://manga-reader-node.herokuapp.com/";

 //Inyeccion de HttpClient
 constructor(private http: HttpClient,
  private store: Store) { }

//Metodo que envia los archivos al endpoint /upload 
 public uploadFile(file: File){
  const formData: FormData = new FormData();
  let {email} = this.store.snapshot();
  formData.append('files', file);
  formData.append('email', email.email);
  return this.http.post(`${this.URL_FILES}upload-files`, formData, new HttpHeaderResponse());
}

 //Metodo para Obtener los archivos
 public getFiles(){
   return this.http.get(`${this.URL_FILES}files/show`);
 }

}
