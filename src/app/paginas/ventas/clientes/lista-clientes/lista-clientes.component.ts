import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/clases/base_de_datos/comercial/cliente';
import { EnumFiltroCliente, EstadoDelFormulario, TipoDeComparacion } from 'src/app/clases/enums';
import { Filtro } from 'src/app/clases/dtos/filtro';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { ClienteService } from 'src/app/servicios/comercial/cliente.service';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  readonly servicio = inject(ClienteService);
  readonly sesionService = inject(SesionService);
  //Clientes a listar
  clientes:Cliente[]=[];
  //Estados del formulario
  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Base;
  EnumEstadoDelFormulario = EstadoDelFormulario;
  //Util para abrir el modo edicion de producto
  clienteSeleccionado!:Cliente;
  estadoFormularioAnterior!:EstadoDelFormulario;


  //Para la barra de navegación de paginas
  datosPageable: RespuestaPageable<Cliente>|null = null;
  datosDeLaBarra:DatosNavegacionPorPagina|null=null;

  ngOnInit(): void {
    this.buscar();
  }
  
  buscar(){
    this.filtro.comprobar();
    console.log(this.filtro);
    ((this.datosDeLaBarra!=null) ? this.servicio.obtenerTodosConPagina(this.filtro, this.datosDeLaBarra) : this.servicio.obtenerTodosConPagina(this.filtro))
    .subscribe(
      res =>{
        console.log(res);
        this.clientes = res.datos;this.datosPageable = res;});
  }
  crearNuevo(){
    this.estadoFormularioAnterior = this.estadoFormulario;
    this.estadoFormulario = EstadoDelFormulario.Nuevo;
  }
  editar(datos:Cliente){
    this.clienteSeleccionado = datos;
    this.estadoFormularioAnterior = this.estadoFormulario;
    window.setTimeout(()=>{this.estadoFormulario = EstadoDelFormulario.Editando;},100);
  }
  //Desactivamos la edición
  volverABase(){
    // this.estadoFormulario=EstadoDelFormulario.Base;
    this.estadoFormulario = this.estadoFormularioAnterior;
  }
  envioExitoso(){
    // this.estadoFormulario=EstadoDelFormulario.Base;
    this.estadoFormulario = this.estadoFormularioAnterior;  
    this.buscar();
  }
  
  async darDeBaja(datos:Cliente){
    
    const result = await Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas ${(datos.habilitado== 1)?"DAR DE BAJA":"ACTIVAR"} al Cliente: ${datos.apellido || "Sin apellido"} - ${datos.nombre  || "Sin nombre"} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: `${(datos.habilitado== 1)?"BAJA":"ACTIVAR"} `,
      cancelButtonText: 'Cancelar'
    });
      if (!result.isConfirmed) 
        return;
    // Acción a realizar si se hace clic en "Aceptar"
    this.servicio.borrar(datos.id_cliente!)
    .subscribe({
      next:() => {
        this.buscar();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: datos.habilitado== 1 ? 'Cliente DESACTIVADO' : 'Cliente ACTIVADO',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          showClass: {
            popup: 'animated bounceIn' // Agrega la animación "bounceIn"
          },
          hideClass: {
            popup: 'animated bounceOut' // Agrega la animación "bounceOut"
          },
          });

    },
    error:()=>{alert("Ocurrió un error.")}
    });
  }

  barraPageable(datos:DatosNavegacionPorPagina){
    this.datosDeLaBarra=datos;
    this.buscar();
  }

  @Output() elementoSeleccionado = new EventEmitter<Cliente>();
  emitirSeleccion(cliente:Cliente){
    this.elementoSeleccionado.emit(cliente);
  }

  //Filtros

  filtro = new Filtro<EnumFiltroCliente>();
  readonly TipoDeComparacion = TipoDeComparacion;
  readonly EnumFiltroCliente = EnumFiltroCliente;
  constructor(){
    this.filtro.setCantidadFilters(2);
  }
}