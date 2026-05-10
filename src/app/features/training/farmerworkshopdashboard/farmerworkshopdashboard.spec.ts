import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Farmerworkshopdashboard } from './farmerworkshopdashboard';

describe('Farmerworkshopdashboard', () => {
  let component: Farmerworkshopdashboard;
  let fixture: ComponentFixture<Farmerworkshopdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Farmerworkshopdashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Farmerworkshopdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
