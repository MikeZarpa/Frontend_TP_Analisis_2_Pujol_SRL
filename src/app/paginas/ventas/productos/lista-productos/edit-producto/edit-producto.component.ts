import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { MarcaService } from 'src/app/servicios/comercial/marca.service';
import { ProductoService } from 'src/app/servicios/comercial/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent {

  readonly formBuilder = inject(FormBuilder);
  readonly edicionForm: FormGroup;
  readonly servicio = inject(ProductoService);
  readonly servicioMarca = inject(MarcaService);
  readonly cdr = inject(ChangeDetectorRef);

  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Nuevo;
  EnumEstadoFormulario = EstadoDelFormulario;
  @Input() datosEdit!:Producto;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  marcaOpciones:Marca[] = [];
  elFormularioEstaSiendoEnviado = false;

  constructor(){   
    this.edicionForm = this.formBuilder.group({
      id_producto: [null],
      descripcion: ["", Validators.required],
      cantidad_minima: [0, Validators.required],
      id_marca: [null],
      habilitado: [1],
    });  
  }
  ngOnInit(): void {
    if(this.estadoFormulario==EstadoDelFormulario.Editando){
      this.cargarDatos();
    }
    this.cargarMarca();
       // Forzar la detección de cambios
      window.setTimeout((()=>{this.cdr.detectChanges()}).bind(this),2000);
    this.cdr.detectChanges();
  }

  cargarMarca(){
    this.servicioMarca.obtenerTodosSinPagina().subscribe({
      next:(res) => {this.marcaOpciones = res;}
    })
  }

  cargarDatos(){
    this.edicionForm.patchValue({
      //id: this.datosEdit.id,
      id_producto: this.datosEdit.id_producto,
      descripcion: this.datosEdit.descripcion,
      cantidad_minima: this.datosEdit.cantidad_minima ?? 0,
      id_marca: this.datosEdit.id_marca,
      habilitado: this.datosEdit.habilitado
    })
    const selectMarca : HTMLSelectElement = document.getElementById("id_marca") as HTMLSelectElement;
    selectMarca.value = this.datosEdit.id_marca+"" ?? "";
  }

  enviarFormulario(event:Event){
    event.preventDefault();

    if(this.elFormularioEstaSiendoEnviado)
      return;
    this.elFormularioEstaSiendoEnviado = true;
    
    if (this.edicionForm.valid) {
      // Realizar el envío del formulario o guardar los datos
      const datos = Object.assign({},this.edicionForm.value);
      if(this.estadoFormulario == EstadoDelFormulario.Nuevo){
        this.servicio.crear_producto(datos).subscribe({
          next:()=>{
            FuncionesUtiles.CartelDeOperaciónRealizada();
            this.emitirEnvioExitoso();
          },
          error:()=>{
            this.elFormularioEstaSiendoEnviado = false;
            Swal.fire({
              title:'Upss',
              text:'Ocurrió un error, intente enviar el formulario nuevamente.',
              confirmButtonText:'Entendido',
              showConfirmButton:true,
            });}
        });
      }
      if(this.estadoFormulario == EstadoDelFormulario.Editando){
        this.servicio.actualizar_producto(datos).subscribe({
          next:()=>{
            FuncionesUtiles.CartelDeOperaciónRealizada();
            this.emitirEnvioExitoso();},
          error:()=>{
            this.elFormularioEstaSiendoEnviado = false;
            Swal.fire({
              title:'Upss',
              text:'Ocurrió un error, intente enviar el formulario nuevamente.',
              confirmButtonText:'Entendido',
              showConfirmButton:true,
            });}
        });
      }
    } else {
      this.elFormularioEstaSiendoEnviado = false;
      // Mostrar mensaje de validación o realizar alguna acción
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios', 'error');        
      }
  }  
  volverClick(){
    this.volver.emit();
  }
  emitirEnvioExitoso(){
    this.envioExitoso.emit()
  }
}
