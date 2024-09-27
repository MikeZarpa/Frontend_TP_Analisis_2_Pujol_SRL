import { Injectable } from '@angular/core';
import { DatosDeConexion } from '../../datos-de-conexion';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/clases/base_de_datos/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService extends DatosDeConexion{

    constructor() {
        super();
    }
    public obtenerTodosLosRolesDelUsuarioPorID(id_usuario:number):Observable<Rol[]>{
        return this.http.get<Rol[]>(this.urlConexionBase+`"/usuario/rol.php?id_usuario=${id_usuario}`);
    }

    public obtenerTodosSinPagina():Observable<Rol[]>{
        return this.http.get<Rol[]>(this.urlConexionBase+"/usuario/rol.php?no_paginar=true");
    }

    public agregarRolesAUsuario(id_usuario:number, roles_id:number[]):Observable<void>{
        const body = {id_usuario, roles_id};
        return this.http.post<void>(this.urlConexionBase+`/usuario/roles_asignados.php`,body);
    }

    public quitarRolesAUsuario(id_usuario:number, roles_id:number[]){
        const body = {id_usuario, roles_id};
        return this.http.delete<void>(this.urlConexionBase + `/usuario/roles_asignados.php`, {
            body: body
          });
    }
}
