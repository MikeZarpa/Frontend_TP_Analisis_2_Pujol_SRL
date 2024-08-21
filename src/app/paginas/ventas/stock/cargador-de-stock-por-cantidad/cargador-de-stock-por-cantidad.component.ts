import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { StockLote } from 'src/app/clases/base_de_datos/comercial/stock';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { StockLoteService } from 'src/app/servicios/comercial/stock_lote.service';
import { VentanasBusquedaService } from 'src/app/servicios/dialogs/ventanas-busqueda.service';

@Component({
  selector: 'app-cargador-de-stock-por-cantidad',
  templateUrl: './cargador-de-stock-por-cantidad.component.html',
  styleUrls: ['./cargador-de-stock-por-cantidad.component.css']
})
export class CargadorDeStockPorCantidadComponent {
  readonly servicioDeStock = inject(StockLoteService);
  readonly servicioDeBusqueda = inject(VentanasBusquedaService);
  readonly formBuilder =inject(FormBuilder);
  readonly formulario_para_verificar:FormGroup;

  constructor(){
    this.formulario_para_verificar = this.formBuilder.group({
      id_producto:[null, Validators.required],
      coste:[null, Validators.required],
      cantidad:[null, Validators.required]
    });
  }

  stocks_a_cargar:StockLote[] = [];


  buscar_producto(){
    this.servicioDeBusqueda.buscarProducto().subscribe({
      next: (producto) => {
        if(producto) this.ingresar_nueva_linea(producto);
      }
    })
  }
  ingresar_nueva_linea(producto:Producto){
    const nuevo_lote = new StockLote();
    nuevo_lote.id_producto = producto.id_producto!;
    nuevo_lote.producto = producto;
    if(producto.ultimo_stock)
      nuevo_lote.coste = producto.ultimo_stock?.coste;
    this.stocks_a_cargar.push(nuevo_lote);
  }

  verificar_todos_los_lotes_a_enviar():boolean{
    if(!(this.stocks_a_cargar.length > 0)) return false;
    let bandera = true
    this.stocks_a_cargar.forEach(stock => {      
      if(this.el_stock_es_invalido(stock)){
        bandera = false;
      } else if(!(stock.coste > 0 && stock.cantidad > 0))
        bandera = false;
    });
    return bandera;
  }

  el_stock_es_invalido(stock:StockLote):boolean{
    if(!(stock.coste > 0 && stock.cantidad > 0))
      return true;

    this.formulario_para_verificar.patchValue({
      id_producto:stock.id_producto,
      cantidad:stock.cantidad,
      coste:stock.coste
    });
    
    return this.formulario_para_verificar.invalid;
  }

  enviar_a_guardar_lotes(){
    if(!this.verificar_todos_los_lotes_a_enviar()) return;
    
    this.servicioDeStock.cargar_stock_lote_en_masa(this.stocks_a_cargar).subscribe({
      next: ()=>{FuncionesUtiles.CartelDeOperaciónRealizada(); this.stocks_a_cargar = [];},
      error: (error) => {alert("Ocurrió un error");}
    });
  }

  quitar_de_la_lista(stock:StockLote){
    const index = this.stocks_a_cargar.findIndex(item => item === stock);

    if (index !== -1) { // Si se encuentra el elemento
      this.stocks_a_cargar.splice(index, 1);
    }
  }
  get total_ingresado(){
    let acumulador = 0;
    this.stocks_a_cargar.forEach(stock => {
      if(stock.cantidad && stock.coste)
      acumulador += stock.cantidad*stock.coste;
    });
    return acumulador;
  }
}