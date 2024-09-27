import { Component, inject } from '@angular/core';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { StockLote } from 'src/app/clases/base_de_datos/comercial/stock';
import { EnumFiltroStock, EstadoDelFormulario, TipoDeComparacion } from 'src/app/clases/enums';
import { Filtro } from 'src/app/clases/dtos/filtro';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { RespuestaDeError } from 'src/app/clases/dtos/RespuestaDeError';
import { DatosNavegacionPorPagina, RespuestaPageable } from 'src/app/componentes/interfaz/barra-paginacion/barra-paginacion.component';
import { StockLoteService } from 'src/app/servicios/comercial/stock_lote.service';
import { VentanasBusquedaService } from 'src/app/servicios/dialogs/ventanas-busqueda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-stock',
  templateUrl: './lista-stock.component.html',
  styleUrls: ['./lista-stock.component.css']
})
export class ListaStockComponent {
  producto:Producto|null = null;

  listaDeStocks:StockLote[] = [];

  readonly EnumEstadoDelFormulario = EstadoDelFormulario;
  readonly EnumFiltroStock = EnumFiltroStock;
  readonly TipoDeComparacion = TipoDeComparacion;
  estadoFormulario: EstadoDelFormulario = EstadoDelFormulario.Base;
  estadoFormularioAnterior!:EstadoDelFormulario;

  constructor(){
    this.filtro.setCantidadFilters(1);
    //Ponemos por defecto
    this.filtro.filters[0].campo = EnumFiltroStock.cantidad;
    this.filtro.filters[0].terminosDeBusqueda[0] = '0';
    this.filtro.filters[0].tipoBusqueda = TipoDeComparacion.MAYOR_QUE;

  }

  volverABase(){
    this.estadoFormulario = this.estadoFormularioAnterior;
  }

  cambioExitoso(){
    this.buscar();
    this.volverABase();
  }

  readonly servicioVentanas = inject(VentanasBusquedaService);
  async seleccionarProducto(){
     this.servicioVentanas.buscarProducto().subscribe(
      res => {if(res) this.producto = res; this.buscar();}
    )
  }

  readonly servicio = inject(StockLoteService);

  crearNuevo(){
    this.estadoFormularioAnterior = this.estadoFormulario;
    this.estadoFormulario = EstadoDelFormulario.Nuevo;
  }

  stockSeleccionado!:StockLote;

  editar(stock:StockLote){
    this.stockSeleccionado = stock;
    this.estadoFormularioAnterior = this.estadoFormulario;
    window.setTimeout(()=>{this.estadoFormulario = EstadoDelFormulario.Editando},0);
  }

  async darDeBaja(stock:StockLote){

    const resultado = await Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas reducir a 0, el registro de stock de ${this.producto?.descripcion+" "+(this.producto?.marca?.descripcion || "Sin marca")}. (Cantidad: ${stock.cantidad}. Coste:$${stock.coste}). `,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: `Vaciar`,
      cancelButtonText: 'Cancelar'
    });

      if (resultado.isConfirmed) {
        // Acción a realizar si se hace clic en "Aceptar"
        this.servicio.borrar_o_vaciar_stock_lote(stock.id_stock!)
        .subscribe({
          next:() => {
            this.buscar();
            FuncionesUtiles.CartelDeOperaciónRealizada;  
        },
        error:(error)=>{
          const mensajeDeError = new RespuestaDeError(error);
          Swal.fire({
            icon:'error',
            title:'Ocurrió un error al reducir el stock',
            text:'Servidor Responde: '+mensajeDeError.error_msg,
            confirmButtonText:'Entiendo'
          })
        }
        });
      }


    this.servicio.borrar_o_vaciar_stock_lote(stock.id_stock!).subscribe({
      next: ()=>{FuncionesUtiles.CartelDeOperaciónRealizada(); this.buscar()},
      error: ()=>{}
    });
  }


  //Para la barra de navegación de paginas
  datosPageable: RespuestaPageable<StockLote>|null = null;
  datosDeLaBarra:DatosNavegacionPorPagina|null=null;

  eventoProvocadoPorBarraPageable(datos:DatosNavegacionPorPagina){
    this.datosDeLaBarra = datos;
    this.buscar();
  }

  //Filtro
  filtro:Filtro<any> = new Filtro<any>();

  buscar(){
    this.filtro.comprobar();
    console.log(this.filtro);
    
    
    if(this.producto == null) return;
    
    let funcionDeBusquedaDelServicio;
    if(this.datosDeLaBarra != null)
      funcionDeBusquedaDelServicio = this.servicio.obtenerTodosPorIdProductoConPagina(this.producto?.id_producto!, this.filtro, this.datosDeLaBarra);
    else
      funcionDeBusquedaDelServicio = this.servicio.obtenerTodosPorIdProductoConPagina(this.producto?.id_producto!,this.filtro);
    
    funcionDeBusquedaDelServicio.subscribe({
      next: res => {
        this.listaDeStocks = res.datos;
        this.datosPageable = res;
      }
    });
  }
}
