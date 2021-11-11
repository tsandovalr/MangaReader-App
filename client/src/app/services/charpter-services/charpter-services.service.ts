import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Charpter } from '../../interfaces/charpter';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class CharpterServicesService {

public API_URI: string = "https://manga-reader-node.herokuapp.com/";
 //public API_URI: string = "http://localhost:8000/";
  
 constructor(
   private http: HttpClient,
   private store: Store) { }

 public saveCharpter(file: File, name: string, manga_id: any){
  const formData: FormData = new FormData();
  let {token} = this.store.snapshot();
  formData.append('files', file);
  formData.append('token', token.token);
  formData.append('name', name);
  formData.append('manga_id', manga_id);
  return this.http.post(`${this.API_URI}charpter`, formData);
}

 public getCharpters(){
   return this.http.get(`${this.API_URI}charpter/show`);
 }

 public getCharpter(id: string | number){
   return this.http.get(`${this.API_URI}charpter/${id}`);
 }

 public updateCharpter(id: string | number, updateCharpter: Charpter): Observable<Charpter>{
   return this.http.put(`${this.API_URI}charpter/${id}`, updateCharpter);
 }

 public deleteCharpter(id: string | number){
   return this.http.delete(`${this.API_URI}charpter/${id}`);
 }
}
