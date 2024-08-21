import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/servicios/entidades/UsuarioService/usuario.service';
import { Usuario } from 'src/app/clases/base_de_datos/Usuario';
import { RespuestaDeError } from 'src/app/clases/utiles/RespuestaDeError';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { PopupSeleccionRolComponent } from '../popup-seleccion-rol/popup-seleccion-rol.component';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent {
  readonly servicio = inject(UsuarioService);
  readonly EstadoDelFormulario = EstadoDelFormulario;

  listado:Usuario[]=[];
  
  @Input() estadoDelFormulario = EstadoDelFormulario.Base;


  datosAEditar:Usuario|null= null;
  estadoFormAnterior!:EstadoDelFormulario;

  constructor(){    
  }

  ngOnInit() {
    this.cargarDatos();
  }

  //Cargamos datos
  cargarDatos(){
    this.servicio.obtenerTodosSinPagina().subscribe({
      next:(res)=>{this.listado=res;console.log(res);
      },
      error:(error)=>{
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          icon:'error',
          title:'Ocurrió un error al cargar',
          text:`Servidor Responde: ${mensajeDeError.error_msg}`,
          confirmButtonText:"Entendido",
        });
      }
    });
  }

   //Creamos nuevo
   crearNuevo() {
    this.estadoFormAnterior = this.estadoDelFormulario;
    this.datosAEditar=null;
    window.setTimeout(()=>{this.estadoDelFormulario = EstadoDelFormulario.Nuevo;},100);
  }

  dialog = inject(MatDialog);
  //Activamos edición
  editar(usuario: Usuario) {    
    this.estadoFormAnterior = this.estadoDelFormulario;
    this.datosAEditar=usuario;
    window.setTimeout(()=>{this.estadoDelFormulario = EstadoDelFormulario.Editando;},100);

  }
  
  asignarRoles(usuario: Usuario) {
    const dialogRef = this.dialog.open(PopupSeleccionRolComponent, {
       width: window.innerWidth+'px',
       height: window.innerHeight+'px',
       data:{usuario:usuario,
       }
     });
     return;
  }
  //Borrar datos
  bajaAlta(usuario: Usuario) {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas dar de ${ usuario.habilitado ? "BAJA" : "ALTA"} al usuario de ${usuario.nombre} ${usuario.apellido} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: `${ usuario.habilitado ? "DESACTIVAR" : "ACTIVAR"}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Acción a realizar si se hace clic en "Aceptar"
        this.servicio.alternarEstadoActivacionDeUsuario(usuario.id_usuario!).subscribe(
          {
            next: () => {
              this.cargarDatos();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${ usuario.habilitado ? "BAJA" : "ALTA"} exitosa`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                });
            },
            error: (error) => {
              const mensajeDeError = new RespuestaDeError(error);
              Swal.fire({
                icon:'error',
                title:"Ocurrió un error",
                text:"Servidor Responde: "+mensajeDeError.error_msg,
                confirmButtonText:"Entendido",
              })
            }
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  async cambiarPass(usuario: Usuario){
    let {value:contrasena_del_solicitante} = await Swal.fire({
      title: "Ingresa tu contraseña para continuar",
      input: 'password',
      showCancelButton: true        
    });

    if(!contrasena_del_solicitante)
      contrasena_del_solicitante = "";

    /*Swal.fire({
      title: "Ingresa tu contraseña para continuar",
      input: 'text',
      showCancelButton: true        
    }).then((result) => {
        if (result.value) {
          const contrasena_del_solicitante = result.value;
        } else {
          const contrasena_del_solicitante = "";
        }
    });*/

    let result = await Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas CAMBIAR LA CONTRASEÑA del usuario de ${usuario.nombre} ${usuario.apellido} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: 'CAMBIAR',      
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed)  return;

    let firstPassword: string = '';

    result = await Swal.fire({
      title: 'Ingrese la nueva contraseña',
      html:
        `<input id="swal-input1" class="swal2-input" type="password" placeholder="Ingrese su contraseña">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        firstPassword = (document.getElementById('swal-input1') as HTMLInputElement).value;
        if(firstPassword.length<3){
          Swal.showValidationMessage('Las contraseñas deben tener como mínimo 3 caracteres');
          return false;
        }
        return Swal.fire({
          title: 'Confirme su contraseña',
          html: `<input id="swal-input2" class="swal2-input" type="password" placeholder="Confirme su contraseña">`,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const secondPassword = (document.getElementById('swal-input2') as HTMLInputElement).value;
            if (firstPassword !== secondPassword) {
              Swal.showValidationMessage('Las contraseñas no coinciden');
              return false;
            }
            if(firstPassword.length<3){
              Swal.showValidationMessage('Las contraseñas deben tener como mínimo 3 caracteres');
              return false;
            }
            return secondPassword;
          }
        });
      }
    });

    if (!result.isConfirmed)  {
      Swal.fire('Cambio Cancelado', '', 'warning');
      return;
    };

    //Se confirmó el cambio:
    const nueva_password:string = result.value?.value?.toString() || "";
    if(nueva_password==undefined||nueva_password==""){
      Swal.fire('Error al obtener la contraseña', '', 'warning');
      return;    
    }

    //La contraseña está correcta, aplicamos le cambio
    this.servicio.changePassword(usuario.id_usuario, nueva_password, contrasena_del_solicitante)
    .subscribe({
      next:()=>{
        Swal.fire({
        title: 'Contraseña Cambiada Exitosamente',
        icon: 'success'
      });},
      error: error => {
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          icon:'error',
          title:'Ocurrió un error al intentar dar de baja',
          text: `Servidor Responde: ${mensajeDeError.error_msg}`
        });
      }
    });
  }

  eventoVolver(){
    this.estadoDelFormulario = this.estadoFormAnterior;
  }
  eventoEnvioExitoso(){
    this.estadoDelFormulario = this.estadoFormAnterior;
    window.setTimeout(this.cargarDatos.bind(this),200);
  }
}
