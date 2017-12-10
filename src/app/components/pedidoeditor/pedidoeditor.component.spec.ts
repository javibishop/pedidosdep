import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoeditorComponent } from './pedidoeditor.component';

describe('PedidoeditorComponent', () => {
  let component: PedidoeditorComponent;
  let fixture: ComponentFixture<PedidoeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
