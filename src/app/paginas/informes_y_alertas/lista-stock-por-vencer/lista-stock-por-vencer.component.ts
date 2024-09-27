import { Component, inject, OnInit } from '@angular/core';
import { StockLote } from 'src/app/clases/base_de_datos/comercial/stock';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { StockLoteService } from 'src/app/servicios/comercial/stock_lote.service';
import { AlertasVencimientoService } from 'src/app/servicios/informes_y_alertas/alertas/alertas-vencimiento.service';


@Component({
  selector: 'app-lista-stock-por-vencer',
  templateUrl: './lista-stock-por-vencer.component.html',
  styleUrls: ['./lista-stock-por-vencer.component.css']
})
export class ListaStockPorVencerComponent implements OnInit {
  lotes:StockLote[] = [];
  readonly servicioDeAlertaDeVencimiento = inject(AlertasVencimientoService);
  readonly servicioDeStock = inject(StockLoteService);

  dias_de_antelacion = 14;


  ngOnInit(): void {
    this.buscar();
  }
  buscar(){
    this.servicioDeAlertaDeVencimiento.obtener_lista_stock_proximos_a_vencer(this.dias_de_antelacion).subscribe({
      next: (registros) => {this.lotes = registros;},
      error: () => {alert("Ocurrió un error");}
    });
  }

  dias_fantantes(fecha:string){
    let hoy = new Date(); // Fecha actual
    let fechaDada = new Date(fecha); // Convertir la cadena de fecha a un objeto Date

    // Calcular la diferencia en milisegundos
    let diferenciaMilisegundos = fechaDada.getTime() - hoy.getTime();

    // Convertir la diferencia a días
    let diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    return diferenciaDias;
  }

  borrar_stock(stock:StockLote){
    this.servicioDeStock.borrar_o_vaciar_stock_lote(stock.id_stock!).subscribe({
      next: () => {
        FuncionesUtiles.CartelDeOperaciónRealizada();
        this.buscar();
      }
    })
  }
}
