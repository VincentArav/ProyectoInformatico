import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesingAdminComponent } from './desing-admin.component';

describe('DesingAdminComponent', () => {
  let component: DesingAdminComponent;
  let fixture: ComponentFixture<DesingAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesingAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
