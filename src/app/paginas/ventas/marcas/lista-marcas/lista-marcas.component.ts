import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MarcaService } from 'src/app/servicios/comercial/marca.service';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { EnumFiltroMarcas, EstadoDelFormulario, TipoDeComparacion } from 'src/app/clases/enums';
import Swal from 'sweetalert2';
import { Filtro } from 'src/app/clases/utiles/filtro';

@Component({
  selector: 'app-lista-marcas',
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.css']
})
export class ListaMarcasComponent implements OnInit {
  readonly servicio = inject(MarcaService);
  readonly SesionService = inject(SesionService);
  readonly EnumEstadoDelFormulario = EstadoDelFormulario;

  marcas:Marca[] = [];
  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Base;

  marcaSeleccionada!:Marca;
  estadoFormularioAnterior!:EstadoDelFormulario;

  //Para la barra de navegación de paginas
  datosPageable: RespuestaPageable<Marca>|null = null;
  datosDeLaBarra:DatosNavegacionPorPagina|null=null;

  ngOnInit(): void {
    this.buscar();    
  }
  buscar(){
    this.filtro.comprobar();
    console.log("Buscando");
    
    let funcionDeBusquedaDelServicio;
    if(this.datosDeLaBarra != null)
      funcionDeBusquedaDelServicio = this.servicio.obtenerTodosConPagina(this.filtro, this.datosDeLaBarra);
    else
      funcionDeBusquedaDelServicio = this.servicio.obtenerTodosConPagina(this.filtro);
    
    funcionDeBusquedaDelServicio.subscribe({
      next: res => {
        console.log(res);
        this.marcas = res.datos;
        this.datosPageable = res;
      }
    });
  }

  crearNuevo(){
    this.estadoFormularioAnterior = this.estadoFormulario;
    this.estadoFormulario = EstadoDelFormulario.Nuevo;
  }

  editar(datos:Marca){
    this.marcaSeleccionada = datos;
    this.estadoFormularioAnterior = this.estadoFormulario;
    window.setTimeout(()=>{this.estadoFormulario = EstadoDelFormulario.Editando},500);
  }
  //Si se cancela la edición, se vuelve al estado anterior
  volverABase(){
    this.estadoFormulario = this.estadoFormularioAnterior;
  }
  //Si la edición o la creación de uno nuevo funciona perfectamente
  envioExitoso(){
    this.estadoFormulario = this.estadoFormularioAnterior;
    this.buscar();
  }
  eventoProvocadoPorBarraPageable(datos:DatosNavegacionPorPagina){
    this.datosDeLaBarra = datos;
    this.buscar();
  }

  //Para la selección de marcas...
  @Output() elementoSeleccionado = new EventEmitter<Marca>();
  emitirSeleccion(marca:Marca){
    this.elementoSeleccionado.emit(marca);
  }

  async darDeBaja(datos:Marca){
    
    const result = await Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas ${(datos.habilitado== 1)?"DAR DE BAJA":"ACTIVAR"} la Marca: ${datos.descripcion} - ${datos.descripcion  || "Sin nombre"} ?`,
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
    this.servicio.borrar(datos.id_marca!)
    .subscribe({
      next:() => {
        this.buscar();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: datos.habilitado== 1 ? 'Marca DESACTIVADA' : 'Marca ACTIVADA',
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

  //Filtros

  filtro = new Filtro<EnumFiltroMarcas>();
  readonly EnumFiltroMarcas = EnumFiltroMarcas;
  readonly TipoDeComparacion = TipoDeComparacion;

  constructor(){
    this.filtro.setCantidadFilters(2);
    //Valor por defecto del filtro
    this.filtro.filters[1].campo = EnumFiltroMarcas.habilitado;
    this.filtro.filters[1].terminosDeBusqueda[0] = '1';
    this.filtro.filters[1].tipoBusqueda = TipoDeComparacion.LITERAL;
  }
}
