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

/*

this.edicionForm = this.formBuilder.group({
      id_cliente: [null],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      dni: ["", Validators.required],
      cuil_cuit: ["", Validators.required],
      id_cond_iva: [null, Validators.required],
      id_direccion: [null, Validators.required],
      id_pais: [null, Validators.required]
    });
    this.edicionDireccionForm = this.formBuilder.group({
      id_direccion: [null],
      calle: ["", Validators.required],
      altura: "",
      piso: "",
      departamento: "",
      id_localidad: [null, Validators.required]
    });
*/