import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaisComponent } from './edit-pais.component';

describe('EditPaisComponent', () => {
  let component: EditPaisComponent;
  let fixture: ComponentFixture<EditPaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPaisComponent]
    });
    fixture = TestBed.createComponent(EditPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
