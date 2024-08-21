import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStockComponent } from './lista-stock.component';

describe('ListaStockComponent', () => {
  let component: ListaStockComponent;
  let fixture: ComponentFixture<ListaStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaStockComponent]
    });
    fixture = TestBed.createComponent(ListaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
