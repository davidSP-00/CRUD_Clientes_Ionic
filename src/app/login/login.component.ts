import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario.class';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario:Usuario=new  Usuario();

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['contenido']);
    }
  }
  ingresar(){
    this.authService.login(this.usuario).subscribe(
      response=>{
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario=this.authService.usuario;
        this.router.navigate(['contenido']);

      },err=>{
        if(err.status==400){
          this.usuario.username='';
          this.usuario.password='';
        }
        console.log(err);
      }
    )
  }

}
