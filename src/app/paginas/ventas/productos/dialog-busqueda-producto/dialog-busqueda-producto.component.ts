import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { EstadoDelFormulario } from 'src/app/clases/enums';

@Component({
  selector: 'app-dialog-busqueda-producto',
  templateUrl: './dialog-busqueda-producto.component.html',
  styleUrls: ['./dialog-busqueda-producto.component.css']
})
export class DialogBusquedaProductoComponent {
  readonly EstadoDelFormulario = EstadoDelFormulario;

  constructor(public dialogRef: MatDialogRef<DialogBusquedaProductoComponent>){

  }

  finalizarBusqueda(producto:Producto) {
    this.dialogRef.close(producto);
  }
}
