import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Programdetails } from './programdetails';

describe('Programdetails', () => {
  let component: Programdetails;
  let fixture: ComponentFixture<Programdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Programdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Programdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
