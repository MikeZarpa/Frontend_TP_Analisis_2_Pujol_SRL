import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarcaComponent } from './edit-marca.component';

describe('EditMarcaComponent', () => {
  let component: EditMarcaComponent;
  let fixture: ComponentFixture<EditMarcaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMarcaComponent]
    });
    fixture = TestBed.createComponent(EditMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
