import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manga } from '../../interfaces/manga';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

 public API_URI: string = "https://manga-reader-node.herokuapp.com/";
 //public API_URI: string = "http://localhost:8000/";
  
  constructor(
    private http: HttpClient,
    private store: Store) { }

 /*  public saveManga(manga: Manga): Observable<Manga>{
    return this.http.post(`${this.API_URI}manga/creation`, manga);
  } */

  public saveManga(file: File, manga_id: any, name: string,  genres: string, author: string, artist: string, publisher: string, copyright: string, description: string){
    const formData: FormData = new FormData();
    let {token} = this.store.snapshot();
    formData.append('files', file);
    formData.append('token', token.token);
    formData.append('name', name);
    formData.append('manga_id', manga_id);
    formData.append('genres', genres);
    formData.append('author', author);
    formData.append('artist', artist);
    formData.append('publisher', publisher);
    formData.append('description', description);
    formData.append('copyright',copyright);
    return this.http.post(`${this.API_URI}manga/creation`, formData);
  }

  public getMangas(){
    return this.http.get(`${this.API_URI}manga/show`)
  }

  public getManga(id: string | number){
    return this.http.get(`${this.API_URI}manga/${id}`)
  }

  public updateManga(id: string | number, updateManga: Manga): Observable<Manga>{
    return this.http.put(`${this.API_URI}manga/${id}`, updateManga);
  }

  public deleteManga(id: string | number){
    return this.http.delete(`${this.API_URI}manga/${id}`)
  }

  public toSubcribe(manga_id: string | number, token:any){
    let objet ={manga_id, token}
    return this.http.post(`${this.API_URI}manga/tosubcribe`, objet);
  }
  

}