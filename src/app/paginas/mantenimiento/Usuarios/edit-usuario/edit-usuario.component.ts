import { EstadoDelFormulario } from 'src/app/clases/enums';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/base_de_datos/Usuario';
import { UsuarioService } from 'src/app/servicios/sesion/UsuarioService/usuario.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { RespuestaDeError } from 'src/app/clases/dtos/RespuestaDeError';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  servicio = inject(UsuarioService)
  edicionForm: FormGroup;  
  cdr = inject(ChangeDetectorRef);
  elFormularioEstaSiendoEnviado=false;
  readonly EstadoDelFormulario = EstadoDelFormulario;

  @Input() estadoDelFormulario = EstadoDelFormulario.Nuevo;
  @Input() datosEdit!:Usuario;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  constructor(){
    this.edicionForm = this.formBuilder.group({
      id_usuario: [null],
      username:["",Validators.required],
      password:["", [Validators.required, Validators.minLength(3)]],
      confirmPassword:[""],
      nombre:["", Validators.required],
      apellido:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
      palabra_secreta:[""],
      habilitado:[true],
    });  
  }
  
  ngOnInit(): void {
    if(this.estadoDelFormulario == EstadoDelFormulario.Editando){
      this.cargarDatos();
    }
       // Forzar la detección de cambios
      window.setTimeout((()=>{this.cdr.detectChanges()}).bind(this),50);
  }

  cargarDatos(){
    this.edicionForm.patchValue({
      id_usuario: this.datosEdit.id_usuario,
      username:this.datosEdit.username,
      nombre:this.datosEdit.nombre,
      apellido:this.datosEdit.apellido,
      email:this.datosEdit.email,
      habilitado:this.datosEdit.habilitado,
      password:"******",
      palabra_secreta:"******",
    })
  }

  enviarFormulario(event:Event){
    event.preventDefault();
    if(this.elFormularioEstaSiendoEnviado)
      return;
    this.elFormularioEstaSiendoEnviado = true;
    if(this.edicionForm.invalid){
      Swal.fire({
        icon:'error',
        title:"Revisa los campos antes de continuar",
        confirmButtonText:"Entendido",
      });
      this.elFormularioEstaSiendoEnviado = false;
    }

    const datos = Object.assign({},this.edicionForm.value);
    let envioARealizar;

    switch(this.estadoDelFormulario){
      case EstadoDelFormulario.Nuevo:
        envioARealizar = this.envioParaCreacionDeUsuario(datos);
        break;
      case EstadoDelFormulario.Editando:
        envioARealizar = this.envioParaEdicionDeUsuario(datos);
        break;
      default:
        throw Error("Estado del formulario no contemplado");
    }

    envioARealizar.subscribe({
      next:()=>{
        FuncionesUtiles.CartelDeOperaciónRealizada();
        this.elFormularioEstaSiendoEnviado=false;
        this.emitirEnvioExitoso();
      },
      error: (error)=>{
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ups...',
          text: 'Ten en cuenta que: \n - No puede usar un email ya guardado\n - No puede usar un nick de usuario ya guardado.\nServidor Responde: '+mensajeDeError.error_msg,
          allowOutsideClick:true,
          backdrop:true,
          confirmButtonText:"Entendido",
          toast: false,
        });
        this.elFormularioEstaSiendoEnviado=false;
      }
    });
  }

  envioParaCreacionDeUsuario(datos:Usuario):Observable<void>{
    return this.servicio.crear_usuario(datos);
  }
  envioParaEdicionDeUsuario(datos:Usuario):Observable<void>{
    return this.servicio.actualizar_usuario(datos);
  }

  passwordsMatch(pass1:string, pass2:string){
    return pass1==pass2;
  }

  volverClick(){
    this.volver.emit();
  }
  emitirEnvioExitoso(){
    this.envioExitoso.emit();
  }
}
