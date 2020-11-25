import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarOrdenComponent } from './mostrar-orden.component';

describe('MostrarOrdenComponent', () => {
  let component: MostrarOrdenComponent;
  let fixture: ComponentFixture<MostrarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
