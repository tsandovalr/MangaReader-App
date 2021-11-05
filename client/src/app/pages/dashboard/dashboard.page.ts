import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'; */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router: Router,
    /*private fileTransfer: typeof FileTransfer , */
    ) { }

  ngOnInit() {
  }

  click1(){
    this.router.navigate(['/grid-home'])
  }

  click2(){
    this.router.navigate(['/parallax-home'])
  }


  /* uploadAllImage()
  {
    const fileTransfer:FileTransferObject = this.fileTransfer.create();

    const filetype = '';
    const itemtype = '';

    for(let i=0; i<this.photos.length; i++)
    {

      //Obtener el tipo de archivo.
      filetype = this.itemtypes[i];

      //Obtenemos el mime type dependiendo del tipo recuperado antes.
      switch(filetype)
      {
        case "audio":
        {
          itemtype = 'audio/amr';
          break;
        }
        case 'video':
        {
          itemtype = 'video/quicktime';
          break;
        }
        case 'image':
        {
          itemtype = 'image/jpeg';
          break;
        }
        default:
        {
          return;
        }
      }


      //Fijamos el nombre del archivo.
      var name ='pinglun_' + filetype;
      name = name + '#';
      name = name + this.photosName[i];

      //Seteamos el mime type de la petición.
      let option: FileUploadOptions = {
        fileKey:'file',
        mimeType:itemtype,
        httpMethod:'POST',
        fileName:name
      };

      if(filetype == 'image')
      {
        fileTransfer.upload(this.photos[i], encodeURI(localStorage.getItem('mi_dominio') + "/upload"),option).then((result)=>{

        },(error) => {

        });
      } else {
        fileTransfer.upload(this.fileurls[i], encodeURI(localStorage.getItem('mi_dominio') + "/upload"),option).then((result)=>{

        }, (error) => {

        });
      }
    } 
  }
    */
}
