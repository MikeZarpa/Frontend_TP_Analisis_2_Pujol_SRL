import { HttpErrorResponse } from '@angular/common/http';
import { Factura } from '../../../clases/base_de_datos/comercial/factura';
import { Component, OnInit, Provider, inject } from '@angular/core';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { Cliente } from 'src/app/clases/base_de_datos/comercial/cliente';
import { EmisionFacturaDTO, ItemEmisionFacturaDTO } from 'src/app/clases/dtos/emision_factura_dto';
import { EmisionVentasService } from 'src/app/servicios/comercial/emision-ventas/emision-ventas.service';
import { ProductoService } from 'src/app/servicios/comercial/producto.service';
import Swal from 'sweetalert2';
import { RespuestaDeError } from 'src/app/clases/dtos/RespuestaDeError';
import { VentanasBusquedaService } from 'src/app/servicios/dialogs/ventanas-busqueda.service';
import { FuncionesUtilesComerciales } from 'src/app/clases/utiles/funciones-utiles-comercial';

@Component({
  selector: 'app-emision-venta',
  templateUrl: './emision-venta.component.html',
  styleUrls: ['./emision-venta.component.css']
})
export class EmisionVentaComponent implements OnInit {
  readonly servicioProducto = inject(ProductoService);

  productos_filtrados:Producto[]=[];
  todos_los_productos:Producto[]=[];
  producto_seleccionado:Producto|null = null;
  carrito:CarritoItem[]=[];

  ngOnInit(): void {
      this.buscar();
  }
  seleccionar(producto:Producto){
    if(!this.producto_seleccionado){
      this.producto_seleccionado = producto;
      this.activarTimerSeleccion();
      return;
    }
    if(this.producto_seleccionado.id_producto==producto.id_producto ){
      if(!this.seleccionamos_elemento_recientemente)
        this.producto_seleccionado = null;
      return;
    }
    this.producto_seleccionado = producto;
  }
  styleProductoSeleccionado(producto:Producto):string{
    if(!this.producto_seleccionado)
        return " ";
    if(this.producto_seleccionado.id_producto == producto.id_producto)
      return " linea-seleccionada ";
    
    return " ";
  }

  buscar(){
    this.servicioProducto.obtenerTodosSinPagina().subscribe({
      next:(res)=>{this.todos_los_productos = res; this.filtrar('');},
      error:()=>{Swal.fire({
          title:'Error',
          icon:'error',
          text:`Error al recibir los productos. ¿Servidor ocupado?.`
        });
        this.todos_los_productos=[];
      }
    })
  }

  filtrar(texto_busqueda: string) {
    if(texto_busqueda == ""){
      this.productos_filtrados = this.todos_los_productos;
      return;
    }
    // Separar el texto de búsqueda en palabras individuales
    let values = texto_busqueda.split(' ').map(value => value.trim()).filter(value => value.length > 0);    
    // Iniciar con todos los productos
    let productos_encontrados = this.todos_los_productos;  
    // Filtrar los productos para cada palabra de búsqueda
    values.forEach(value => {
      const regex = new RegExp(value, 'i'); // Crear una expresión regular insensible a mayúsculas/minúsculas
      productos_encontrados = productos_encontrados.filter(producto => {
        // Verificar coincidencias en la descripción del producto o en la descripción de la marca
        return regex.test(producto.descripcion) || (producto.marca && regex.test(producto.marca.descripcion));
      });
    });  
    // Asignar los productos filtrados a la variable correspondiente
    this.productos_filtrados = productos_encontrados;
  }

  agregar_al_carrito(cantidad:number){
    if(!this.producto_seleccionado)
      return;
    this.carrito.push({producto:this.producto_seleccionado, cantidad, id_tipo_det_venta:1});
    this.producto_seleccionado = null;
  }
  get subtotal(){
    let acum = 0;
    this.carrito.forEach(element => {
      acum += element.cantidad * (element.producto.historial_precio?.precio || 1);
    });
    return acum;
  }
  get descuento(){
    if(this.cliente == null) return 0;
    return FuncionesUtilesComerciales.obtener_descuento_de_iva(this.subtotal, this.cliente.cond_iva!);
  }
  get total(){
    return this.subtotal + this.descuento;
  }
  remover_lista(item:CarritoItem){
    const index = this.carrito.findIndex(itemCarrito => itemCarrito === item);
    if(index != -1)
      this.carrito.splice(index, 1);
  }
  test_agregar_al_carrito(){
    this.agregar_al_carrito(1);
  }

  readonly facturacionService = inject(EmisionVentasService);

  cliente:Cliente|null = null;
  crear_datos_factura():EmisionFacturaDTO{
    const factura = new EmisionFacturaDTO();
    factura.id_cliente = this.cliente?.id_cliente || null;
    factura.carrito = [];
    factura.descuento = this.descuento;
    this.carrito.forEach(item => {
      const new_factura_item = new ItemEmisionFacturaDTO();
      new_factura_item.cantidad = item.cantidad;
      try {        
        new_factura_item.id_histprecio = item.producto.historial_precio?.id_histprecio!;
      } catch (error) {
        alert("Error con el historial de precio");
      }
      factura.carrito.push(new_factura_item);
    });
    return factura;
  }

  emitiendo:boolean = false;

  cerrar_factura(){
    if(confirm("Cerramos?")){
      if(this.validaciones()){
        this.emitiendo = true;
        this.facturacionService.EmitirVenta(this.crear_datos_factura()).subscribe(
          {
            next: (res)=>{this.factura_emitida_exitosamente()},
            error: (error)=>{
              this.error_al_emitir_factura(error)},
          }
        );
      }
    };
  }
  validaciones():boolean{
    return this.validar_si_se_requiere_cliente();
  }
  validar_si_se_requiere_cliente():boolean{
    if(this.total < 30000)
      return true;
    if(this.cliente == null)
      Swal.fire({title:"Por el monto, hay que identificar al cliente", icon:'warning', confirmButtonText:'Entendido'});
    return this.cliente != null;
  }
  factura_emitida_exitosamente(){
    this.reiniciar_formulario();
    this.emitiendo = false;
  }
  error_al_emitir_factura(error:HttpErrorResponse){
    const mensajeDeError = new RespuestaDeError(error);
    Swal.fire({
      title:"Un error",
      text: "Servidor Responde: "+mensajeDeError.error_msg,
      icon: 'error',
      confirmButtonText:'Entendido',
    });
    this.emitiendo = false;
  }
  
  seleccionamos_elemento_recientemente = false;

  activarTimerSeleccion(){
    this.seleccionamos_elemento_recientemente = true;
    let elemento_seleccionado = this.producto_seleccionado;
    setTimeout(()=>{
      if(elemento_seleccionado==this.producto_seleccionado)
        this.seleccionamos_elemento_recientemente = false;
      },1000);
  }
  reiniciar_formulario(){
    this.producto_seleccionado = null;
    this.carrito = [];
    this.buscar();
    this.cliente = null;
  }

  readonly servicioVentanasEmergentes = inject(VentanasBusquedaService);
  seleccionar_cliente(){
    this.servicioVentanasEmergentes.buscarCliente().subscribe({
      next: res => {if(res) this.cliente = res;}
    })
  }
}
export class CarritoItem{
  public producto!:Producto;
  public cantidad!:number;
  public id_tipo_det_venta!:number;
}