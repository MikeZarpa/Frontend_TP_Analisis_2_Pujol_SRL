import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFiltroUsuarioComponent } from './barra-filtro-usuario.component';

describe('BarraFiltroUsuarioComponent', () => {
  let component: BarraFiltroUsuarioComponent;
  let fixture: ComponentFixture<BarraFiltroUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraFiltroUsuarioComponent]
    });
    fixture = TestBed.createComponent(BarraFiltroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
