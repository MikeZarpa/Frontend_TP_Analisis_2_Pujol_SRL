import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { CondicionIva } from 'src/app/clases/base_de_datos/comercial/cond_iva';

@Injectable({
  providedIn: 'root'
})
export class CondicionIvaService extends DatosDeConexion{

  constructor() {
    super();
   }
   public obtenerTodosSinPagina():Observable<CondicionIva[]>{
    return this.http.get<CondicionIva[]>(this.urlConexionBase+"/condicion_iva.php?no_paginar=true");
  }
}
