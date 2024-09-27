import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { StockLote } from 'src/app/clases/base_de_datos/comercial/stock';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { RespuestaDeError } from 'src/app/clases/dtos/RespuestaDeError';
import { StockLoteService } from 'src/app/servicios/comercial/stock_lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {
  readonly formBuilder = inject(FormBuilder);
  readonly edicionForm: FormGroup;
  readonly servicio = inject(StockLoteService);
  readonly cdr = inject(ChangeDetectorRef);

  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Nuevo;
  EnumEstadoFormulario = EstadoDelFormulario;
  @Input() datosEdit!:StockLote;
  @Input() producto!:Producto;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  elFormularioEstaSiendoEnviado = false;

  constructor(){
    this.edicionForm = this.formBuilder.group({
      id_stock:null,
      id_producto:[null, Validators.required],
      cantidad:['',Validators.required],
      fecha_vto:null,
      coste:['',Validators.required],
    })
  }
  ngOnInit(): void {
    this.edicionForm.patchValue({
      id_producto:this.producto.id_producto
    })
    if(this.estadoFormulario == EstadoDelFormulario.Editando){
      this.cargarDatos();
    }
  }

  cargarDatos(){
    console.log(this.datosEdit.fecha_vto);
    console.log(new Date(this.datosEdit.fecha_vto + ""));
    let fecha_vto = null;
    try {
      fecha_vto = this.datosEdit.fecha_vto ? new Date(this.datosEdit.fecha_vto!).toISOString().substring(0, 10) : null;      
    } catch (error) {
      fecha_vto = null;
    }
    this.edicionForm.patchValue({
      id_stock: this.datosEdit.id_stock,
      cantidad: this.datosEdit.cantidad,
      coste: this.datosEdit.coste,
      fecha_vto: fecha_vto,
    });
  }

  volverClick(){
    this.volver.emit();
  }
  emitirEnvioExitoso(){
    this.envioExitoso.emit()
  }

  enviarFormulario(event:Event){
    event.preventDefault();
    if(this.elFormularioEstaSiendoEnviado)
      return;
    this.elFormularioEstaSiendoEnviado = true;
    if(this.edicionForm.invalid){
      Swal.fire({
        title:"Formulario Inválido",
        text:"Revise los campos obligatorios",
        icon:'warning',
        confirmButtonText:'Entendido',
      })
      return;
    }
    const datos = this.edicionForm.value;
    const servicioDeEnvio = this.obtenerFormularioAdecuado(datos);

    FuncionesUtiles.CartelDeRealizandoOperación();
    servicioDeEnvio.subscribe({
      next: () => {
        FuncionesUtiles.CartelDeOperaciónRealizada();
        this.emitirEnvioExitoso();
        this.elFormularioEstaSiendoEnviado = false;
      },
      error: (error)=>{
        const mensajeDeError = new RespuestaDeError(error);
        Swal.fire({
          title:'Error, al enviar el formulario.',
          icon:'error',
          text: "Servidor Responde: "+mensajeDeError.error_msg,
          confirmButtonText:"Entendido",
        });
        this.elFormularioEstaSiendoEnviado = false;
      }
    });


  }

  obtenerFormularioAdecuado(datos:any):Observable<void>{
    switch(this.estadoFormulario){
      case EstadoDelFormulario.Nuevo:
        return this.servicio.crear_stock_lote(datos);
      case EstadoDelFormulario.Editando:
        return this.servicio.actualiza_stock_lote(datos);
      default:
        throw Error("Estado del formulario incorrecto");
    }
  }
}
