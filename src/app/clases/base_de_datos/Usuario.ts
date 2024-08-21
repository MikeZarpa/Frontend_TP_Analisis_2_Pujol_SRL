import { Rol } from "./Rol";

export interface Usuario{
    id_usuario:number;
    username:string;
    password:undefined|string|null;
    palabra_secreta:undefined|string|null;
    email:string;
    nombre:string;
    apellido:string;
    habilitado:boolean;
    roles:Rol[];
}