import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoslistaComponent } from './pedidoslista.component';

describe('PedidoslistaComponent', () => {
  let component: PedidoslistaComponent;
  let fixture: ComponentFixture<PedidoslistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoslistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
