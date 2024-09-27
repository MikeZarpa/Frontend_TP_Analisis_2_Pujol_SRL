import { UsuarioService } from 'src/app/servicios/sesion/UsuarioService/usuario.service';
import {  Injectable, inject } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';


import { Router } from '@angular/router';
import { RolesDelSistema } from '../../clases/enums';
import { TokenService } from './token.service';
import { Usuario } from 'src/app/clases/base_de_datos/Usuario';
import { DatosLogin } from 'src/app/clases/dtos/DatosLogin';
import { Rol } from 'src/app/clases/base_de_datos/Rol';

@Injectable({
  providedIn: 'root'
})
export class SesionService extends DatosDeConexion {
  
    usuario:Usuario| null = null;
    solicitando_datos_del_usuario = false;
    
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
      this.http.post<Usuario>( this.urlConexionBase +'/usuario/verificar_login', datos, {headers:this.headers,observe:'response'})
        .pipe(map((response:HttpResponse<Usuario>)=>{
          //Para el login, separamos el header y el body, el header de la respuesta exitosa lo mandamos al servicio de Token
          const headers = response.headers;
          this.tokenService.capturar_token_desde_headers(headers);
          //El body, que contiene el usuario, será usado por el servicio de Sesion
          return response.body;
      })
  
      ).subscribe({
        next: res => { this.usuario = res; console.log(res); resolve(res!);},
        error: error => {console.log("error",error);reject(error);}
      });
    });     
  }

  rolesDelUsuario():Rol[]{
    if(this.usuario == null) return [];
      return this.usuario.roles;
  }

  poseeElRol(rol_codigo:RolesDelSistema):boolean{
    if(this.usuario == null) return false;
    const codigoDelRol = rol_codigo;
    const poseeElRolBuscado:boolean = this.usuario?.roles.map( rol => rol.codigo ).includes(codigoDelRol);
    return poseeElRolBuscado;
  }

  tieneAlgunRol():boolean{
    if(this.usuario == null) return false;
    return this.usuario?.roles.length > 0;
  }

  cerrarSesion():void{
    this.usuario=null;
    this.tokenService.borrar_token();
    this.router.navigateByUrl("/");
  }

  readonly usuarioService = inject(UsuarioService);

  obtenerDatosDelUsuario(i:number){
    if(this.solicitando_datos_del_usuario) return;
    if(!this.tokenService.esta_logueado()) throw new Error("Debe estar iniciada la sesión para poder acceder a los datos de usuario, uso incorrecto de la función");
    
    this.solicitando_datos_del_usuario=true;

    this.usuarioService.obtenerDatosDelUsuarioPorToken().subscribe({
        next: res => {this.usuario = res; console.log("datos cargados exitosamente");
         this.solicitando_datos_del_usuario=false; console.log(res);
         },
        error: error=> {this.solicitando_datos_del_usuario=false; this.cerrarSesion()}
    });
  }
  usuarioEstaCargado():boolean{
    if(this.tokenService.esta_logueado() && !this.elUsuarioEstaCargado)
      this.obtenerDatosDelUsuario(1);
    return this.usuario!= null;
  }
}

