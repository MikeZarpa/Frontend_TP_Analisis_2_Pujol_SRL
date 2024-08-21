import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { MarcaService } from 'src/app/servicios/comercial/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-marca',
  templateUrl: './edit-marca.component.html',
  styleUrls: ['./edit-marca.component.css']
})
export class EditMarcaComponent implements OnInit {

  readonly formBuilder = inject(FormBuilder);
  readonly edicionForm: FormGroup;
  readonly servicio = inject(MarcaService);
  readonly cdr = inject(ChangeDetectorRef);

  @Input() estadoFormulario = EstadoDelFormulario.Nuevo;
  readonly EnumEstadoFormulario = EstadoDelFormulario;
  @Input() datosEdit!:Marca;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  elFormularioEstaSiendoEnviado = false;

  constructor(){
    this.edicionForm = this.formBuilder.group({
      id_marca:[null],
      descripcion:["",Validators.required]
    });
  }
  ngOnInit(): void {
    if(this.estadoFormulario==EstadoDelFormulario.Editando)
        this.cargarDatos();
    window.setTimeout((()=>{this.cdr.detectChanges()}).bind(this),4000);
  }
  
  cargarDatos(){
    this.edicionForm.patchValue({
      id_marca: this.datosEdit.id_marca,
      descripcion:this.datosEdit.descripcion
    });
  }

  enviarFormulario(event:Event){
    //Prevenimos el evento de envío por defecto
    event.preventDefault();
    //Bloqueamos el boton para que no se envíe doble
    this.elFormularioEstaSiendoEnviado = true;
    //Corroboramos que el formulario sea válido
    if(this.edicionForm.invalid){
      this.elFormularioEstaSiendoEnviado = false;
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios', 'error');  
      return;
    }
    //Obtenemos los valores del formulario
    const valoresDelFormulario = this.edicionForm.value;
    //Cargamos el tipo de envio
    let envioDeFormulario = null;
    switch(this.estadoFormulario){
      case EstadoDelFormulario.Nuevo: envioDeFormulario = this.envioDeFormularioParaCrearNuevo(valoresDelFormulario);
        break;
      case EstadoDelFormulario.Editando: envioDeFormulario = this.envioDeFormularioParaEditar(valoresDelFormulario);
        break;
      default:
          throw Error("Estado del Formulario para envio inválido");
    }
    //Enviamos el formulario
    envioDeFormulario.subscribe({
      next: res => {
        FuncionesUtiles.CartelDeOperaciónRealizada();
        this.emitirEnvioExitoso();
      },
      error: error => {
        this.elFormularioEstaSiendoEnviado = false;
        Swal.fire({
          title: 'Upss',
          text: 'Ocurrió un error, intente enviar el formulario nuevamente.',
          confirmButtonText: 'Entendido',
          showConfirmButton: true,
        });
      },
    });
  }

  envioDeFormularioParaCrearNuevo(formValue:Marca):Observable<void>{
    return this.servicio.crear_marca(formValue);
  }
  envioDeFormularioParaEditar(formValue:Marca):Observable<void>{
    return this.servicio.actualizar_marca(formValue);
  }

  volverClick(){
    this.volver.emit();
  }

  emitirEnvioExitoso(){
    this.envioExitoso.emit();
  }
}
