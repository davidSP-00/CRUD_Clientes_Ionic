import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../modelos/cliente.class';
import { ClienteService } from '../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from '../modelos/region.class';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  cliente: Cliente = new Cliente();
  regiones: Region[];
  titulo: string = 'Editar Cliente';


  formulario: FormGroup;

  constructor(private clienteService: ClienteService, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.clienteService.obtenerRegiones().subscribe(
      data => {
        this.regiones = data;
      }
    );

  }
  crearFormulario() {

    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha: ['', Validators.required],
      region: ['', Validators.required]
    })
  }
  enviarFormulario() {
    console.log(this.formulario);
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.cliente.nombre = this.formulario.controls['nombre'].value;
      this.cliente.apellido = this.formulario.controls['apellido'].value;
      this.cliente.email = this.formulario.controls['email'].value;
      this.cliente.createAt = this.formulario.controls['fecha'].value;
      this.cliente.region = this.formulario.controls['region'].value;
    }
    if (this.titulo = 'Añadir Cliente') {
      this.clienteService.agregarCliente(this.cliente).subscribe()
    } else {
      this.clienteService.actualizarCliente(this.cliente).subscribe()

    }
    this.router.navigate(['contenido']);

  }
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((data: any) => {
      this.crearFormulario();
      if (!data.params.id) {
        this.titulo = 'Añadir Cliente';
        return;
      }
      this.clienteService.obtenerClientePorId(data.params.id).subscribe(
        cliente => {
          console.log(cliente);
          this.cliente = cliente;
          this.cargarDataAlFormulario();
        })
    });


  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 == null && o2 == null) {
      return true;
    }
    console.log(o1);
    console.log(o2);
    if (o1 == null || o2 == null) {
      return false;
    } else {
      return o1.id === o2.id;
    }
    /*   return o1===null || o2===null ? false:o1.id===o2.id; */
  }




  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched
  }
  get apellidoNoValido() {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched
  }
  get emailNoValido() {
    return this.formulario.get('email').invalid && this.formulario.get('email').touched
  }
  get fechaNoValido() {
    return this.formulario.get('fecha').invalid && this.formulario.get('fecha').touched
  }
  get regionNoValido() {
    return this.formulario.get('region').invalid && this.formulario.get('region').touched
  }
  cargarDataAlFormulario() {

    this.formulario.reset({
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      email: this.cliente.email,
      fecha: this.cliente.createAt,
      region: this.cliente.region,
    })

  }
}
