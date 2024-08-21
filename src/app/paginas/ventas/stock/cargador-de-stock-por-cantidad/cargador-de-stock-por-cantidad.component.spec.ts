import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargadorDeStockPorCantidadComponent } from './cargador-de-stock-por-cantidad.component';

describe('CargadorDeStockPorCantidadComponent', () => {
  let component: CargadorDeStockPorCantidadComponent;
  let fixture: ComponentFixture<CargadorDeStockPorCantidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargadorDeStockPorCantidadComponent]
    });
    fixture = TestBed.createComponent(CargadorDeStockPorCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
