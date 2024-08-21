import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { EstadoDelFormulario } from 'src/app/clases/enums';

@Component({
  selector: 'app-dialog-busqueda-marca',
  templateUrl: './dialog-busqueda-marca.component.html',
  styleUrls: ['./dialog-busqueda-marca.component.css']
})
export class DialogBusquedaMarcaComponent {
  readonly EstadoDelFormulario = EstadoDelFormulario;

  constructor(public dialogRef: MatDialogRef<DialogBusquedaMarcaComponent>){

  }

  finalizarBusqueda(marca:Marca) {
    this.dialogRef.close(marca);
  }
}
