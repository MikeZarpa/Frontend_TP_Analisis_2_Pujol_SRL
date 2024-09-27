import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/clases/base_de_datos/comercial/categoria';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { Cliente } from 'src/app/clases/base_de_datos/comercial/cliente';
import { DialogBusquedaCategoriaProductoComponent } from 'src/app/paginas/ventas/categoria_producto/dialog-busqueda-categoria-producto/dialog-busqueda-categoria-producto.component';
import { DialogBusquedaClienteComponent } from 'src/app/paginas/ventas/clientes/dialog-busqueda-cliente/dialog-busqueda-cliente.component';
import { DialogBusquedaMarcaComponent } from 'src/app/paginas/ventas/marcas/dialog-busqueda-marca/dialog-busqueda-marca.component';
import { DialogBusquedaProductoComponent } from 'src/app/paginas/ventas/productos/dialog-busqueda-producto/dialog-busqueda-producto.component';

@Injectable({
  providedIn: 'root'
})
export class VentanasBusquedaService {
  readonly dialog = inject(MatDialog);
  
  constructor() { }

  buscarCliente():Observable<Cliente|undefined>{
    let dialogRef = this.dialog.open(DialogBusquedaClienteComponent, {
      height: this.height,
      width: this.width,
    });

    return dialogRef.afterClosed();
  }
  buscarMarca():Observable<Marca|undefined>{
    let dialogRef = this.dialog.open(DialogBusquedaMarcaComponent,{
      height: this.height,
      width: this.width,
    })
    return dialogRef.afterClosed();
  }
  buscarProducto():Observable<Producto|undefined>{
    let dialogRef = this.dialog.open(DialogBusquedaProductoComponent,{
      height: this.height,
      width: this.width,
    })
    return dialogRef.afterClosed();
  }
  buscarCategoriaProducto():Observable<Categoria|undefined>{
    let dialogRef = this.dialog.open(DialogBusquedaCategoriaProductoComponent,{
      height: this.height,
      width: this.width,
    })
    return dialogRef.afterClosed();
  }

  get height():string{
    return Math.ceil(window.innerHeight*90/100) + "px";
  }
  get width():string{
    return Math.ceil(window.innerWidth*90/100) + "px";
  }
}
