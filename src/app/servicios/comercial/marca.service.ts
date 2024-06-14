import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends DatosDeConexion{

  constructor() {
    super();
  }

  public obtenerTodosSinPagina():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.urlConexionBase+"/marca.php?no_paginar=true");
  }
}
