import { MetodoPago } from './../../clases/base_de_datos/comercial/metodo_pago';
import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService extends DatosDeConexion{

  constructor() {
    super();
   }
   public obtenerTodosSinPagina():Observable<MetodoPago[]>{
    return this.http.get<MetodoPago[]>(this.urlConexionBase+"/metodo_pago.php?no_paginar=true");
  }
}
