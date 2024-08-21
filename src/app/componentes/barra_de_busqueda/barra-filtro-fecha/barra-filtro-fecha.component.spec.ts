import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFiltroFechaComponent } from './barra-filtro-fecha.component';

describe('BarraFiltroFechaComponent', () => {
  let component: BarraFiltroFechaComponent;
  let fixture: ComponentFixture<BarraFiltroFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraFiltroFechaComponent]
    });
    fixture = TestBed.createComponent(BarraFiltroFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
