import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpedidosxformaenvioComponent } from './gpedidosxformaenvio.component';

describe('GpedidosxformaenvioComponent', () => {
  let component: GpedidosxformaenvioComponent;
  let fixture: ComponentFixture<GpedidosxformaenvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpedidosxformaenvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpedidosxformaenvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
