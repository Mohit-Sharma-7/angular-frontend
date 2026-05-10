import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Programmanagerdashboard } from './programmanagerdashboard';

describe('Programmanagerdashboard', () => {
  let component: Programmanagerdashboard;
  let fixture: ComponentFixture<Programmanagerdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Programmanagerdashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Programmanagerdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
