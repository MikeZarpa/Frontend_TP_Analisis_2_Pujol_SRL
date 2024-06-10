import {  Injectable, inject } from '@angular/core';
import { DatosDeConexion } from './datos-de-conexion';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { TokenService } from './token.service';
import { Rol } from '../clases/base_de_datos/Rol';
import { Usuario } from '../clases/base_de_datos/Usuario';
import { DatosLogin } from '../clases/utiles/DatosLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService extends DatosDeConexion {
  
    usuario:Usuario| null = null;
    
    get elUsuarioEstaCargado():boolean{
      return this.usuario != null;
    }
    

  enProcesoDeInicioDeSesion = false;
  readonly tokenService = inject(TokenService);
  readonly router = inject(Router);
  
  constructor() {
    super();
  }

  iniciarSesion(datos:DatosLogin): Promise<Usuario> {       
    return new Promise((resolve, reject) => {
      this.http.post<Usuario>( this.urlConexionBase +'/verificar_login', datos, {headers:this.headers,observe:'response'})
        .pipe(map((response:HttpResponse<Usuario>)=>{
          //Para el login, separamos el header y el body, el header de la respuesta exitosa lo mandamos al servicio de Token
          const headers = response.headers;
          this.tokenService.capturar_token_desde_headers(headers);
          //El body, que contiene el usuario, será usado por el servicio de Sesion
          return response.body;
      })
  
      ).subscribe({
        next: res => { this.usuario = res; resolve(res!);},
        error: error => reject({message:"Error de inicio de sesión", error: error})
      });
    });     
  }
  /*
   this.http.post<any>('URL_DE_TU_API/login', datos).toPromise()
        .then((response) => {
          resolve(response as Usuario);
        })
        .catch((error) => {
          reject({ message: 'Error en el inicio de sesión', error });
        });
    });*/

  rolesDelUsuario():Rol[]{
    if(this.usuario == null) throw Error("LA SESIÓN NO ESTÁ INICIADA");
      return this.usuario.roles;
  }

  poseeElRol(rol:Rol):boolean{
    if(this.usuario == null) return false;

    const codigoDelRol = rol.codigo;
    const poseeElRolBuscado:boolean = this.usuario?.roles.map( rol => rol.codigo ).includes(codigoDelRol);
    return poseeElRolBuscado;
  }

  cerrarSesion():void{
    this.usuario=null;
    this.tokenService.borrar_token();
    this.router.navigateByUrl("/");
  }
}

