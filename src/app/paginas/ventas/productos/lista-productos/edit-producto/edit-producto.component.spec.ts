import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductoComponent } from './edit-producto.component';

describe('EditProductoComponent', () => {
  let component: EditProductoComponent;
  let fixture: ComponentFixture<EditProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductoComponent]
    });
    fixture = TestBed.createComponent(EditProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
