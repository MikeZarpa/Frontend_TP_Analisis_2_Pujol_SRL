import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/clases/base_de_datos/comercial/categoria';
import { EnumFiltroCategoriaProducto, EstadoDelFormulario, TipoDeComparacion } from 'src/app/clases/enums';
import { Filtro } from 'src/app/clases/dtos/filtro';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { CategoriaProductoService } from 'src/app/servicios/comercial/categoria_producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categoria-producto',
  templateUrl: './lista-categoria-producto.component.html',
  styleUrls: ['./lista-categoria-producto.component.css']
})
export class ListaCategoriaProductoComponent implements OnInit {
  readonly servicio = inject(CategoriaProductoService);
  //Categorias a listar
  categorias:Categoria[]=[];
  //Estados del formulario
  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Base;
  EnumEstadoDelFormulario = EstadoDelFormulario;
  //Util para abrir el modo edicion de producto
  categoriaSeleccionada!:Categoria;
  estadoFormularioAnterior!:EstadoDelFormulario;


  //Para la barra de navegación de paginas
  datosPageable: RespuestaPageable<Categoria>|null = null;
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
        this.categorias = res.datos;this.datosPageable = res;});
  }
  crearNuevo(){
    this.estadoFormularioAnterior = this.estadoFormulario;
    this.estadoFormulario = EstadoDelFormulario.Nuevo;
  }
  editar(datos:Categoria){
    this.categoriaSeleccionada = datos;
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
  /*
  async darDeBaja(datos:Categoria){
    
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
  }*/

  barraPageable(datos:DatosNavegacionPorPagina){
    this.datosDeLaBarra=datos;
    this.buscar();
  }

  @Output() elementoSeleccionado = new EventEmitter<Categoria>();
  emitirSeleccion(categoria:Categoria){
    this.elementoSeleccionado.emit(categoria);
  }

  //Filtros

  filtro = new Filtro<EnumFiltroCategoriaProducto>();
  readonly TipoDeComparacion = TipoDeComparacion;
  readonly EnumFiltroCliente = EnumFiltroCategoriaProducto;
  constructor(){
    this.filtro.setCantidadFilters(1);
  }
}
