import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendancedetails } from './attendancedetails';

describe('Attendancedetails', () => {
  let component: Attendancedetails;
  let fixture: ComponentFixture<Attendancedetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Attendancedetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Attendancedetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
