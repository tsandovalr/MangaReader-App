import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/login';
import { Register } from '../../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public API_URI: string = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  public requestRegister(register: Register): Observable<Register>{
    return this.http.post(`${this.API_URI}/register`, register);
  }

  public requestLogin(login: Login): Observable<Login>{
    return this.http.post(`${this.API_URI}/user/login`, login);
  }

}
