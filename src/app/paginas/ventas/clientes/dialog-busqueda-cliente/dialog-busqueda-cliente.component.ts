import { EstadoDelFormulario } from 'src/app/clases/enums';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/clases/base_de_datos/comercial/cliente';

@Component({
  selector: 'app-dialog-busqueda-cliente',
  templateUrl: './dialog-busqueda-cliente.component.html',
  styleUrls: ['./dialog-busqueda-cliente.component.css']
})
export class DialogBusquedaClienteComponent {
  readonly EstadoDelFormulario = EstadoDelFormulario;

  constructor(public dialogRef: MatDialogRef<DialogBusquedaClienteComponent>){

  }

  finalizarBusqueda(cliente:Cliente) {
    this.dialogRef.close(cliente);
  }
}
