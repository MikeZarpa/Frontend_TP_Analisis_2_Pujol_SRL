import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Localidad } from 'src/app/clases/base_de_datos/ubicacion/Localidad';
import { Provincia } from 'src/app/clases/base_de_datos/ubicacion/Provincia';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-localidad',
  templateUrl: './edit-localidad.component.html',
  styleUrls: ['./edit-localidad.component.css']
})
export class EditLocalidadComponent {
  formBuilder = inject(FormBuilder);
  UbicServ = inject(UbicacionService)
  localidadForm: FormGroup;

  @Input() id:number|null = null;
  @Input() editMode :boolean = false;
  @Input() datosEdit!:Localidad;
  @Input() provinciaAlQuePertenece!:Provincia;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  constructor(){    
    this.localidadForm = this.formBuilder.group({
      id_localidad: [this.id],
      descripcion:[""],
      id_provincia:null,
      provincia: this.formBuilder.group({id_provincia:[null]},),
      codigo_postal: [""],
    });  
  }
  ponerEnMayusculas(e:any){
    let el = e.target;
    let start = el.selectionStart;
    let end = el.selectionEnd;
    el.value = el.value.toUpperCase();
    el.setSelectionRange(start, end);
}
  ngOnInit(): void {

    //@Input se activa luego del constructor...
    const provinciaForm = this.localidadForm.get('provincia') as FormGroup;
    provinciaForm.patchValue({id_provincia:this.provinciaAlQuePertenece.id_provincia})
    if(this.editMode)
      this.cargarDatos();
  }

  cargarDatos(){
    this.localidadForm.patchValue({
      id_localidad:this.datosEdit.id_localidad,
      descripcion:this.datosEdit.descripcion,
      codigo_postal:this.datosEdit.codigo_postal,
      id_provincia:this.datosEdit.provincia?.id_provincia,
    })
    
  }

  enviarFormulario(event:Event){
    event.preventDefault();

    let datos= Object.assign({},this.localidadForm.value);
    datos = FuncionesUtiles.convertirCamposAMayusculas(datos);
    datos.id_provincia = this.provinciaAlQuePertenece.id_provincia;
    
    this.UbicServ.saveLocalidad(datos).subscribe(res=>{
      //console.log(res);
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Realizado Exitosamente',
        allowOutsideClick:true,
        backdrop:true,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: false,
        showClass: {
          popup: 'animated bounceIn' // Agrega la animación "bounceIn"
        },
        hideClass: {
          popup: 'animated bounceOut' // Agrega la animación "bounceOut"
        },
        });
    });
    this.emitirEnvioExitoso();
  }

  volverClick(){
    this.volver.emit();
  }
  emitirEnvioExitoso(){
    this.envioExitoso.emit();
  }
}
