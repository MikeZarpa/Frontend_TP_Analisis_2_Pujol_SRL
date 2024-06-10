import { Localidad } from "../ubicacion/Localidad";

export class Direccion{
    id_direccion:number|null = null;
    calle:string = "";
    altura:string = "";
    piso:string = "";
    departamento:string = "";
    id_localidad:number|null = null;
    localidad:Localidad|null = null;
}