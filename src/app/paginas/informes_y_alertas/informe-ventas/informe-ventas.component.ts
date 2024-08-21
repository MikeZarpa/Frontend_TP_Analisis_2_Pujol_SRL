import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeCategoriaVentasFechas, InformeProductosVentasFechas } from 'src/app/clases/informes/informe_ventas_fechas';
import { InformesService } from 'src/app/servicios/informes_y_alertas/informes.service';

@Component({
  selector: 'app-informe-ventas',
  templateUrl: './informe-ventas.component.html',
  styleUrls: ['./informe-ventas.component.css']
})
export class InformeVentasComponent implements OnInit {
  readonly formBuilder = inject(FormBuilder);
  readonly formularioFecha: FormGroup;
  readonly servicioDeInformes = inject(InformesService);
  readonly Math = Math;

  buscar_por_categoria:boolean = true;
  vista_de_promedios:boolean = false;

  registros_productos:InformeProductosVentasFechas[] = [];
  registros_categorias:InformeCategoriaVentasFechas[] = [];

  constructor(){
    this.formularioFecha = this.formBuilder.group({
      fecha_1:[(new Date()).toISOString().substring(0,10),Validators.required],
      fecha_2:[(new Date()).toISOString().substring(0,10),Validators.required]
    });
  }
  ngOnInit(): void {
    
  }
  enviarFormulario(event:Event){
    event.preventDefault();
    this.buscar();
  }
  buscar(){
    if(this.formularioFecha.invalid) return;
    const datos = this.formularioFecha.value;
    const fecha_1 = datos['fecha_1'];
    const fecha_2 = datos['fecha_2'];
    if(this.buscar_por_categoria){
      this.servicioDeInformes.venta_categoria_entre_fechas(fecha_1, fecha_2).subscribe({
        next:(registros)=>{this.registros_categorias = registros},
        error:(error) =>{
          alert("Ocurrió un error");
        }
      });
    } else {
      this.servicioDeInformes.venta_producto_entre_fechas(fecha_1, fecha_2).subscribe({
        next:(registros)=>{this.registros_productos = registros},
        error:(error) =>{
          alert("Ocurrió un error");
        }
      });
    }
  }

  get cantidad_dias():number{
    if(!this.buscar_por_categoria){
      if(this.registros_productos.length == 0)
        return 1;
      return Number(this.registros_productos[0].DIAS_TOTALES);
    } else {
      if(this.registros_categorias.length == 0)
        return 1;
      return Number(this.registros_categorias[0].DIAS_TOTALES);
    }
  }

  get total_ingresos(){
    let acumulador = 0;
    if(!this.buscar_por_categoria){
      this.registros_productos.forEach(registro => {
        acumulador += Number(registro.TOTAL_VENDIDO);
        });
    } else {
      this.registros_categorias.forEach(registro => {
        acumulador += Number(registro.TOTAL_VENDIDO);
        });
    }
    return acumulador;

  }
  get total_costos(){
    let acumulador = 0;
    if(!this.buscar_por_categoria){
      this.registros_productos.forEach(registro => {
        acumulador += Number(registro.TOTAL_COSTE);
        });
    } else {
      this.registros_categorias.forEach(registro => {
        acumulador += Number(registro.TOTAL_COSTE);
        });
    }
    return acumulador;
  }
  get total_ganancias(){
    let acumulador = 0;
    if(!this.buscar_por_categoria){
      this.registros_productos.forEach(registro => {
        acumulador += Number(registro.GANANCIA_GENERADA);
        });
    } else {
      this.registros_categorias.forEach(registro => {
        acumulador += Number(registro.GANANCIA_GENERADA);
        });
    }
    return acumulador;
  }
  get primera_fecha() {
    const fecha1 = this.formularioFecha.value['fecha_1'];
    const fecha2 = this.formularioFecha.value['fecha_2'];

    // Compara las fechas y devuelve la menor
    return fecha1 < fecha2 ? fecha1 : fecha2;
  }
  get segunda_fecha(){
    const fecha1 = this.formularioFecha.value['fecha_1'];
    const fecha2 = this.formularioFecha.value['fecha_2'];

    // Compara las fechas y devuelve la mayor
    return fecha1 > fecha2 ? fecha1 : fecha2;
  }
}
