import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manga } from '../../interfaces/manga';


@Injectable({
  providedIn: 'root'
})
export class MangaService {

 public API_URI: string = "https://manga-reader-node.herokuapp.com/";
 //public API_URI: string = "http://localhost:8000/";
  
  constructor(private http: HttpClient) { }

  public saveManga(manga: Manga): Observable<Manga>{
    return this.http.post(`${this.API_URI}manga/creation`, manga);
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
  

}