import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersingupComponent } from './usersingup.component';

describe('UsersingupComponent', () => {
  let component: UsersingupComponent;
  let fixture: ComponentFixture<UsersingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
