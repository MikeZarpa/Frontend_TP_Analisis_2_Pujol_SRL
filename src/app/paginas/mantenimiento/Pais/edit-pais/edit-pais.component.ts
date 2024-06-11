import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pais } from 'src/app/clases/base_de_datos/ubicacion/Pais';
import { FuncionesUtiles } from 'src/app/clases/utiles/funciones-utiles';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pais',
  templateUrl: './edit-pais.component.html',
  styleUrls: ['./edit-pais.component.css']
})
export class EditPaisComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  UbicServ = inject(UbicacionService);
  cdr = inject(ChangeDetectorRef);
  paisForm: FormGroup;

  @Input() id_pais:number|null = null;
  @Input() editMode :boolean = false;
  @Input() datosEdit!:Pais;

  @Output() volver = new EventEmitter<void>();
  @Output() envioExitoso = new EventEmitter<void>();

  constructor(){    
    this.paisForm = this.formBuilder.group({
      id_pais: [this.id_pais],
      descripcion:[""],      
    });  
  }
  ngOnInit(): void {
    if(this.editMode)
      this.cargarDatos();    
  }
  ponerEnMayusculas(e:any){
    let el = e.target;
    let start = el.selectionStart;
    let end = el.selectionEnd;
    el.value = el.value.toUpperCase();
    el.setSelectionRange(start, end);
}

  cargarDatos(){
    this.paisForm.patchValue({
      id_pais:this.datosEdit.id_pais,
      descripcion:this.datosEdit.descripcion,
    })
  }

  enviarFormulario(event:Event){
    event.preventDefault();
    
    let datos= Object.assign({},this.paisForm.value);
    datos = FuncionesUtiles.convertirCamposAMayusculas(datos);
    this.UbicServ.savePais(datos).subscribe(res=>{
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
