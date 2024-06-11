import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraPaginacionComponent } from './barra-paginacion.component';

describe('BarraPaginacionComponent', () => {
  let component: BarraPaginacionComponent;
  let fixture: ComponentFixture<BarraPaginacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraPaginacionComponent]
    });
    fixture = TestBed.createComponent(BarraPaginacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
