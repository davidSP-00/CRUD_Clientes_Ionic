import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelos/cliente.class';
import { ClienteService } from '../services/cliente.service';
import { Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss'],
})
export class ContenidoComponent implements OnInit {

  clientes:Cliente[]=[];

  constructor(private clienteService:ClienteService,private router:Router,
    public alertController: AlertController,public authService:AuthService) { }

  ngOnInit() {

  }
  verDetalleCliente(cliente:Cliente){
this.router.navigate(['detalle',cliente.id])
  }


  
async alertaEliminarCliente(cliente:Cliente) {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Estas seguro?',
      subHeader: 'Desea borrar a ',
      message: cliente.nombre+' '+cliente.apellido,
      buttons: [
        {
          text: 'No,regresar',
          role: 'cancel',},
        {text:'Si,eliminar',
      handler:()=>{
        this.clienteService.eliminarCliente(cliente.id).subscribe(
          ()=>{
            this.clientes=this.clientes.filter((data:Cliente)=>{
              if(data.id==cliente.id){
                return;
              }
              return data
            })
          }
        );
      }}]
    });

    await alert.present();
  }
  async alertaCerrarSesion() {
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Estas seguro?',
      subHeader: 'Desea cerrar sesion ',
      buttons: [
        {
          text: 'No',
          role: 'cancel',},
        {text:'Si',
      handler:()=>{
        this.authService.cerrarSesion();
        this.router.navigate(['login']);
      }}]
    });

    await alert.present();
  }

  agregarCliente(){
    this.router.navigate(['formulario']);
  }

  public ionViewWillEnter(): void {
    this.clienteService.obtenerClientes().subscribe(data=>{
      this.clientes=data;
    })
    
    
}

editarCliente(id:number){
  this.router.navigate(['formulario',id]);
}

verFoto(id:number){
  this.router.navigate(['foto',id]);

}
}
