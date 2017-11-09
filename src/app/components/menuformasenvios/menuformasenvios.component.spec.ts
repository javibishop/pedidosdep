import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuformasenviosComponent } from './menuformasenvios.component';

describe('MenuformasenviosComponent', () => {
  let component: MenuformasenviosComponent;
  let fixture: ComponentFixture<MenuformasenviosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuformasenviosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuformasenviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
