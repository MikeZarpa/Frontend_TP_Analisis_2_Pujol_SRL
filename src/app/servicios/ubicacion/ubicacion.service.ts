import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../datos-de-conexion';
import { Observable } from 'rxjs';
import { Pais } from 'src/app/clases/base_de_datos/ubicacion/Pais';
import { Provincia } from 'src/app/clases/base_de_datos/ubicacion/Provincia';
import { Localidad } from 'src/app/clases/base_de_datos/ubicacion/Localidad';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService extends DatosDeConexion{

  constructor() {
    super();
   }
   
  public obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.urlConexionBase + "/pais");
  }
  /*
  public obtenerPais(id:number): Observable<Pais>{
    return this.http.get<Pais>(this.urlConexionBase + "/pais/"+id);
  }*/
  public obtenerProvinciasPorPaisId(id:number):Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.urlConexionBase+`/provincia?id_pais=${id}`);
  }

  public obtenerLocalidadesPorProvinciaId(id:number):Observable<Localidad[]>{
    return this.http.get<Localidad[]>(this.urlConexionBase+`/localidad?id_provincia=${id}`);
  }
/*
  public obtenerLocalidad(id:number):Observable<Localidad>{
    return this.http.get<Localidad>(this.urlConexionBase + "/localidad/" +id);
  }*/

  //Modificar y Crear
  public saveLocalidad(localidad:Localidad):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/localidad",localidad);
  }
  public saveProvincia(provincia:Provincia):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/provincia",provincia);
  }
  public savePais(pais:Pais):Observable<void>{
    return this.http.post<void>(this.urlConexionBase+"/pais",pais);
  }
  //Borrar
  public borrarLocalidad(id:number):Observable<void>{
    return this.http.delete<void>(this.urlConexionBase+"/localidad?id_localidad="+id);
  }
  public borrarProvincia(id:number):Observable<void>{
    return this.http.delete<void>(this.urlConexionBase+"/provincia?id_provincia="+id);
  }
  /*
  public borrarPais(id:number):Observable<void>{
    return this.http.delete<void>(this.urlConexionBase+"/pais?id_pais="+id);
  }*/
}
