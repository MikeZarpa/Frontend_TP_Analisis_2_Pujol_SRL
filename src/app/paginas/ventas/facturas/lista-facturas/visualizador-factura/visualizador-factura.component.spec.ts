import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorFacturaComponent } from './visualizador-factura.component';

describe('VisualizadorFacturaComponent', () => {
  let component: VisualizadorFacturaComponent;
  let fixture: ComponentFixture<VisualizadorFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizadorFacturaComponent]
    });
    fixture = TestBed.createComponent(VisualizadorFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
