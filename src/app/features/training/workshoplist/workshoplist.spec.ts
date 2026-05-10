import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workshoplist } from './workshoplist';

describe('Workshoplist', () => {
  let component: Workshoplist;
  let fixture: ComponentFixture<Workshoplist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workshoplist],
    }).compileComponents();

    fixture = TestBed.createComponent(Workshoplist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
