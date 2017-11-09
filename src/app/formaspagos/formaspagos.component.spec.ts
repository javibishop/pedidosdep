import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaspagosComponent } from './formaspagos.component';

describe('FormaspagosComponent', () => {
  let component: FormaspagosComponent;
  let fixture: ComponentFixture<FormaspagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaspagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaspagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
