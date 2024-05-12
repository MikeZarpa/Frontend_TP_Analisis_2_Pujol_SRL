import { Rol } from "./Rol";

export interface Usuario{
    id_usuario:number;
    username:string;
    email:string;
    nombre:string;
    apellido:string;
    habilitado:boolean;
    roles:Rol[];
}