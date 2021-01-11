import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLugaresComponent } from './listar-lugares.component';

describe('ListarLugaresComponent', () => {
  let component: ListarLugaresComponent;
  let fixture: ComponentFixture<ListarLugaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarLugaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
