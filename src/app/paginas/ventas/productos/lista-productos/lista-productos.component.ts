import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { EnumFiltroProductos, EstadoDelFormulario, TipoDeComparacion } from 'src/app/clases/enums';
import { Filtro } from 'src/app/clases/dtos/filtro';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { ProductoService } from 'src/app/servicios/comercial/producto.service';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  readonly servicio = inject(ProductoService);
  readonly sesionService = inject(SesionService);
  //Productos a listar
  productos:Producto[]=[];
  //Estados del formulario
  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Base;
  EnumEstadoDelFormulario = EstadoDelFormulario;
  estadoFormularioAnterior!:EstadoDelFormulario;
  //Util para abrir el modo edicion de producto
  productoSeleccionado!:Producto;
  //Para la emisión de la seleccion de busqueda
  @Output() elementoSeleccionado = new EventEmitter<Producto>();


  //Para la barra de navegación de paginas
  datosPageable: RespuestaPageable<Producto>|null = null;
  datosDeLaBarra:DatosNavegacionPorPagina|null=null;

  ngOnInit(): void {
    this.buscar();    
  } 
  buscar(){
    this.filtro.comprobar();
    ((this.datosDeLaBarra!=null) ? this.servicio.obtenerTodosConPagina(this.filtro, this.datosDeLaBarra) : this.servicio.obtenerTodosConPagina(this.filtro))
    .subscribe(
      res =>{
        console.log(res);
        this.productos = res.datos;this.datosPageable = res;});
  }
  crearNuevo(){
    this.estadoFormularioAnterior = this.estadoFormulario;
    this.estadoFormulario = EstadoDelFormulario.Nuevo;
  }
  editar(datos:Producto){
    this.productoSeleccionado = datos;
    this.estadoFormularioAnterior = this.estadoFormulario;
    window.setTimeout(()=>{this.estadoFormulario = EstadoDelFormulario.Editando;},500);
  }
  //Desactivamos la edición
  volverABase(){
    this.estadoFormulario = this.estadoFormularioAnterior;
  }
  envioExitoso(){
    this.estadoFormulario = this.estadoFormularioAnterior;
    this.buscar();
  }
  darDeBaja(datos:Producto){
    
    Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas ${(datos.habilitado== 1)?"DAR DE BAJA":"ACTIVAR"} el PRODUCTO: ${datos.descripcion} - ${datos.marca?.descripcion  || "Sin marca"} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: `${(datos.habilitado== 1)?"BAJA":"ACTIVAR"} `,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Acción a realizar si se hace clic en "Aceptar"
        this.servicio.borrar(datos.id_producto!)
        .subscribe({
          next:() => {
            this.buscar();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: datos.habilitado== 1 ? 'Producto DESACTIVADO' : 'Producto ACTIVADO',
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  barraPageable(datos:DatosNavegacionPorPagina){
    this.datosDeLaBarra=datos;
    this.buscar();
  }

  cambiar_el_precio(datos:Producto){
    if(!datos.historial_precio){
      Swal.fire({
        title:'Error',
        icon:'error',
        text:`El producto no tiene asociado un registro de precio, contacte con el Administrador de la base de datos.`
      })
      return;

    }
    Swal.fire({
      title: 'Confirmación',
      text: `¿En realidad quieres cambiar el precio del PRODUCTO: ${datos.descripcion} - ${datos.marca?.descripcion || "Sin marca"} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop: true,
      allowOutsideClick: true,
      confirmButtonText: 'Cambiar precio',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Ingresa el nuevo precio',
          input: 'number',
          inputAttributes: {
            min: "0",
            step: "0.01"
          },
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          backdrop: true,
          allowOutsideClick: true
        }).then((priceResult) => {
          if (priceResult.isConfirmed) {
            const nuevoPrecio = priceResult.value;
            Swal.fire({
              title: 'Precio ingresado',
              text: `El nuevo precio es: ${nuevoPrecio}`,
              icon: 'info',
              confirmButtonText: 'Aceptar',
              toast: true,
              showClass: {
                popup: 'animated bounceIn'
              },
              hideClass: {
                popup: 'animated bounceOut'
              },
            });
            if(!isNaN(Number(nuevoPrecio))){
              this.servicio.actualizar_precio(datos.id_producto!,nuevoPrecio).subscribe({
                     next: () => {
                       this.buscar();
                       Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: 'Precio actualizado correctamente',
                         showConfirmButton: false,
                         timer: 2000,
                         timerProgressBar: true,
                         toast: true,
                         showClass: {
                           popup: 'animated bounceIn'
                         },
                         hideClass: {
                           popup: 'animated bounceOut'
                         },
                       });
                     },
                     error: () => {
                       alert("Ocurrió un error al actualizar el precio.");
                     }
                   });

            }
          }
        });
      }
    });
    
  }

  //Filtros

  filtro = new Filtro<EnumFiltroProductos>();

  constructor(){
    this.filtro.setCantidadFilters(2);
    //Valor por defecto para el segundo filtro
    this.filtro.filters[1].campo = EnumFiltroProductos.Habilitado;
    this.filtro.filters[1].terminosDeBusqueda[0] = '1';
    this.filtro.filters[1].tipoBusqueda = TipoDeComparacion.LITERAL;
  }
  readonly EnumFiltroProductos = EnumFiltroProductos;
  readonly TipoDeComparacion = TipoDeComparacion;

  emitirSeleccion(producto:Producto){
    this.elementoSeleccionado.emit(producto);
  }
}
