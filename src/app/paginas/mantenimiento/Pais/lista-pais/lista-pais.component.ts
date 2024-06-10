import { Component, inject } from '@angular/core';
import { Pais } from 'src/app/clases/base_de_datos/ubicacion/Pais';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-lista-pais',
  templateUrl: './lista-pais.component.html',
  styleUrls: ['./lista-pais.component.css']
})
export class ListaPaisComponent {
  readonly ubicServ = inject(UbicacionService);

  Paises:Pais[]=[];
  activarEdicion=false;
  editando = false;


  datosAEditar:Pais|null=null;
  constructor(){
  }

  ngOnInit() {
    this.cargarDatos();
  }

  //Cargamos datos
  cargarDatos(){
    this.ubicServ.obtenerPaises().subscribe(res => this.Paises=res,err=>{console.log("Error al cargar los datos. ¿Servidor ocupado?")});
  }
   //Creamos nuevo
   crearNuevo() {
    // Lógica para crear un nuevo Sexo
    this.datosAEditar=null;
    this.activarEdicion=false;
    window.setTimeout(()=>{this.editando = true;},500) 
  }
  //Activamos edición
  editar(pais: Pais) {
    this.datosAEditar=pais;
    this.activarEdicion=true;
    window.setTimeout(()=>{this.editando = true;},500)  
  }
  //Desactivamos la edición
  dejarDeEditar(){
    this.editando=false;
  }
  //Borrar datos
  /*borrar(pais: Pais) {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas borrar "Pais : " ${pais.descripcion} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: 'Borrar',
      confirmButtonColor:'#FF6347',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Acción a realizar si se hace clic en "Aceptar"
        this.ubicServ.borrarPais(pais.id_pais!)
        .subscribe(() => {
          this.cargarDatos();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Borrado exitoso',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,
            showClass: {
              popup: 'animated bounceIn' // Agrega la animación "bounceIn"
            },
            hideClass: {
              popup: 'animated bounceOut' // Agrega la animación "bounceOut"
            },
            });

      },()=>{alert("Ocurrió un error al borrar.")});
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }*/

  eventoVolver(){
    this.editando=false;    
  }
  eventoEnvioExitoso(){
    this.editando=false;
    window.setTimeout(this.cargarDatos.bind(this),1000);
  }
}
