import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/login';
import { Register } from '../../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 public API_URI: string = "https://manga-reader-node.herokuapp.com/";
 //public API_URI: string = "http://localhost:8000/";
  
  constructor(private http: HttpClient) { }

  public requestRegister(register: Register): Observable<Register>{
    return this.http.post(`${this.API_URI}register`, register);
  }

  public requestLogin(login: Login): Observable<Login>{
    return this.http.post(`${this.API_URI}user/login`, login);
  }

  public logout(token: any, email: string){
    let data = {token, email}
    return this.http.post(`${this.API_URI}user/logout`, data);
  }

  public mangasSubscribed(token: any){
    let data = {token};
    return this.http.post(`${this.API_URI}user/mangas`, data);
  }

  public unsubscribeManga(token: any, manga_id: string | number){
    let data = {token, manga_id}
    return this.http.post(`${this.API_URI}user/unsubscribeManga`, data);
  }
}
