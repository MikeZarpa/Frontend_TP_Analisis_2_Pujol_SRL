import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-volver',
  templateUrl: './btn-volver.component.html',
  styleUrls: ['./btn-volver.component.css']
})
export class BtnVolverComponent {
  @Output() volver = new EventEmitter<void>();

  volverClick(){
    this.volver.emit();
  }
}
