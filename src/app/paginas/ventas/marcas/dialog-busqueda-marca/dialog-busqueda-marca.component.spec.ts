import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusquedaMarcaComponent } from './dialog-busqueda-marca.component';

describe('DialogBusquedaMarcaComponent', () => {
  let component: DialogBusquedaMarcaComponent;
  let fixture: ComponentFixture<DialogBusquedaMarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBusquedaMarcaComponent]
    });
    fixture = TestBed.createComponent(DialogBusquedaMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
