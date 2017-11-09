import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintcardComponent } from './printcard.component';

describe('PrintcardComponent', () => {
  let component: PrintcardComponent;
  let fixture: ComponentFixture<PrintcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
