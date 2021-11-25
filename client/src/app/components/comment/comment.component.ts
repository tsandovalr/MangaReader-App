import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../services/chapter-services/comments.service'; 
import { MessagesService } from '../../services/messages/messages.service';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  public edit: Boolean = false;
  public data: any = [];
  public xdata: any = [];
  public com: any = [];
  public manga: any = [];
  public comment: Comment = {
    text: '',
    token: '',
    date: new Date()
  }

  constructor(
    private store: Store,
    private commentService: CommentsService,
    private messageService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }


  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params.id);
    if(params.id){
      console.log("Este el ID Comment: "+params.id)
      this.commentService.getComment(params.id).subscribe(
        res =>{
          this.xdata = res;
          this.com = this.xdata.content[0];
          console.log(this.xdata)
          this.edit = true;
        },
        err => console.log(err)
      )
    }  
  }

  public addComment(){
    if(this.comment.text === ""){
      this.messageService.presentToast('danger',"Void Comment")
    }else{
      let { manga_id } = this.store.snapshot();
      this.commentService.createComment(manga_id.manga_id, this.comment.text).subscribe(
        res =>{
          this.data = res;
          if(this.data.verify){
            this.messageService.presentToast('success', this.data.text);
            this.router.navigate([`/view-manga/${manga_id.manga_id}`]);
          }else{
            this.messageService.presentToast('danger', this.data.text);
          }
        },
        err => console.log(err)
      )
    }
  }

  public updateComment(){
    delete this.comment.date;
    const params = this.activatedRoute.snapshot.params;
    let { token, manga_id } = this.store.snapshot();
    this.comment.token = token.token;
    this.commentService.updateComment(params.id, this.comment).subscribe(
      res =>{
        this.messageService.presentToast('success','Successful upgrade');
        this.router.navigate([`/view-manga/${params.id}`]);
      },
      err => console.log(err)
    )
  }

}
