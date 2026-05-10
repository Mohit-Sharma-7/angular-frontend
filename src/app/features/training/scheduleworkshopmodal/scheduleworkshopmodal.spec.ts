import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scheduleworkshopmodal } from './scheduleworkshopmodal';

describe('Scheduleworkshopmodal', () => {
  let component: Scheduleworkshopmodal;
  let fixture: ComponentFixture<Scheduleworkshopmodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scheduleworkshopmodal],
    }).compileComponents();

    fixture = TestBed.createComponent(Scheduleworkshopmodal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
