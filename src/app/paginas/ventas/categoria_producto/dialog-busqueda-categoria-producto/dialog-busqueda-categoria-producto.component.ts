import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/clases/base_de_datos/comercial/categoria';
import { EstadoDelFormulario } from 'src/app/clases/enums';

@Component({
  selector: 'app-dialog-busqueda-categoria-producto',
  templateUrl: './dialog-busqueda-categoria-producto.component.html',
  styleUrls: ['./dialog-busqueda-categoria-producto.component.css']
})
export class DialogBusquedaCategoriaProductoComponent {
  readonly EstadoDelFormulario = EstadoDelFormulario;

  constructor(public dialogRef: MatDialogRef<DialogBusquedaCategoriaProductoComponent>){

  }

  finalizarBusqueda(categoria:Categoria) {
    this.dialogRef.close(categoria);
  }
}
