import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStockFaltanteComponent } from './lista-stock-faltante.component';

describe('ListaStockFaltanteComponent', () => {
  let component: ListaStockFaltanteComponent;
  let fixture: ComponentFixture<ListaStockFaltanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaStockFaltanteComponent]
    });
    fixture = TestBed.createComponent(ListaStockFaltanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
