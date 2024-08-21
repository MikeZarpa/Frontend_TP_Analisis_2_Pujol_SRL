import { CondicionIvaService } from './../../../../../servicios/entidades/condicion-iva.service';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/clases/base_de_datos/entidades/cliente';
import { CondicionIva } from 'src/app/clases/base_de_datos/entidades/cond_iva';
import { Localidad } from 'src/app/clases/base_de_datos/ubicacion/Localidad';
import { Pais } from 'src/app/clases/base_de_datos/ubicacion/Pais';
import { Provincia } from 'src/app/clases/base_de_datos/ubicacion/Provincia';
import { EstadoDelFormulario } from 'src/app/clases/enums';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { ClienteService } from 'src/app/servicios/entidades/cliente.service';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent {

  readonly formBuilder = inject(FormBuilder);
  readonly edicionForm: FormGroup;
  readonly edicionDireccionForm: FormGroup;
  readonly servicio = inject(ClienteService);
  readonly servicioUbicacion = inject(UbicacionService);
  readonly cdr = inject(ChangeDetectorRef);
  readonly servicioCondicionIVA = inject(CondicionIvaService);

  @Input() estadoFormulario:EstadoDelFormulario = EstadoDelFormulario.Nuevo;
  EnumEstadoFormulario = EstadoDelFormulario;
  @Input() datosEdit!:Cliente;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  elFormularioEstaSiendoEnviado = false;

  paisesOpciones:Pais[] = [];
  provinciasOpciones:Provincia[] = [];
  localidadesOpciones:Localidad[] = [];
  condicion_ivaOpciones:CondicionIva[] = [];

  constructor(){   
    this.edicionForm = this.formBuilder.group({
      id_cliente: [null],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      dni: ["", [Validators.required, Validators.pattern("[0-9]+")]],
      cuil_cuit: ["", [Validators.required,Validators.minLength(11),Validators.maxLength(11), Validators.pattern("[0-9]+")]],
      id_cond_iva: [null, Validators.required],
      id_direccion: "",
      id_pais: [null, Validators.required]
    });
    this.edicionDireccionForm = this.formBuilder.group({
      id_direccion: [null],
      calle: ["", Validators.required],
      altura: "",
      piso: "",
      departamento: "",
      id_pais_direccion: "",
      id_provincia_direccion: "",
      id_localidad: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.estadoFormulario==EstadoDelFormulario.Editando){
      this.cargarDatos();
    }
    this.cargarPaises();
    this.cargarCondIVA();
    // Forzar la detección de cambios
    window.setTimeout((()=>{this.cdr.detectChanges()}).bind(this),4000);
  }

  cargarCondIVA(){  
    this.servicioCondicionIVA.obtenerTodosSinPagina().subscribe({
      next:(res) => {
        this.condicion_ivaOpciones = res;
      },
      error: (error) =>{
        console.log("Error al cargar las condiciones de iva", error);
      }
    })
  }

  cargarPaises(){
    this.servicioUbicacion.obtenerPaisesSinPaginar().subscribe({
      next:(res) => {
        this.paisesOpciones = res;
      },
      error: (error) =>{
        console.log("Error al cargar paises", error);
      }
    })
  }

  cargarProvincias(id_pais_value:number|string|null){
    if(!id_pais_value)
      return;
    const id_pais = Number(id_pais_value);
    if(isNaN(id_pais))
      return;
    this.servicioUbicacion.obtenerProvinciasPorPaisIdSinPaginar(id_pais).subscribe({
      next:(res) => {
        this.provinciasOpciones = res;
      },
      error: (error) =>{
        console.log("Error al cargar las provincias", error);
      }
    })
  }

  cargarLocalidades(id_provincia_value:string|number|null){
    if(!id_provincia_value)
      return;
    const id_provincia = Number(id_provincia_value);
    if(isNaN(id_provincia))
      return;
    this.servicioUbicacion.obtenerLocalidadesPorProvinciaIdSinPaginar(id_provincia).subscribe({
      next: (res) => {
        console.log(res);
        this.localidadesOpciones = res;
      },
      error: (error) =>{
        console.log("Error al cargar localidades", error);
      }
    });
  }

  cargarDatos(){
    this.edicionForm.patchValue({
      id_cliente: this.datosEdit.id_cliente,
      nombre: this.datosEdit.nombre,
      apellido: this.datosEdit.apellido,
      dni: this.datosEdit.dni,
      cuil_cuit: this.datosEdit.cuil_cuit,
      id_cond_iva: this.datosEdit.id_cond_iva,
      id_direccion: this.datosEdit.id_direccion,
      id_pais: this.datosEdit.id_pais,
    });

    this.edicionDireccionForm.patchValue({
      id_direccion: this.datosEdit.id_direccion,
      calle: this.datosEdit.direccion?.calle,
      altura: this.datosEdit.direccion?.altura,
      piso: this.datosEdit.direccion?.piso,
      departamento: this.datosEdit.direccion?.departamento,
      id_pais_direccion: this.datosEdit.direccion?.localidad?.provincia?.id_pais,
      id_provincia_direccion: this.datosEdit.direccion?.localidad?.id_provincia,
      id_localidad: this.datosEdit.direccion?.id_localidad
    });
    const LOCALIDAD_CLIENTE = this.datosEdit.direccion?.localidad;
    if(LOCALIDAD_CLIENTE){
      this.cargarProvincias(LOCALIDAD_CLIENTE.provincia
        ?.id_pais!);
      this.cargarLocalidades(LOCALIDAD_CLIENTE.id_provincia);
    }
  }

  enviarFormulario(event:Event){
    event.preventDefault();

    if(this.elFormularioEstaSiendoEnviado)
      return;
    this.elFormularioEstaSiendoEnviado = true;
    
    if (this.edicionForm.valid && this.edicionDireccionForm.valid) {
      // Realizar el envío del formulario o guardar los datos
      const datos = Object.assign({}, this.edicionForm.value);
      const direccion = Object.assign({}, this.edicionDireccionForm.value);
      datos.direccion = direccion;

      const operacion = this.estadoFormulario === EstadoDelFormulario.Nuevo 
        ? this.servicio.crear_cliente(datos)
        : this.servicio.actualizar_cliente(datos);

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
