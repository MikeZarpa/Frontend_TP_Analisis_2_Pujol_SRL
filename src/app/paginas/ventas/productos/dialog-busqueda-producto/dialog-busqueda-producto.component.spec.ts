import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusquedaProductoComponent } from './dialog-busqueda-producto.component';

describe('DialogBusquedaProductoComponent', () => {
  let component: DialogBusquedaProductoComponent;
  let fixture: ComponentFixture<DialogBusquedaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBusquedaProductoComponent]
    });
    fixture = TestBed.createComponent(DialogBusquedaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
