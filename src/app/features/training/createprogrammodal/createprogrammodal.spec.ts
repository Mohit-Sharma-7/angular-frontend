import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createprogrammodal } from './createprogrammodal';

describe('Createprogrammodal', () => {
  let component: Createprogrammodal;
  let fixture: ComponentFixture<Createprogrammodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createprogrammodal],
    }).compileComponents();

    fixture = TestBed.createComponent(Createprogrammodal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
