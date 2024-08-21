import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusquedaClienteComponent } from './dialog-busqueda-cliente.component';

describe('DialogBusquedaClienteComponent', () => {
  let component: DialogBusquedaClienteComponent;
  let fixture: ComponentFixture<DialogBusquedaClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBusquedaClienteComponent]
    });
    fixture = TestBed.createComponent(DialogBusquedaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
