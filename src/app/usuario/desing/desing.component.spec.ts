import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesingComponent } from './desing.component';

describe('DesingComponent', () => {
  let component: DesingComponent;
  let fixture: ComponentFixture<DesingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
