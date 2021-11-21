import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from '../../interfaces/chapter';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class ChapterServicesService {

 //public API_URI: string = "https://manga-reader-node.herokuapp.com/";
 public API_URI: string = "http://localhost:8000/";
  
 constructor(
   private http: HttpClient,
   private store: Store) { }

 public saveCharpter(file: File, name: string, manga_id: any, listFiles: any){
  const formData: FormData = new FormData();
  let {token} = this.store.snapshot();
  formData.append('files', file);
  formData.append('token', token.token);
  formData.append('name', name);
  formData.append('manga_id', manga_id);
  formData.append('listFiles', listFiles);
  return this.http.post(`${this.API_URI}chapter`, formData);
}

 public getCharpters(){
   return this.http.get(`${this.API_URI}chapter/show`);
 }

 public getCharpter(id: string | number){
   return this.http.get(`${this.API_URI}chapter/${id}`);
 }

 public updateCharpter(id: string | number, updateCharpter: Chapter): Observable<Chapter>{
   return this.http.put(`${this.API_URI}chapter/${id}`, updateCharpter);
 }

 public deleteCharpter(id: string | number){
   return this.http.delete(`${this.API_URI}chapter/${id}`);
 }
}
