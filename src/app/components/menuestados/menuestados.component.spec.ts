import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuestadosComponent } from './menuestados.component';

describe('MenuestadosComponent', () => {
  let component: MenuestadosComponent;
  let fixture: ComponentFixture<MenuestadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuestadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuestadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
