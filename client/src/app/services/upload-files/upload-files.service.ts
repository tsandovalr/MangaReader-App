import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent,HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store'; 

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

 //Url obtenida de la variable de enviroments
 //baseUrl = environment.baseUrl;
 public URL_FILES: string = 'http://localhost:8000';

 //Inyeccion de HttpClient
 constructor(private http: HttpClient,
  private store: Store) { }

//Metodo que envia los archivos al endpoint /upload 
 public async uploadFile(file: File){
   const formData: FormData = new FormData();
   let {email} = this.store.snapshot();
   formData.append('files', file);
   formData.append('email', email.email);
   let fetchData = await fetch(`${this.URL_FILES}/upload-files`,{
     method:"POST",
     body: formData,
     credentials:"include",
     mode: 'no-cors'
   });
   return fetchData;
 }

 //Metodo para Obtener los archivos
 public getFiles(){
   return this.http.get(`${this.URL_FILES}/files`);
 }

 /* public upload(file: File): Observable<HttpEvent<any>>{
   const formData: FormData = new FormData();
   formData.append('files', file);
   console.log(file);
   
   const req = new HttpRequest('POST', `${this.URL_FILES}/upload-files`, formData.get('files'), {
     reportProgress: true,
     responseType: 'json'
   });
   //this.http.post(`${this.URL_FILES}/upload-files`, file);
   return this.http.request(req);  
 } */

 //Metodo para borrar los archivos
 /* public deleteFile(filename: string){
   return this.http.get(`${this.URL_FILES}/delete/${filename}`);
 } */
}
