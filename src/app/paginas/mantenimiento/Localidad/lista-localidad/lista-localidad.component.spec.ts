import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLocalidadComponent } from './lista-localidad.component';

describe('ListaLocalidadComponent', () => {
  let component: ListaLocalidadComponent;
  let fixture: ComponentFixture<ListaLocalidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaLocalidadComponent]
    });
    fixture = TestBed.createComponent(ListaLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
