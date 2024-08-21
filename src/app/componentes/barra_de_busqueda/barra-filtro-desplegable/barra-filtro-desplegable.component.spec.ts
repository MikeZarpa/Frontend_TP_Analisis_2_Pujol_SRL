import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFiltroDesplegableComponent } from './barra-filtro-desplegable.component';

describe('BarraFiltroDesplegableComponent', () => {
  let component: BarraFiltroDesplegableComponent;
  let fixture: ComponentFixture<BarraFiltroDesplegableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraFiltroDesplegableComponent]
    });
    fixture = TestBed.createComponent(BarraFiltroDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
