import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rol } from 'src/app/clases/base_de_datos/Rol';
import { Usuario } from 'src/app/clases/base_de_datos/Usuario';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { RespuestaDeError } from 'src/app/clases/utiles/RespuestaDeError';
import { RolService } from 'src/app/servicios/entidades/UsuarioService/rol.service';
import { UsuarioService } from 'src/app/servicios/entidades/UsuarioService/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-seleccion-rol',
  templateUrl: './popup-seleccion-rol.component.html',
  styleUrls: ['./popup-seleccion-rol.component.css']
})
export class PopupSeleccionRolComponent {
  usuario:Usuario;
  readonly servicioDeRol = inject(RolService);
  readonly servicioDeUsuario = inject(UsuarioService);

  rolesDisponibles:Rol[] = [];
  // usuarioRoles:UsuarioRol[] =[];
  rolesDelUsuario:Rol[] = [];

  //Para el control del estado de carga.
  seCargaronLosRolesDisponibles:boolean = false;
  seCargaronLosRolesDelUsuario:boolean = false;

  //Para los graficos
  rolesQueNoPosee:Rol[] = [];
  rolesQuePosee:Rol[] = [];
  cargaDeDatosFinalizada = false;

  constructor(
    public dialogRef: MatDialogRef<PopupSeleccionRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.usuario = data.usuario;
    this.obtener_la_lista_de_todos_los_roles();
    this.obtener_los_roles_del_usuario();
  }
  obtener_la_lista_de_todos_los_roles(){
    //Obtenemos los roles disponibles.
    this.servicioDeRol.obtenerTodosSinPagina().subscribe({
      next: res => {
        this.rolesDisponibles = res;
        this.seCargaronLosRolesDisponibles = true;
        this.cargar_los_roles_que_posee_y_que_no_posee();
      },
      error: (error) => {
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          title: "Ocurrió un error",
          text: "Ocurrió un error al intentar conseguir los roles. Servidor Responde: "+mensajeDeError.error_msg,
          icon:'error'
        });
      }
    });
  }
  obtener_los_roles_del_usuario(){
    //Obtenemos los roles que ya posee el usuario en cuestion.
    this.servicioDeUsuario.obtenerDatosDelUsuarioPorId(this.usuario.id_usuario).subscribe({
      next: res => {
        this.rolesDelUsuario = res.roles;
        this.seCargaronLosRolesDelUsuario = true;
        this.cargar_los_roles_que_posee_y_que_no_posee();
      },
      error: (error) => {
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          title: "Ocurrió un error",
          text: "Ocurrió un error al intentar conseguir los datos del usuario. Servidor Responde: "+mensajeDeError.error_msg,
          icon:'error'
        });
      }
    });
  }

  agregar(rol:Rol){
    const index = this.rolesQueNoPosee.indexOf(rol);
    if (index !== -1) {
      this.rolesQueNoPosee.splice(index, 1);  //Borramos de la lsita de "No poseidos"
      this.rolesQuePosee.push(rol); //Agregamos a "Poseidos"
    }
  }
  quitar(rol:Rol){
    const index = this.rolesQuePosee.indexOf(rol);
    if (index !== -1) {
      this.rolesQuePosee.splice(index, 1); //Borramos de la lista de Poseidos
      this.rolesQueNoPosee.push(rol)  //Agregamos a "No poseidos"
    }
  }

  cargar_los_roles_que_posee_y_que_no_posee(){
    if(!this.seCargaronLosRolesDelUsuario || !this.seCargaronLosRolesDisponibles)
      return;
    this.rolesQuePosee = this.rolesDelUsuario.slice();

    const array_id_rolesQuePosee = this.rolesQuePosee.map(rol => rol.id_rol);
    this.rolesQueNoPosee = this.rolesDisponibles.filter(
      rol_disponible => !array_id_rolesQuePosee.includes(rol_disponible.id_rol)
    );

    this.cargaDeDatosFinalizada = true;
  }

  salvar(){
    FuncionesUtiles.CartelDeRealizandoOperación();
  
    const id_rolesActualesDelUsuario:number[] = this.rolesDelUsuario.map(rol => rol.id_rol);

    //Buscamos que roles estan en la lista de "Poseidos" que el usuario "aun" no posee.
    //Es decir, identificamos los cambios.
    const id_de_roles_a_agregar:number[]=
      this.rolesQuePosee.map(rol =>{return rol.id_rol;})
      .filter(
        (id)=>{return !id_rolesActualesDelUsuario.includes(id);}
      );

    //Buscamos que roles estan en la lista de "No Poseidos" que el usuario "aun" posee.
    //Es decir, identificamos los cambios.
    const id_de_roles_a_quitar:number[]= this.rolesQueNoPosee
      .map(rol=> rol.id_rol)
      .filter(id=> {return id_rolesActualesDelUsuario.includes(id);});
    
    //Solicitamos la realización de los cambios
    
   if(id_de_roles_a_agregar.length != 0)
    this.servicioDeRol.agregarRolesAUsuario(this.usuario.id_usuario, id_de_roles_a_agregar).subscribe({
      next: ()=>{
        FuncionesUtiles.CartelDeOperaciónRealizada();
      },
      error: (error)=>{
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          title:"Ocurrió un error agregando roles",
          icon:'error',
          text:'Servidor Responde: '+mensajeDeError.error_msg,
          confirmButtonText:"Entendido"
        });
      }
    })
    if(id_de_roles_a_quitar.length != 0)
    this.servicioDeRol.quitarRolesAUsuario(this.usuario.id_usuario, id_de_roles_a_quitar).subscribe({
      next: ()=>{
        FuncionesUtiles.CartelDeOperaciónRealizada();
      },
      error: (error) =>{
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          title:"Ocurrió un error removiendo roles",
          icon:'error',
          text:'Servidor Responde: '+mensajeDeError.error_msg,
          confirmButtonText:"Entendido"
        });
      }
    });
    this.dialogRef.close();
  }
}
