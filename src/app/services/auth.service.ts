import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://192.168.1.9:8080/oauth/token";
  private _usuario:Usuario;
  private _token:string;

  headers:HttpHeaders=new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded',
    'Authorization': 'Basic '+ btoa('angularapp:12345')
  });

  constructor(private httpClient:HttpClient) { }


  public get usuario(){
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario')!=null){
      this._usuario=JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    }
    return new Usuario();

  }
  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token=sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }
  isAuthenticated():boolean{
    let payload=this.obtenerDatosToken(this.token);
    if(payload!=null && payload.user_name &&payload.user_name.length>0 ){
      return true;
    }
    return false;
  }




  login(usuario:Usuario):Observable<any>{
  
    let params=new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);

    return this.httpClient.post<any>(this.url,params.toString(),{headers:this.headers});

  }
  guardarUsuario(accessToken:string){
    let payload=this.obtenerDatosToken(accessToken);
    this._usuario=new Usuario();
    this._usuario.nombre=payload.nombre;
    this._usuario.apellido=payload.apellido;
    this._usuario.email=payload.email;
    this._usuario.username=payload.user_name;
    this._usuario.roles=payload.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }
  obtenerDatosToken(accessToken:string){
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;

  }

  hasRole(role:string):boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }


  cerrarSesion(){
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
  }
  guardarToken(accessToken:string){
    this._token=accessToken;
    sessionStorage.setItem('token',accessToken);
  }


  
}
