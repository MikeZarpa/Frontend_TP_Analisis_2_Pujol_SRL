import { TestBed } from '@angular/core/testing';

import { VentanasBusquedaService } from './ventanas-busqueda.service';

describe('VentanasBusquedaService', () => {
  let service: VentanasBusquedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentanasBusquedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
