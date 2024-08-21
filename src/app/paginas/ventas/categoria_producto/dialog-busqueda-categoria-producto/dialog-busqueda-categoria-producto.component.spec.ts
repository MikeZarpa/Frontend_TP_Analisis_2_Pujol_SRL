import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusquedaCategoriaProductoComponent } from './dialog-busqueda-categoria-producto.component';

describe('DialogBusquedaCategoriaProductoComponent', () => {
  let component: DialogBusquedaCategoriaProductoComponent;
  let fixture: ComponentFixture<DialogBusquedaCategoriaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBusquedaCategoriaProductoComponent]
    });
    fixture = TestBed.createComponent(DialogBusquedaCategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
