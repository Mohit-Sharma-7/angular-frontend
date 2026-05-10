import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officerdashboard } from './officerdashboard';

describe('Officerdashboard', () => {
  let component: Officerdashboard;
  let fixture: ComponentFixture<Officerdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Officerdashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Officerdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
