import { TestBed } from '@angular/core/testing';

import { CondicionIvaService } from './condicion-iva.service';

describe('CondicionIvaService', () => {
  let service: CondicionIvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondicionIvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
