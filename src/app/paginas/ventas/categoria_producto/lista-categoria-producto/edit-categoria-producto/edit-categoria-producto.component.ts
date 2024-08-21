import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/clases/base_de_datos/comercial/categoria';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { CategoriaProductoService } from 'src/app/servicios/comercial/categoria_producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-categoria-producto',
  templateUrl: './edit-categoria-producto.component.html',
  styleUrls: ['./edit-categoria-producto.component.css']
})
export class EditCategoriaProductoComponent {
  readonly formBuilder = inject(FormBuilder);
  readonly edicionForm: FormGroup;
  readonly servicio = inject(CategoriaProductoService);

  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Nuevo;
  EnumEstadoFormulario = EstadoDelFormulario;
  @Input() datosEdit!:Categoria;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  elFormularioEstaSiendoEnviado = false;

  constructor(){   
    this.edicionForm = this.formBuilder.group({
      id_categoria: [null],
      descripcion: [null,Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.estadoFormulario==EstadoDelFormulario.Editando){
      this.cargarDatos();
    }   
  }

  cargarDatos(){
    this.edicionForm.patchValue({
      id_categoria: this.datosEdit.id_categoria,
      descripcion:this.datosEdit.descripcion,
    });
  }

  enviarFormulario(event:Event){
    event.preventDefault();

    if(this.elFormularioEstaSiendoEnviado)
      return;
    this.elFormularioEstaSiendoEnviado = true;
    
    if (this.edicionForm.valid) {
      // Realizar el envío del formulario o guardar los datos
      const datos = Object.assign({}, this.edicionForm.value);

      const operacion = this.estadoFormulario === EstadoDelFormulario.Nuevo 
        ? this.servicio.crear_categoria(datos)
        : this.servicio.actualizar_categoria(datos);

      operacion.subscribe({
        next: () => {
          FuncionesUtiles.CartelDeOperaciónRealizada();
          this.emitirEnvioExitoso();
        },
        error: () => {
          this.elFormularioEstaSiendoEnviado = false;
          Swal.fire({
            title: 'Upss',
            text: 'Ocurrió un error, intente enviar el formulario nuevamente.',
            confirmButtonText: 'Entendido',
            showConfirmButton: true,
          });
        }
      });
    } else {
      this.elFormularioEstaSiendoEnviado = false;
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios', 'error');        
    }
  }

  volverClick(){
    this.volver.emit();
  }

  emitirEnvioExitoso(){
    this.envioExitoso.emit();
  }
}
