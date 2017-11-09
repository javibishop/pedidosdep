import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaenvioComponent } from './formaenvio.component';

describe('FormaenvioComponent', () => {
  let component: FormaenvioComponent;
  let fixture: ComponentFixture<FormaenvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaenvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaenvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
