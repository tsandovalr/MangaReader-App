import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/register';
import { UsersService } from '../../services/user_service/users.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Store} from '@ngxs/store'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public imgSrc = "https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png";

  public register: Register = {
    name: '',
    lastname:'',
    email: '',
    password: '',
    avatar: this.imgSrc,
    registration_date: new Date(),
    message: null
  }

  constructor(
    private router: Router,
    private userService: UsersService,
    private messageService: MessagesService) { }

  ngOnInit() { }


 public async registerUser(){
    delete this.register.registration_date;

    await this.messageService.presentLoading("Creating account...");

    let caracteres = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setTimeout(() =>{
      if(this.register.name === '' || this.register.lastname === '' || this.register.password === '' || this.register.email === ''){ 
        this.messageService.presentToast('danger','Fill in the fields correctly');
        return; 
      }else if(caracteres.test(this.register.email)){
        this.userService.requestRegister(this.register).subscribe(
          res=>{ 
            if(res.message){
              this.messageService.presentToast('success','Successful registration');
              this.router.navigate(['/login']);
            }else{
              this.messageService.presentToast('danger','Invalid response');
              return;
            }
          },
          err => console.log(err)
        );
      }else{
        this.messageService.presentToast('danger','Invalid email');
        return;
      } 
    },2100)

 }


}
