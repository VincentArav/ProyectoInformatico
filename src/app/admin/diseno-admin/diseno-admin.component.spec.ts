import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenoAdminComponent } from './diseno-admin.component';

describe('DisenoAdminComponent', () => {
  let component: DisenoAdminComponent;
  let fixture: ComponentFixture<DisenoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisenoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisenoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
