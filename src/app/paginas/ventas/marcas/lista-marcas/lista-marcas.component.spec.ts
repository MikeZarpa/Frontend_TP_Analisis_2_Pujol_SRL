import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMarcasComponent } from './lista-marcas.component';

describe('ListaMarcasComponent', () => {
  let component: ListaMarcasComponent;
  let fixture: ComponentFixture<ListaMarcasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaMarcasComponent]
    });
    fixture = TestBed.createComponent(ListaMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
