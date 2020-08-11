import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../modelos/cliente.class';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss'],
})
export class FotoComponent implements OnInit {
  cliente: Cliente ;
  imageData64: any;
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true
  }
  returnpath;

  constructor(
    private camera: Camera,
     private clienteService: ClienteService,
      private activatedRoute: ActivatedRoute,
      public authService:AuthService) { }

  ngOnInit() {
    this.obtenerCliente();

  }
  obtenerCliente(){
    this.activatedRoute.paramMap.subscribe((data: any) => {
      this.clienteService.obtenerClientePorId(data.params.id).subscribe(
        cliente => {
          this.cliente = cliente;
        }
      )
    })
  }

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData64 = imageData;
      this.subirFoto();
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  subirFoto() {
    if (this.imageData64 == null || this.imageData64 == '') {
      return;
    }

    const byteCharacters = atob(this.imageData64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpg" });

    //const file=new File([blob],'D',{ type: "image/jpeg", lastModified: Date.now() });
    this.clienteService.subirFoto(blob, this.cliente.id).subscribe(
      data => {
        this.obtenerCliente();
        console.log(data);
      }, err => {
        console.log(err);
      }
    );

  }

}
