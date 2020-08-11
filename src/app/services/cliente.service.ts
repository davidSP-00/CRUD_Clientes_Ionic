import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente.class';
import { Region } from '../modelos/region.class';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url:string="http://192.168.1.9:8080/api";

  headers:HttpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': 'Basic '+ btoa('angularapp:12345')
  });

  constructor(private httpClient:HttpClient) { }


obtenerClientes():Observable<Cliente[]>{

  return this.httpClient.get<Cliente[]>(`${this.url}/clientes`,{headers:this.headers});

}

eliminarCliente(id:number):Observable<void>{


  return this.httpClient.delete<void>(`${this.url}/clientes/${id}`,{headers:this.headers});
}

agregarCliente(cliente:Cliente):Observable<Cliente>{

  return this.httpClient.post<Cliente>(`${this.url}/clientes`,cliente,{headers:this.headers});
}

obtenerRegiones():Observable<Region[]>{
  
  return this.httpClient.get<Region[]>(`${this.url}/clientes/regiones`,{headers:this.headers});
}
obtenerClientePorId(id:number):Observable<Cliente>{

  return this.httpClient.get<Cliente>(`${this.url}/clientes/${id}`,{headers:this.headers});

}
actualizarCliente(cliente:Cliente):Observable<Cliente>{

  return this.httpClient.put<Cliente>(`${this.url}/clientes`,cliente,{headers:this.headers});
}
subirFoto(archivo :Blob,id):Observable<HttpEvent<{}>>{

  let formData=new FormData();
  formData.append("archivo",archivo);
  formData.append("id",id);

  const req = new HttpRequest('POST', `${this.url}/clientes/upload`,formData);



  return this.httpClient.request(req);


}
  
}
