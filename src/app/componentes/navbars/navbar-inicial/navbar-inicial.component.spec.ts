import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInicialComponent } from './navbar-inicial.component';

describe('NavbarInicialComponent', () => {
  let component: NavbarInicialComponent;
  let fixture: ComponentFixture<NavbarInicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarInicialComponent]
    });
    fixture = TestBed.createComponent(NavbarInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
