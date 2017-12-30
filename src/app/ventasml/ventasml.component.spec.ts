import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasmlComponent } from './ventasml.component';

describe('VentasmlComponent', () => {
  let component: VentasmlComponent;
  let fixture: ComponentFixture<VentasmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
