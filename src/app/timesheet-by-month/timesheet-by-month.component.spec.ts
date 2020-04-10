import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetByMonthComponent } from './timesheet-by-month.component';

describe('TimesheetByMonthComponent', () => {
  let component: TimesheetByMonthComponent;
  let fixture: ComponentFixture<TimesheetByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
