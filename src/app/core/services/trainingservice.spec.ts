import { TestBed } from '@angular/core/testing';

import { Trainingservice } from './trainingservice';

describe('Trainingservice', () => {
  let service: Trainingservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Trainingservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
