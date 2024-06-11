import { Component, OnInit, Provider, inject } from '@angular/core';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { ProductoService } from 'src/app/servicios/comercial/producto.service';
import Swal from 'sweetalert2';

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
      return;
    }
    if(this.producto_seleccionado.id_producto==producto.id_producto){
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
    this.carrito.push({producto:this.producto_seleccionado, cantidad});
    this.producto_seleccionado = null;
  }
  
}
export class CarritoItem{
  public producto!:Producto;
  public cantidad!:number;
}