import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RespuestaDeError } from 'src/app/clases/utiles/RespuestaDeError';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent  {
  loginForm!:FormGroup;
  readonly formBuilder = inject(FormBuilder);
  readonly ServicioDeSesion = inject(SesionService);
  readonly router = inject(Router);
  seEstaEnviando = false;

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]]  
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submitForm(event:Event) {
    event.preventDefault();
    this.seEstaEnviando = true;
    // Lógica para enviar el formulario
    //Usar el servicio para enviar formulario
    const datos = this.loginForm.value;
    datos.username = datos.email; //Para probar por username tambien
    this.ServicioDeSesion.iniciarSesion(datos)
      .then( 
        res => this.ingresar()
      )
      .catch( (res) => {
        this.seEstaEnviando = false;
        if(res.error.status == 0){
          Swal.fire({title:"Error desconocido.", text:"¿Servidor apagado o no disponible?", icon:"error"});
        }
        const respuestaError = new RespuestaDeError(res);
        Swal.fire({
          title:"Credenciales inválidas",
          icon:"error",
          text:`Servidor Responde: ${respuestaError.error_msg}`,
        });
        this.borrar_campo_password();
       } );
  }
  ingresar(){
    this.router.navigateByUrl('/bienvenido');
  }
  borrar_campo_password(){
    this.loginForm.patchValue({'password':''});
  }
}
