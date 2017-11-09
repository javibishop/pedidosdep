import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarestadosComponent } from './toolbarestados.component';

describe('ToolbarestadosComponent', () => {
  let component: ToolbarestadosComponent;
  let fixture: ComponentFixture<ToolbarestadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarestadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarestadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
