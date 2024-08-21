import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStockPorVencerComponent } from './lista-stock-por-vencer.component';

describe('ListaStockPorVencerComponent', () => {
  let component: ListaStockPorVencerComponent;
  let fixture: ComponentFixture<ListaStockPorVencerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaStockPorVencerComponent]
    });
    fixture = TestBed.createComponent(ListaStockPorVencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
