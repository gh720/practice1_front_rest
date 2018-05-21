import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationratioComponent } from './locationratio.component';

describe('LocationratioComponent', () => {
  let component: LocationratioComponent;
  let fixture: ComponentFixture<LocationratioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationratioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationratioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
