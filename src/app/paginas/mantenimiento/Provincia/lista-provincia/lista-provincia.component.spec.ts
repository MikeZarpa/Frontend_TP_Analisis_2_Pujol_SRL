import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProvinciaComponent } from './lista-provincia.component';

describe('ListaProvinciaComponent', () => {
  let component: ListaProvinciaComponent;
  let fixture: ComponentFixture<ListaProvinciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaProvinciaComponent]
    });
    fixture = TestBed.createComponent(ListaProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
