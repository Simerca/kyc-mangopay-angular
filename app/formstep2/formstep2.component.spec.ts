import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Formstep2Component } from './formstep2.component';

describe('Formstep2Component', () => {
  let component: Formstep2Component;
  let fixture: ComponentFixture<Formstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Formstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Formstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
