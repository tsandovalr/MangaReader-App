import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login';
import { UsersService } from '../../services/user_service/users.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Store} from '@ngxs/store'; 
import { SetName } from '../../store/name/name.action';
import { SetToken } from '../../store/token/token.action';
import { SetAvatar } from '../../store/avatar/avatar.action';
import { SetEmail } from '../../store/email/email.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login: Login ={
    password:'',
    email: '',
    verify: null,
    token: '',
    avatar: '',
    user_data: ''
  }

  constructor( private router: Router, 
    private userService: UsersService,
    private store: Store, 
    private messagesService: MessagesService) {}

  ngOnInit() { 
    
  }

  public async loginUser(){
    await this.messagesService.presentLoading("logging in .......");
    let caracteres = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setTimeout(() =>{
      if(this.login.password === '' || this.login.email === '' ){ 
        this.messagesService.presentToast('danger','Fill in the fields correctly');
        return; 
      }else if(caracteres.test(this.login.email)){
        this.userService.requestLogin(this.login).subscribe(
          res => {
            if(res.verify){
              this.store.dispatch(new SetName(res.user_data))
              this.store.dispatch(new SetToken(res.token));
              this.store.dispatch(new SetEmail(res.email));
              this.store.dispatch(new SetAvatar(res.avatar));
              this.messagesService.presentToast('success','Login successfully');
              this.router.navigate(['/dashboard']);
            }
            else{
              this.messagesService.presentToast('danger','Invalid Login');
            }
          },
          err => console.log(err),
        )
      }else{
        this.messagesService.presentToast('danger','Invalid email');
        return;
      }
    }, 2100); 
  }

}
