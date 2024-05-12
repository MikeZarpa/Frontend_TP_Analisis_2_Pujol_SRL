import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    // Lógica para enviar el formulario
    //Usar el servicio para enviar formulario
    this.ServicioDeSesion.iniciarSesion(this.loginForm.value)
      .then( 
        res => this.ingresar()
      )
      .catch( (res:{message:string, error:HttpErrorResponse }) => {
        const codigo_error = res.error.error.result.error_id;
        switch(codigo_error){
          case "404": Swal.fire({title:"Credenciales inválidas", icon:"error"});
            break;
          case "500": Swal.fire({title:"Hubo un error con el servidor. Intente nuevamente mas tarde.", icon:"warning"});
            break;
          case "400": Swal.fire({title:"Por favor, rellenar todos los campos.", icon:"error"});
            break;
        }
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
