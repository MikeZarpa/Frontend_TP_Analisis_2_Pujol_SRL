import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

const TOKENKEY:string="KEY_TOKEN"
const URL_AUTH_LOGIN:string="/api/login";
const URL_AUTH_RESET:string="/auth/reset";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  //private readonly http:HttpClient = inject(HttpClient);
  private readonly router:Router = inject(Router);

  obtener_token():string|null{
    return localStorage.getItem(TOKENKEY);
  }

  capturar_token_desde_headers(headers:HttpHeaders){
     // Verificar si existe el encabezado de autorización
     if (headers.has('Authorization')) {
      // Obtener el valor del encabezado de autorización
      const authorizationHeader = headers.get('Authorization');

      // Verificar si el encabezado tiene el formato correcto "Bearer token"
      const match = authorizationHeader?.match(/^Bearer\s+(.*)$/);

      if (match) {
          const token = match[1]; // Extraer el token
          this.salvar_token(token); //Guardamos el token en el almacenamiento local
      } else {
          console.error('Formato de encabezado de autorización incorrecto');
      }
    } else {
        console.error('No se proporcionó un encabezado de autorización');
    }
  }

  salvar_token(token:string){
    localStorage.removeItem(TOKENKEY);
    if(token!="")
      localStorage.setItem(TOKENKEY,token);    
  }

  borrar_token(){
    localStorage.removeItem(TOKENKEY);
  }
}