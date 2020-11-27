import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarOrdenUsuarioComponent } from './mostrar-orden-usuario.component';

describe('MostrarOrdenUsuarioComponent', () => {
  let component: MostrarOrdenUsuarioComponent;
  let fixture: ComponentFixture<MostrarOrdenUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarOrdenUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarOrdenUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
