import { Component, inject } from '@angular/core';
import { Localidad } from 'src/app/class/models/localidad';
import { Pais } from 'src/app/class/models/pais';
import { Provincia } from 'src/app/class/models/provincia';
import { UbicacionService } from 'src/app/services/UbicacionService/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-localidad',
  templateUrl: './lista-localidad.component.html',
  styleUrls: ['./lista-localidad.component.css']
})
export class ListaLocalidadComponent {
  readonly ubicServ = inject(UbicacionService);

  Paises:Pais[]=[];
  Provincias:Provincia[]=[];
  Localidades:Localidad[]=[];
  activarEdicion=false;
  editando = false;  
  provinciaSeleccionada!:Provincia;

  datosAEditar:Localidad|null=null;
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
  crearNuevo(id:any) {
    if(id!=null){
      this.provinciaSeleccionada = this.Provincias.filter(provincia => provincia.id = id)[0];
      this.datosAEditar=null;
      this.activarEdicion=false;
      window.setTimeout(()=>{this.editando = true;},500) 
    }
  }
  //Activamos edición
  editar(localidad: Localidad) {
    this.provinciaSeleccionada = localidad.provincia!;
    this.datosAEditar=localidad;
    this.activarEdicion=true;
    window.setTimeout(()=>{this.editando = true;},500)    
  }
  //Desactivamos la edición
  dejarDeEditar(){
    this.editando=false;
  }

  //Si se selecciona un pais.
  paisSeleccion(evento:any,inputProvincia:any){
    let id = evento.target.value;
    if(id!=null)
      this.ubicServ.obtenerProvinciasPorPaisId(id).subscribe(
        res => {
          this.Provincias = res;
          inputProvincia.value="";
           this.Localidades=[]; });
  }
  //Si se selecciona una provincia
  provinciasSeleccion(evento:any,provincias:Provincia[]){    
    let id = evento.target.value;
    //Cargamos la provincia seleccionada
    if(id!=null){
      this.provinciaSeleccionada = provincias.find(provincia => provincia.id === parseInt(id))!;
      this.actualizarListaLocalidades(this.provinciaSeleccionada.id);
    }    
  }

  actualizarListaLocalidades(id=this.provinciaSeleccionada.id){
    this.ubicServ.obtenerLocalidadesPorProvinciaId(id!).subscribe(
      res => {this.Localidades = res; });
  }

  //Borrar datos
  borrar(localidad: Localidad) {
    Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas borrar "Localidad : " ${localidad.nombre} ?`,
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
        this.ubicServ.borrarLocalidad(localidad.id!)
        .subscribe(() => {
          this.actualizarListaLocalidades();
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
    window.setTimeout(this.actualizarListaLocalidades.bind(this),1000);
  }
}
