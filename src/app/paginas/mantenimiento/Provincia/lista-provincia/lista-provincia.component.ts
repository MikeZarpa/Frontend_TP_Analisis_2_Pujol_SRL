import { Component, inject } from '@angular/core';
import { Pais } from 'src/app/clases/base_de_datos/ubicacion/Pais';
import { Provincia } from 'src/app/clases/base_de_datos/ubicacion/Provincia';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-provincia',
  templateUrl: './lista-provincia.component.html',
  styleUrls: ['./lista-provincia.component.css']
})
export class ListaProvinciaComponent {
  readonly ubicServ = inject(UbicacionService);

  Paises:Pais[]=[];
  Provincias:Provincia[]=[];
  activarEdicion=false;
  editando = false;  
  paisSeleccionado!:Pais;

  datosAEditar:Provincia|null=null;
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
    if(this.paisSeleccionado){
      this.datosAEditar=null;
      this.activarEdicion=false;
      window.setTimeout(()=>{this.editando = true;},500) 
    }
  }
  //Activamos edición
  editar(provincia: Provincia) {
    this.datosAEditar=provincia;
    this.activarEdicion=true;
    window.setTimeout(()=>{this.editando = true;},500)    
  }
  //Desactivamos la edición
  dejarDeEditar(){
    this.editando=false;
  }

  //Si se selecciona un pais.
  paisSeleccion(event: any) {
    const id = event.target.value;
    if (id != null) {
      // Cargamos pais Seleccionado
      this.paisSeleccionado = this.Paises.find((pais) => pais.id_pais == parseInt(id))!;
      this.actualizarListaProvincias(this.paisSeleccionado.id_pais);
    }
  }
  
  actualizarListaProvincias(id=this.paisSeleccionado.id_pais){
    this.ubicServ.obtenerProvinciasPorPaisId(id!).subscribe(
      res => {this.Provincias = res; });
  }

  //Borrar datos
  borrar(provincia: Provincia) {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas borrar "Provincia : " ${provincia.descripcion} ?`,
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
        this.ubicServ.borrarProvincia(provincia.id_provincia!)
        .subscribe(() => {
          this.actualizarListaProvincias();
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
  }
  eventoVolver(){
    this.editando=false;    
  }
  eventoEnvioExitoso(){
    this.editando=false;
    window.setTimeout(this.actualizarListaProvincias.bind(this),1000);
  }
}
