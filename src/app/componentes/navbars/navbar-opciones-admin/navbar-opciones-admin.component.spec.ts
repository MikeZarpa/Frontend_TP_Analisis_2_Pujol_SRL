import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOpcionesAdminComponent } from './navbar-opciones-admin.component';

describe('NavbarOpcionesAdminComponent', () => {
  let component: NavbarOpcionesAdminComponent;
  let fixture: ComponentFixture<NavbarOpcionesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarOpcionesAdminComponent]
    });
    fixture = TestBed.createComponent(NavbarOpcionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
