import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

 public API_URI: string = "https://manga-reader-node.herokuapp.com/";
 //public API_URI: string = "http://localhost:8000/";

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  public createComment(id: string | number, text: string){
    let {token} = this.store.snapshot();
    let data = {token: token.token, manga_id: id, text: text}
    return this.http.post(`${this.API_URI}chapter/comment/create`, data);
  }
  
  public getComments(){
     return this.http.get(`${this.API_URI}chapter/comment/show`);
   } 
  
   public getComment(id: string | number){
     return this.http.get(`${this.API_URI}chapter/comment/${id}`);
   }
  
   public updateComment(id: string | number, updateComment: Comment): Observable<Comment>{
     return this.http.put(`${this.API_URI}chapter/comment/${id}`, updateComment);
   }
  
   public deleteComment(id: string | number){
     return this.http.delete(`${this.API_URI}chapter/comment/${id}`);
   }
}
