import { Component, inject, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { RespuestaDeError } from 'src/app/clases/utiles/RespuestaDeError';
import { ProductoService } from 'src/app/servicios/comercial/producto.service';
import { AlertasStockService } from 'src/app/servicios/informes_y_alertas/alertas-stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-stock-faltante',
  templateUrl: './lista-stock-faltante.component.html',
  styleUrls: ['./lista-stock-faltante.component.css']
})
export class ListaStockFaltanteComponent implements OnInit {
  
  readonly servicioDeAlertas = inject(AlertasStockService);
  readonly servicioDeProductos = inject(ProductoService);
  readonly EnumEstadoDelFormulario = EstadoDelFormulario;
  estadoFormulario = EstadoDelFormulario.Base;
  cargado:boolean = false;
  productos:Producto[] = [];

  ngOnInit(): void {
    this.buscar();
  }

  buscar():void{
    this.servicioDeAlertas.obtener_lista_productos_bajo_stock().subscribe({
      next: res => {this.productos = res; this.cargado = true;},
      error: (error) => {
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          icon:'error',
          title:'Ocurrio al intentar recuperar la lista',
          text: 'Servidor Responde: '+mensajeDeError.error_msg,
          confirmButtonText: 'Entendido',
        });
      }
    });
  }

  async darDeBaja(datos:Producto){
    const result = await Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas ${(datos.habilitado== 1)?"DAR DE BAJA":"ACTIVAR"} el PRODUCTO: ${datos.descripcion} - ${datos.marca?.descripcion  || "Sin marca"} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: `${(datos.habilitado== 1)?"BAJA":"ACTIVAR"} `,
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed)  return;
    if(datos.total_cantidad! > 0){
      const result2 = await Swal.fire({
        title: 'Confirmación',
        text: `Este producto aún tiene Stock, quedan ${datos.total_cantidad}. ¿Seguro?`,
        icon: 'warning',
        showCancelButton: true,
        backdrop:true,
        allowOutsideClick:true,
        confirmButtonText: `Dar de Baja de Todos Modos`,
        cancelButtonText: 'Cancelar',
      });
      if (!result2.isConfirmed)  return;
    }
      // Acción a realizar si se hace clic en "Aceptar"
      this.servicioDeProductos.borrar(datos.id_producto!)
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
  }
  async cambiar_cantidad_a_0(datos:Producto){
    const result = await Swal.fire({
      title: 'Confirmación',
      text: `¿Estás seguro de que deseas cambiar a 0 la CANTIDAD MÍNIMA del PRODUCTO: ${datos.descripcion} - ${datos.marca?.descripcion  || "Sin marca"} ?`,
      icon: 'question',
      showCancelButton: true,
      backdrop:true,
      allowOutsideClick:true,
      confirmButtonText: `Cambiar a 0`,
      cancelButtonText: 'Cancelar',
    });    

    if(!result.isConfirmed) return;

    datos.cantidad_minima = 0;
    this.servicioDeProductos.actualizar_producto(datos).subscribe({
      next: () => {FuncionesUtiles.CartelDeOperaciónRealizada, this.buscar()},
      error: () => alert("Ocurrió un error."),
    })
  }
}
