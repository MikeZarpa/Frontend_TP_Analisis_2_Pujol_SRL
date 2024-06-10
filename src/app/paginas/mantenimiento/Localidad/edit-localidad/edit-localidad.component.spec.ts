import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocalidadComponent } from './edit-localidad.component';

describe('EditLocalidadComponent', () => {
  let component: EditLocalidadComponent;
  let fixture: ComponentFixture<EditLocalidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLocalidadComponent]
    });
    fixture = TestBed.createComponent(EditLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
