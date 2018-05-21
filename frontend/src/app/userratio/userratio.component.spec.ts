import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserratioComponent } from './userratio.component';

describe('UserratioComponent', () => {
  let component: UserratioComponent;
  let fixture: ComponentFixture<UserratioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserratioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserratioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
