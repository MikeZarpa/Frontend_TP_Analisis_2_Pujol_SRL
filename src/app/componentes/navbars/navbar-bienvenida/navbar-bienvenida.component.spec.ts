import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBienvenidaComponent } from './navbar-bienvenida.component';

describe('NavbarBienvenidaComponent', () => {
  let component: NavbarBienvenidaComponent;
  let fixture: ComponentFixture<NavbarBienvenidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarBienvenidaComponent]
    });
    fixture = TestBed.createComponent(NavbarBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
