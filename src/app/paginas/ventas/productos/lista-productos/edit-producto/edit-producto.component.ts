import { VentanasBusquedaService } from './../../../../../servicios/dialogs/ventanas-busqueda.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/clases/base_de_datos/comercial/categoria';
import { Marca } from 'src/app/clases/base_de_datos/comercial/marca';
import { Producto } from 'src/app/clases/base_de_datos/comercial/producto';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { CategoriaProductoService } from 'src/app/servicios/comercial/categoria_producto.service';
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
  readonly formularioHistorialPrecio:FormGroup;
  readonly formularioStockLote:FormGroup;
  readonly servicio = inject(ProductoService);
  readonly servicioMarca = inject(MarcaService);
  readonly cdr = inject(ChangeDetectorRef);

  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Nuevo;
  EnumEstadoFormulario = EstadoDelFormulario;
  @Input() datosEdit!:Producto;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  marcaOpciones:Marca[] = [];
  categoriaOpciones:Categoria[] = [];
  elFormularioEstaSiendoEnviado = false;

  constructor(){   
    this.edicionForm = this.formBuilder.group({
      id_producto: [null],
      descripcion: ["", Validators.required],
      cantidad_minima: [0, Validators.required],
      id_marca: [null],
      id_categoria: [null],
      habilitado: [1],
    });
    this.formularioHistorialPrecio = this.formBuilder.group({
      precio:[null,Validators.required],
    })
    this.formularioStockLote = this.formBuilder.group({
      cantidad:[null, Validators.required],
      coste:[null, Validators.required]
    });
  }
  ngOnInit(): void {
    if(this.estadoFormulario==EstadoDelFormulario.Editando){
      this.cargarDatos();
    }
    this.cargarMarca();
    this.cargarCategoria();
    // Forzar la detección de cambios
    window.setTimeout((()=>{this.cdr.detectChanges()}).bind(this),2000);
    this.cdr.detectChanges();
  }

  cargarMarca(callback = () => {}){
    this.servicioMarca.obtenerTodosSinPagina().subscribe({
      next:(res) => {
        this.marcaOpciones = res;
        window.setTimeout(callback,100);
      }
    })
  }

  readonly servicioCategoria = inject(CategoriaProductoService);
  cargarCategoria(callback = () => {}){
    this.servicioCategoria.obtenerTodosSinPagina().subscribe({
      next:(res) => {
        this.categoriaOpciones = res;
        window.setTimeout(callback,100);
      }
    })
  }

  cargarDatos(){
    this.edicionForm.patchValue({
      //id: this.datosEdit.id,
      id_producto: this.datosEdit.id_producto,
      descripcion: this.datosEdit.descripcion,
      cantidad_minima: this.datosEdit.cantidad_minima ?? 0,
      id_marca: this.datosEdit.id_marca,
      id_categoria: this.datosEdit.id_categoria,
      habilitado: this.datosEdit.habilitado
    })
    const selectMarca : HTMLSelectElement = document.getElementById("id_marca") as HTMLSelectElement;
    selectMarca.value = this.datosEdit.id_marca+"" ?? "";

    const selectCategoria : HTMLSelectElement = document.getElementById("id_categoria") as HTMLSelectElement;
    selectCategoria.value = this.datosEdit.id_categoria+"" ?? "";
  }

  enviarFormulario(event:Event){
    event.preventDefault();
    if(this.elFormularioEstaSiendoEnviado)
      return;
    this.elFormularioEstaSiendoEnviado = true;
    let envioDelFormulario;
    switch(this.estadoFormulario){
      case EstadoDelFormulario.Nuevo:
        if(!this.verificarFormularioCreacionNuevoProducto()){
          mensajeDeErrorDeFormulario();
          this.elFormularioEstaSiendoEnviado = false;
          return;
        }
        envioDelFormulario = this.emitirFormularioCreacionNuevoProducto();
        break;
      case EstadoDelFormulario.Editando:
        if(!this.verificarFormularioEdicionProducto()){
          mensajeDeErrorDeFormulario();
          this.elFormularioEstaSiendoEnviado = false;
          return;
        }
        envioDelFormulario = this.emitirFormularioEdicionDeProducto();
        break;
      default:
        throw Error("Estado del formulario incorrecto");
    }

    envioDelFormulario.subscribe({
      next:()=>{
        FuncionesUtiles.CartelDeOperaciónRealizada();
        this.emitirEnvioExitoso();
      },
      error:(error)=>{
        console.log(error);
        this.elFormularioEstaSiendoEnviado = false;
        Swal.fire({
          title:'Upss',
          text:'Ocurrió un error, intente enviar el formulario nuevamente.',
          confirmButtonText:'Entendido',
          showConfirmButton:true,
        });}
    });
    function mensajeDeErrorDeFormulario(){
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios', 'error'); 
    }
  }  
  volverClick(){
    this.volver.emit();
  }
  emitirEnvioExitoso(){
    this.envioExitoso.emit()
  }

  verificarFormularioCreacionNuevoProducto(){
    return this.edicionForm.valid && this.formularioHistorialPrecio.valid && this.formularioStockLote.valid;
  }
  verificarFormularioEdicionProducto(){
    return this.edicionForm.valid;
  }
  emitirFormularioCreacionNuevoProducto():Observable<void>{
    const datos = this.edicionForm.value;
    datos.historial_precio = this.formularioHistorialPrecio.value;
    datos.historial_precio.stock = this.formularioStockLote.value;

    return this.servicio.crear_producto(datos);
  }

  emitirFormularioEdicionDeProducto():Observable<void>{
    const datos = this.edicionForm.value;
    return this.servicio.actualizar_producto(datos);
  }

  readonly servicioVentanasBusqueda = inject(VentanasBusquedaService);
  buscarMarca(){
    this.servicioVentanasBusqueda.buscarMarca().subscribe(
      {
        next: marca => {
          if(!marca)
            return;
          if(this.marcaOpciones.find(marcaOpcion => marcaOpcion.id_marca == marca.id_marca))
            this.ponerMarcaEnElFormulario(marca);
          else
            this.cargarMarca(()=>{this.ponerMarcaEnElFormulario(marca);});
        }
      });    
  }
  buscarCategoria(){
    this.servicioVentanasBusqueda.buscarCategoriaProducto().subscribe(
      {
        next: categoria => {
          if(!categoria)
            return;
          if(this.categoriaOpciones.find(categoriaOpcion => categoriaOpcion.id_categoria == categoria.id_categoria))
            this.ponerCategoriaEnElFormulario(categoria);
          else
            this.cargarCategoria(()=>{this.ponerCategoriaEnElFormulario(categoria);});
        }
      });    
  }
  ponerMarcaEnElFormulario(marca:Marca){
    this.edicionForm.patchValue({id_marca:marca.id_marca,});
  }
  ponerCategoriaEnElFormulario(categoria:Categoria){
    this.edicionForm.patchValue({id_categoria:categoria.id_categoria,});
  }
}
