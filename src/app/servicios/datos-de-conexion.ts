import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";

export class DatosDeConexion {
    //Provee por herencia el enlace Base para la conexión
    protected urlConexionBase:string="http://localhost/Backend/api";
    protected headers = new HttpHeaders().set('Type-Content','aplication/json');

    protected http = inject(HttpClient);
}