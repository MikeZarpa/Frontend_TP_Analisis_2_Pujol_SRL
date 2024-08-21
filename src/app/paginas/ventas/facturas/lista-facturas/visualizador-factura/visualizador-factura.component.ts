import { DetalleFactura } from './../../../../../clases/base_de_datos/comercial/detalle_factura';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Factura } from 'src/app/clases/base_de_datos/comercial/factura';
import { RespuestaDeError } from 'src/app/clases/utiles/RespuestaDeError';
import { FacturaService } from 'src/app/servicios/comercial/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizador-factura',
  templateUrl: './visualizador-factura.component.html',
  styleUrls: ['./visualizador-factura.component.css']
})
export class VisualizadorFacturaComponent implements OnInit {
  @Input() id_factura!:number;
  factura:Factura|null=null;
  @Output() volver = new EventEmitter<void>();

  readonly servicio = inject(FacturaService);
  ngOnInit():void{
    this.servicio.obtenerFacturaCompletaPorID(this.id_factura).subscribe({
      next: res => {this.factura = res;
      },
      error: error => {
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          title: "Ocurrió un error al intentar cargar los detalles",
          text:"Servidor Responde: "+mensajeDeError.error_msg,
          confirmButtonText:"Entendido"
        });
      }
    })
  }
  volverClick(){
    this.volver.emit();
  }

  get subtotal():number{
    if(this.factura == null)
      return 0;
    let acumulador = 0;
    this.factura.detalles_venta.forEach(detalle => {
      acumulador += (detalle.cantidad * detalle.hist_precio.precio);
    });
    return acumulador;
  }
}
